import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [
    { id: 1, title: 'Estudar Ionic 7', description: 'Praticar conceitos de Standalone Components.' }
  ];

  getItems(): Item[] {
    return [...this.items];
  }

  addItem(item: Omit<Item, 'id'>) {
    const newId = this.items.length > 0 ? Math.max(...this.items.map(i => i.id)) + 1 : 1;
    this.items.push({ id: newId, ...item });
  }

  updateItem(updatedItem: Item) {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }
}