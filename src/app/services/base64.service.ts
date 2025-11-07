import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Base64Service {
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  base64ToString(base64: string): string {
    const buffer = this.base64ToArrayBuffer(base64);
    return new TextDecoder().decode(buffer);
  }

  stringToBase64(str: string): string {
    const buffer = new TextEncoder().encode(str);
    return this.arrayBufferToBase64(buffer.buffer);
  }
}
