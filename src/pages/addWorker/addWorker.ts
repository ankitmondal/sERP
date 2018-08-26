import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
@Component({
  selector: 'page-addWorker',
  templateUrl: 'addWorker.html'
})
export class addWorker {
  WorkerName: string;
  age: number;
  address: string;
  phoneNumber: number;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,public adminService:AdminServiceProvider) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    
  }
  addWorker() {

    this.adminService.AddWorker(this.WorkerName , this.age , this.address , this.phoneNumber)
    .subscribe(addedWorker => {
      console.log(addedWorker);
    },
      error => {
        console.log("Error");
      });

    console.log(this.WorkerName + this.age + this.address + this.phoneNumber);
  }
  showUpdateDeleteActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your added Item',
      buttons: [
        {
          text: 'Edit',
          role: 'Edit',
          handler: () => {
            console.log('Destructive clicked');
            this.showAlert("Item Edited", "Your Item has been updated");
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Archive clicked');
            this.showAlert("Item Deleted", "Your Item has been removed from list");
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  showAlert(title, message) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(addItem, {
    //   item: item
    // });
    console.log(event);
    console.log(item);
    this.showUpdateDeleteActionSheet();
  }
}


