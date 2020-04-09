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
  
  showActionSheet(item:any,isWorkerOrder:boolean,Controller:any) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your added Item',
      buttons: [
        {
          text: isWorkerOrder==true ? 'Receive': 'Sale',
          handler: () => {
            this.navCtrl.push(Controller, {
              item: item
            });
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteOrder(item.orderID,isWorkerOrder);
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

   DeleteTransactionAlert(orderID:number) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'This order has a transaction attached. Do you want to delete the transaction?',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
            this.deleteTransaction(orderID,false);
          }
        },
        {
          text: 'Carry Forward',
          handler: () => {
            console.log('Carry clicked');
            this.deleteTransaction(orderID,true);
          }
        }
      ]
    });
    alert.present();
  }
  showAlert(title, message) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  workerItemTapped(item) {
    console.log(item);
    this.showActionSheet(item,true,addWorkerPurchase);
  }

  ClientItemTapped(item) {
    console.log(item);
    this.showActionSheet(item,false,addBuyerSale);
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
         console.log("Worker BalanceSheet");
         console.log(data);
          if(data.length > 0){
            this.WorkerBalance = data;
            this.wPendingBalance = data[0].Total;
          }
        },
        (error:any) =>{
          console.log(error.message);
          this.showAlert("Error",error.message);
          console.log("Error");
    });

    this.userService.GetClientBalanceSheet()
      .subscribe((data: any) => {
        console.log("Client BalanceSheet");
        console.log(data);
        if (data.length > 0) {
          this.ClientBalance = data;
          this.cPendingBalance = data[0].Total;
        }
       
      },
        (error: any) => {
          console.log(error.message);
          this.showAlert("Error", error.message);
          console.log("Error");
        });
  }

  deleteOrder(orderID:number,isWorkerOrder:boolean){
    this.userService.DeleteOrder(orderID)
    .subscribe((res: any) =>{
      this.showAlert("Order Deleted", "Your Order has been removed from list");
      if(isWorkerOrder){
      this.getWorkerOrder();
      }else{
        this.getClientOrder();
        this.getOrderSummary();
      }
      if(res==true){
        console.log("delete Transaction");
        this.DeleteTransactionAlert(orderID);
      }
    });
  }

  deleteTransaction(orderID:number,isCarryForward:boolean){
    this.userService.DeleteTransaction(orderID,isCarryForward)
        .subscribe(()=>{
          this.showAlert("Success","Attached transaction has been deleted");
          this.getBalanceSheet();
        },
        (error:any) =>{
          console.log(error.message);
          this.showAlert("Error",error.message);
      });
  }

  ngOnInit(){
    this.getWorkerOrder();
    this.getClientOrder();
    this.getOrderSummary();
    this.getBalanceSheet();
  }
}
