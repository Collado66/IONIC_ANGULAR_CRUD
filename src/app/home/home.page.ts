import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons'; // Importação necessária para registrar ícones
import { add } from 'ionicons/icons'; // Ícone do botão de mais
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { ItemFormComponent } from '../components/item-form/item-form.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule] // O componente do formulário entra via ModalController, não precisa estar aqui
})
export class HomePage implements OnInit {
  items: Item[] = [];

  constructor(
    private itemService: ItemService,
    private modalCtrl: ModalController
  ) {
    // Registra o ícone para que o Ionic Standalone saiba renderizá-lo
    addIcons({ add });
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.items = this.itemService.getItems();
  }

  async openItemModal(item?: Item) {
    const modal = await this.modalCtrl.create({
      component: ItemFormComponent,
      componentProps: { item: item }
    });

    modal.onDidDismiss().then((result) => {
      // Se o modal retornou dados (salvamento concluído), recarrega a lista
      if (result.data) {
        this.loadItems();
      }
    });

    return await modal.present();
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id);
    this.loadItems();
  }
}