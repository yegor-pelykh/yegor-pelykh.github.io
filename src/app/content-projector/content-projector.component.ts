import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  DoCheck,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { ExpanderComponent } from '../expander/expander.component';
import { HeaderedContentComponent } from '../headered-content/headered-content.component';

const componentsToProject: any[] = [
  ExpanderComponent,
  HeaderedContentComponent
]
const factories: Map<any, ComponentFactory<any>> =
  new Map<any, ComponentFactory<any>>();

@Component({
  selector: 'app-content-projector',
  templateUrl: './content-projector.component.html',
  styleUrls: ['./content-projector.component.scss']
})
export class ContentProjectorComponent implements DoCheck, OnDestroy {
  private projectedComponents: ComponentRef<any>[] = [];
  @Input()
  set content(v: string) {
    this.ngOnDestroy();
    if (v) {
      this.build(v);
      this.rendered.emit();
    }
  }
  @Input()
  exprContext?: any;
  @Output()
  rendered = new EventEmitter();
  
  constructor(
    private elementRef: ElementRef,
    private injector: Injector,
    resolver: ComponentFactoryResolver,
  ) {
    componentsToProject.forEach(c => {
      const factory = resolver.resolveComponentFactory(c);
      factories.set(factory.selector, factory);
    });
  }
  
  ngDoCheck(): void {
    this.projectedComponents.forEach(c => c.changeDetectorRef.detectChanges());
  }

  ngOnDestroy(): void {
    // destroy these components else there will be memory leaks
    this.projectedComponents.forEach(c => c.destroy());
    this.projectedComponents.length = 0;
  }

  private evalInContext(expr: string, context: any) {
    return (new Function("with(this) { return " + expr + "}")).call(context);
  }

  private getExpression(value: string) : string | null {
    return value.startsWith('{{') && value.endsWith('}}') ? value.substring(2, value.length - 2).trim() : null;
  }

  private tryInterpolate(node: Node) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE: {
        const element = node as HTMLElement;
        let value: string | undefined = undefined;
        if (typeof element.nodeValue === 'string') {
          value = element.nodeValue.trim();
        }
        if (value == null && (element.innerText.trim() === element.innerHTML.trim())) {
          value = element.innerText.trim();
        }
        if (value != null) {
          const valueExpr = this.getExpression(value);
          if (valueExpr != null) {
            element.innerText = this.evalInContext(valueExpr, this.exprContext);
          }
        }
        break;
      }
      case Node.ATTRIBUTE_NODE: {
        let value: string | undefined = undefined;
        if (typeof node.nodeValue === 'string') {
          value = node.nodeValue.trim();
        }
        if (value != null) {
          const valueExpr = this.getExpression(value);
          if (valueExpr != null) {
            node.nodeValue = this.evalInContext(valueExpr, this.exprContext);
          }
        }
        break;
      }
    }
  }

  private interpolateExpressions() {
    const allNodes = this.elementRef.nativeElement.querySelectorAll('*') as NodeList;
    for (const node of allNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        this.tryInterpolate(element);
        for (const attrNode of element.attributes) {
          this.tryInterpolate(attrNode);
        }
      }
    }
  }

  private build(content: string) {
    this.elementRef.nativeElement.innerHTML = content || '';
    if (content == null) return;
    factories.forEach(f => {
      const componentNodes = this.elementRef.nativeElement.querySelectorAll(f.selector) as NodeList;
      componentNodes.forEach(node => {
        if (node.nodeType !== node.ELEMENT_NODE) return;
        const element = node as HTMLElement;
        const projectableNodes = [Array.prototype.slice.call(element.childNodes)];
        const component = f.create(this.injector, projectableNodes, element);
        for (const attr of element.attributes) {
          component.instance[attr.nodeName] = attr.nodeValue;
        }
        this.projectedComponents.push(component);
      });
    });
    this.interpolateExpressions();
  }

}
