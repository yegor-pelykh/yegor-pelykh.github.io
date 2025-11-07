import { Injectable, signal } from '@angular/core';
import { Contact } from '../types/contact';
import { CONTACTS } from '../utils/constants';

@Injectable({ providedIn: 'root' })
export class ContactService {
  readonly contacts = signal<Contact[]>(CONTACTS);
}
