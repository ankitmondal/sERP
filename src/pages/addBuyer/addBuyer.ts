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
  clientID: number;

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
    this.userService.GetMyClients()
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
    let client:clientModel = new clientModel(this.ClientName,this.address1,this.address2,this.phoneNumber,this.clientID)
    if(client.clientID === undefined){
    this.adminService.AddClient(client)
    .subscribe(addedItem => {
      this.showAlert("Success","Buyer has been added successfully");
      console.log(addedItem);
      this.reset();
      this.getClient();
    },
      (error:any) => {
        console.log(error.message);
        this.showAlert("Error",error.message);
        console.log("Error");
      }
    );
  }
  else{
    this.adminService.UpdateClient(this.clientID,client)
    .subscribe(UpdatedItem => {
      this.showAlert("Success","Buyer has been Updated successfully");
      console.log(UpdatedItem);
      this.reset();
      this.getClient();
    },
      (error:any) => {
        console.log(error.message);
        this.showAlert("Error",error.message);
        console.log("Error in Update");
      }
    );
  }
  
    console.log(this.ClientName + this.address1 + this.address2 + this.phoneNumber);
  }
  showUpdateDeleteActionSheet(client:any) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your added Item',
      buttons: [
        {
          text: 'Edit',
          role: 'Edit',
          handler: () => {
            console.log('Update clicked for ' + client.ClientName);
            this.ClientName =client.clientName;
             this.address1 = client.cAddress1;
              this.address2 = client.cAddress2;
               this.phoneNumber = client.cPhone;
               this.phoneNumber = client.cPhone;
               this.clientID = client.clientID;  
            this.showAlert("Buyer Edit","Your Client has been loaded");
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Remove clicked for '+client.clientID);
            this.adminService.DeleteClient(client.clientID).subscribe((res: any) => console.log("user deleted"));;
            this.showAlert("Buyer Deleted", "Your Client has been removed from list");
            this.getClient();
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
    this.showUpdateDeleteActionSheet(item);
  }
 
  reset(){
    this.ClientName = "";
    this.address1 = "";
    this.address2 = "";
    this.phoneNumber = 0;
    this.clientID=undefined;
  }
}
