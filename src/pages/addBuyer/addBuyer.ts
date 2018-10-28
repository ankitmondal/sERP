import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { clientModel  } from '../../models/client.model';
@Component({
  selector: 'page-addBuyer',
  templateUrl: 'addBuyer.html'
})
export class addBuyer {
  ClientName: string;
  address1: string;
  address2: string;
  phoneNumber: number;

  icons: string[];
  clients: clientModel[];//Array<{ title: string, note: string, icon: string }>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
     public adminService:AdminServiceProvider,  public userService: UserServiceProvider,
    public actionSheetCtrl: ActionSheetController) {

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.clients = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }

  }
  ngOnInit(){
    this.getClient();
  }
  getClient(){
    this.userService.GetWorker()
        .subscribe((data:any)=>{
          this.clients=data;
          console.log(this.clients);
        },
        (error:any) =>{
          console.log(error.message);
          this.showAlert("Error",error.message);
          console.log("Error");
      });
  }

  addBuyer() {
    let client:clientModel = new clientModel(this.ClientName,this.address1,this.address2,this.phoneNumber)
    this.adminService.AddClient(client)
    .subscribe(addedItem => {
      this.showAlert("Success","Item has been added successfully");
      console.log(addedItem);
      this.reset();
    },
      (error:any) => {
        console.log(error.message);
        this.showAlert("Error",error.message);
        console.log("Error");
      }
    );
    console.log(this.ClientName + this.address1 + this.address2 + this.phoneNumber);
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

  reset(){
    this.ClientName = "";
    this.address1 = "";
    this.address2 = "";
    this.phoneNumber = 0;
  }
}
