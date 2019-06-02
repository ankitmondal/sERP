import { Component } from '@angular/core';
import { orderModel } from '../../models/order.model';
import { AlertController,NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-addBuyerSale',
  templateUrl: 'addBuyerSale.html'
})
export class addBuyerSale {
  ClientId: number;
  ItemId:number;
  Quantity: number = 0;
  Melt: number = 58;
  Wastage: number = 5;
  Payment: number = this.Melt + this.Wastage;
  Fine: number = this.Quantity * this.Payment / 100;
  Advance: number = 0;
  MetalPaid: number;
  Clients:any;// Array<{ Name: string, Id: string }>;
  Items: any;//Array<{ Name: string, Id: string }>;
  submitted: boolean = false;
  constructor(public navCtrl: NavController,public userService:UserServiceProvider, 
    public alertCtrl: AlertController) {

    this.userService.GetMyClients()
    .subscribe((myClients:any) => {
      console.log(myClients);
      this.Clients = myClients;
    },
      (error:any) => {
        console.log(error);
      });
    // this.Clients = [{ Name: "Ankit", Id: "AM" },
    // { Name: "Purnendu", Id: "PM" },
    // { Name: "Sukhendu", Id: "SM" }];
    this.userService.GetMyItems()
    .subscribe((myItems:any) => {
      console.log(myItems);
      this.Items = myItems;
    },
      (error:any) => {
        console.log(error);
      });
    // this.Items = [{ Name: "Dish", Id: "D" },
    // { Name: "Plate", Id: "P" },
    // { Name: "Bowl", Id: "B" }]
  }
  SaleToClient() {
    let bOrder:orderModel = new orderModel(0,this.ClientId,this.ItemId,this.Fine,this.Melt,this.Advance,0,null,null,null,"",0,4)
    console.log(bOrder);

    this.userService.AddOrder(bOrder)
    .subscribe(addedOrder => {
      this.showAlert("Success","Order has been added successfully");
      console.log(addedOrder);
      // this.reset();
    },
      (error:any) => {
        console.log(error.message);
        this.showAlert("Error",error.message);
        console.log("Error");
      }
    );

    // console.log(this.ClientId + this.ItemId + this.Quantity + this.Melt +
    //   this.Wastage + this.Payment);
    // this.submitted = false;
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
}
