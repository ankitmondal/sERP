import { Component ,OnInit } from '@angular/core';
import { NavController,AlertController,ActionSheetController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { addBuyerSale } from '../addBuyerSale/addBuyerSale';
import { addWorkerPurchase } from '../addWorkerPurchase/addWorkerPurchase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  Orders:any;
  cActiveOrders:any;
  wActiveOrders:any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  WorkerBalance: any;
  ClientBalance: any;
  wPendingBalance:number;
  cPendingBalance:number;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, 
              public actionSheetCtrl: ActionSheetController,
              public userService:UserServiceProvider) {

      this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                  'american-football', 'boat', 'bluetooth', 'build'];
  }

   filterData(oType) {
    return this.Orders.filter(object => {
      return object['oType'] == oType;
    });
  }
  

  showWorkerActionSheet(item:any) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your added Item',
      buttons: [
        {
          text: 'Receive',
          handler: () => {
            this.navCtrl.push(addWorkerPurchase, {
              item: item
            });
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

  showClientActionSheet(item:any) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your added Item',
      buttons: [
        {
          text: 'Sale',
          handler: () => {
            this.navCtrl.push(addBuyerSale, {
              item: item
            });
          }
        }, {
          text: 'Delete',
          handler: () => {
            
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

  workerItemTapped(event, item) {
    console.log(item);
    this.showWorkerActionSheet(item);
  }

  ClientItemTapped(event, item) {
    console.log(item);
    this.showClientActionSheet(item);
  }

  getWorkerOrder(){
    this.userService.GetWorkerOrderSummary()
        .subscribe((data:any)=>{
          this.wActiveOrders=data;
          console.log(this.Orders);
        },
        (error:any) =>{
          console.log(error.message);
          this.showAlert("Error",error.message);
          console.log("Error");
      });
  }

  getClientOrder(){
    this.userService.GetClientOrderSummary()
        .subscribe((data:any)=>{
          this.cActiveOrders=data;
          console.log(this.Orders);
        },
        (error:any) =>{
          console.log(error.message);
          this.showAlert("Error",error.message);
          console.log("Error");
      });
  }

  getOrderSummary(){
    this.userService.GetOrderSummary()
        .subscribe((data:any)=>{
          this.items = [];
          for (let i = 0; i < data.length; i++) {
            this.items.push({
              title: data[i].itemName,
              note: data[i].Quantity,
              icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
          }
        },
        (error:any) =>{
          console.log(error.message);
          this.showAlert("Error",error.message);
          console.log("Error");
    });
  }

  getBalanceSheet(){
    this.userService.GetWorkerBalanceSheet()
        .subscribe((data:any)=>{
         this.WorkerBalance = data;
         this.wPendingBalance = this.WorkerBalance[0].Total;
        },
        (error:any) =>{
          console.log(error.message);
          this.showAlert("Error",error.message);
          console.log("Error");
    });

    this.userService.GetClientBalanceSheet()
        .subscribe((data:any)=>{
         this.ClientBalance = data;
         this.cPendingBalance = this.ClientBalance[0].Total;
        },
        (error:any) =>{
          console.log(error.message);
          this.showAlert("Error",error.message);
          console.log("Error");
    });
  }
  ngOnInit(){
    this.getWorkerOrder();
    this.getClientOrder();
    this.getOrderSummary();
    this.getBalanceSheet();
  }
}
