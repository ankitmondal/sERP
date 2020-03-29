import { Component,OnInit } from '@angular/core';
import { orderModel } from '../../models/order.model';
import { NavController,AlertController } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-addBuyerOrder',
  templateUrl: 'addBuyerOrder.html'
})
export class addBuyerOrder implements OnInit {
  ClientId: number;
  ItemId:number;
  Quantity:number;
  Melt:number;
  ExpectedDate:Date;
  AdvanceAmount:number;
  Clients: any;
  Items:any;
  Orders:any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public adminService:AdminServiceProvider,public userService:UserServiceProvider) {
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

  addBuyerOrder() {
    let wOrder:orderModel = new orderModel(0,this.ClientId,this.ItemId,this.Quantity,this.Melt,this.AdvanceAmount,0,this.ExpectedDate,null,null,0,0,2)
    console.log(wOrder);
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
    console.log(this.ClientId.toString() + this.ItemId + this.Quantity + this.Melt + 
      this.ExpectedDate + this.AdvanceAmount);
  }
  showAlert(title, message) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  reset(){
    this.ClientId =null;
    this.Quantity = 0;
    this.ItemId= null;
    this.Melt = 0;
    this.ExpectedDate =null;
     this.AdvanceAmount=0;
  }

  getClientOrder(){
    this.userService.GetClientOrderSummary()
        .subscribe((data:any)=>{
          this.Orders=data;
          console.log(this.Orders);
        },
        (error:any) =>{
          console.log(error.message);
          this.showAlert("Error",error.message);
          console.log("Error");
      });

  }
  ngOnInit(){
    this.getClientOrder();
  }
}
