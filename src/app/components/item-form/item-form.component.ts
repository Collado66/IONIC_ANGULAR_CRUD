import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule] 
})
export class ItemFormComponent implements OnInit {
  @Input() item?: Item;

  title: string = '';
  description: string = '';
  isEditMode: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    if (this.item) {
      this.isEditMode = true;
      this.title = this.item.title;
      this.description = this.item.description;
    }
  }

  dismiss() {
    this.modalCtrl.dismiss(false); // Fecha sem atualizar
  }

  save() {
    if (!this.title.trim()) return;

    if (this.isEditMode && this.item) {
      this.itemService.updateItem({
        id: this.item.id,
        title: this.title,
        description: this.description
      });
    } else {
      this.itemService.addItem({
        title: this.title,
        description: this.description
      });
    }

    this.modalCtrl.dismiss(true); // Fecha e avisa que houve alteração
  }
}