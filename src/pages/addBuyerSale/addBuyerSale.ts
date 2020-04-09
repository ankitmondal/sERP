import { Component, OnInit } from '@angular/core';
import { orderModel } from '../../models/order.model';
import { AlertController,NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-addBuyerSale',
  templateUrl: 'addBuyerSale.html'
})
export class addBuyerSale implements OnInit {
  ClientId: number;
  ItemId:number;
  Quantity: number = 0;
  Melt: number = 58;
  Wastage: number = 5;
  Payment: number = (this.Melt*1 + this.Wastage*1);
  Fine: number = this.Quantity * this.Payment / 100;
  Advance: number = 0;
  MetalPaid: number;
  Clients:any;
  Items: any;
  submitted: boolean = false;
  orderID:number=0;
  constructor(public navCtrl: NavController,public userService:UserServiceProvider, 
              public alertCtrl: AlertController,private navParams:NavParams) {
    
    let saleOrder = navParams.get('item');
    if (saleOrder != null) {
      this.ItemId=saleOrder.itemID;
      this.Quantity= saleOrder.quantity;
      this.Melt=saleOrder.melt;
      this.ClientId=saleOrder.clientID;
      this.orderID=saleOrder.orderID;
      console.log(saleOrder);
    }
  }

  SaleToClient() {
    let bOrder:orderModel = new orderModel(this.orderID,this.ClientId,this.ItemId,this.Quantity,this.Melt,
                                           this.Advance,this.Fine,null,null,null,this.MetalPaid,0,4)
    console.log(bOrder);
    this.userService.AddOrder(bOrder)
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
    this.Fine = this.Quantity * (this.Melt*1 + this.Wastage*1) / 100;
  }
  presentModal() {
    this.submitted = true;
  }
  reset(){
    this.submitted=false;
    this.ClientId=0;
    this.ItemId=0;
    this.Quantity = 0;
    this.Melt=0 ;
    this.Wastage=0;
    this.Payment = this.Melt + this.Wastage;
    this.Fine = this.Quantity * this.Payment / 100;
    this.Advance=0;
    this.MetalPaid=0;
  }
  ngOnInit(){
    this.userService.GetMyClients()
    .subscribe((myClients:any) => {
      console.log(myClients);
      this.Clients = myClients;
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
