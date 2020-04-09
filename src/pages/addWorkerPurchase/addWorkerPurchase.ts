import { Component, OnInit } from '@angular/core';
import { orderModel } from '../../models/order.model';
import { NavController,AlertController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-addWorkerPurchase',
  templateUrl: 'addWorkerPurchase.html'
})
export class addWorkerPurchase implements OnInit {
  OrderID: number;
  WorkerID: number;
  ItemID:number;
  Quantity: number = 0;
  Melt: number ;
  Wastage: number ;
  Payment: number = this.Melt + this.Wastage;
  Fine: number = this.Quantity * this.Payment / 100;
  Advance:number=0;
  MetalPaid:number;
  Workers: any;
  Items: any;
  submitted: boolean = false;
  constructor(public userService:UserServiceProvider,public navCtrl: NavController, 
              public alertCtrl: AlertController,private navParams:NavParams) {
    
    let purchaseOrder = navParams.get('item');

    if (purchaseOrder != null) {
      this.WorkerID = purchaseOrder.karigarID;
      this.ItemID = purchaseOrder.itemID;
      this.Quantity = purchaseOrder.quantity;
      this.Melt = purchaseOrder.melt;
      this.OrderID = purchaseOrder.orderID;
      this.Advance =purchaseOrder.advancedRawMat;
      console.log("Purchase order");
      console.log(purchaseOrder);
    }
  }
  purchaseFromWorker() {
    let wOrder:orderModel = new orderModel(this.OrderID,this.WorkerID,this.ItemID,this.Quantity,
                                           this.Melt,this.Advance,this.Fine,null,null,null,this.MetalPaid,0,3)
    console.log(this.WorkerID);

    this.userService.AddOrder(wOrder)
    .subscribe(addedOrder => {
      this.showAlert("Success","Order has been added successfully");
      console.log(addedOrder);
      this.reset();
    },
      (error:any) => {
        console.log(error.message);
        this.showAlert("Error",error.message);
        console.log("Error");
      }
    );
    
  }
  showAlert(title, message) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  calculate() {
    this.Fine = this.Quantity * (this.Melt * 1 + this.Wastage * 1 ) / 100;
  }
  presentModal() {
    this.submitted = true;
  }
  reset(){
    this.submitted=false;
    this.WorkerID=0;
    this.ItemID=0;
    this.Quantity = 0;
    this.Melt=0 ;
    this.Wastage=0;
    this.Payment = this.Melt + this.Wastage;
    this.Fine = this.Quantity * this.Payment / 100;
    this.Advance=0;
    this.MetalPaid=0;
  }

  goBack() {
    this.navCtrl.pop();
  }
  
  ngOnInit(){
    this.userService.GetWorker()
    .subscribe((myWorkers:any) => {
      console.log(myWorkers);
      this.Workers = myWorkers;
    },
      (error:any) => {
        console.log(error);
      });
    
    this.userService.GetMyItems()
    .subscribe((myItems:any) => {
      console.log(myItems);
      this.Items = myItems;
    },
      (error:any) => {
        console.log(error);
      });
  }
}
