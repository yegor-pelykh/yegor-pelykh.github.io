import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Type,
  createComponent,
  inject,
} from '@angular/core';
import { ExpanderComponent } from '../expander/expander.component';
import { HeaderedContentComponent } from '../headered-content/headered-content.component';

const PROJECTABLE_COMPONENTS = [ExpanderComponent, HeaderedContentComponent];

@Component({
  selector: 'app-content-projector',
  standalone: true,
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentProjectorComponent implements DoCheck, OnDestroy {
  @Input() set content(value: string) {
    this.ngOnDestroy();
    if (value) {
      this.buildContent(value);
      this.rendered.emit();
    }
  }
  @Input() exprContext?: any;
  @Output() readonly rendered = new EventEmitter<void>();

  private readonly elementRef = inject(ElementRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly componentMap = new Map<string, Type<any>>();
  private readonly projectedComponents: ReturnType<typeof createComponent>[] = [];

  constructor() {
    for (const component of PROJECTABLE_COMPONENTS) {
      this.componentMap.set(this.getSelectorFromComponent(component), component);
    }
  }

  ngDoCheck(): void {
    for (const component of this.projectedComponents) {
      component.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    for (const component of this.projectedComponents) {
      component.destroy();
    }
    this.projectedComponents.length = 0;
  }

  private getSelectorFromComponent(component: Type<any>): string {
    const selectors = {
      [ExpanderComponent.name]: 'app-expander',
      [HeaderedContentComponent.name]: 'app-headered-content'
    };
    return selectors[component.name];
  }

  private buildContent(content: string): void {
    this.elementRef.nativeElement.innerHTML = content || '';
    if (!content) return;

    this.processComponentNodes();
    this.interpolateExpressions();
  }

  private processComponentNodes(): void {
    this.componentMap.forEach((componentType, selector) => {
      const nodes = this.elementRef.nativeElement.querySelectorAll(selector);
      nodes.forEach((node: Element) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        const element = node as HTMLElement;
        const projectableNodes = [Array.prototype.slice.call(element.childNodes)];

        const componentRef = createComponent(componentType, {
          environmentInjector: this.environmentInjector,
          hostElement: element,
          projectableNodes
        });

        this.applyAttributesToComponent(element, componentRef);
        this.projectedComponents.push(componentRef);
      });
    });
  }

  private applyAttributesToComponent(element: HTMLElement, componentRef: any): void {
    for (const attr of Array.from(element.attributes)) {
      componentRef.instance[attr.nodeName] = attr.nodeValue;
    }
  }

  private interpolateExpressions(): void {
    const allNodes = this.elementRef.nativeElement.querySelectorAll('*');
    for (const node of allNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        this.tryInterpolate(node as HTMLElement);
        for (const attrNode of Array.from((node as HTMLElement).attributes)) {
          this.tryInterpolate(attrNode);
        }
      }
    }
  }

  private tryInterpolate(node: Node): void {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE: {
        const element = node as HTMLElement;
        let value: string | undefined;

        if (typeof element.nodeValue === 'string') {
          value = element.nodeValue.trim();
        }

        if (!value && element.innerText.trim() === element.innerHTML.trim()) {
          value = element.innerText.trim();
        }

        if (value) {
          const expr = this.getExpression(value);
          if (expr) {
            element.innerText = this.evalInContext(expr, this.exprContext);
          }
        }
        break;
      }
      case Node.ATTRIBUTE_NODE: {
        let value: string | undefined;

        if (typeof node.nodeValue === 'string') {
          value = node.nodeValue.trim();
        }

        if (value) {
          const expr = this.getExpression(value);
          if (expr) {
            node.nodeValue = this.evalInContext(expr, this.exprContext);
          }
        }
        break;
      }
    }
  }

  private getExpression(value: string): string | null {
    return value.startsWith('{{') && value.endsWith('}}')
      ? value.substring(2, value.length - 2).trim()
      : null;
  }

  private evalInContext(expr: string, context: any): any {
    return new Function('with(this) { return ' + expr + '}').call(context);
  }
}
