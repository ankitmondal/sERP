import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-addBuyerOrder',
  templateUrl: 'addBuyerOrder.html'
})
export class addBuyerOrder {
  ClientId: string;
  ItemId:string;
  Quantity:number;
  Melt:number;
  ExpectedDate:Date;
  AdvanceAmount:number;
  Clients: any;//Array<{Name: string, Id: string}>;
  Items:any;//Array<{Name:string,Id:string}>;

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
    
      // this.Clients=[{Name:"Ankit",Id:"AM"},
      //               {Name:"Purnendu",Id:"PM"},
      //               {Name:"Sukhendu",Id:"SM"}];
this.userService.GetMyItems()
    .subscribe((myItems:any) => {
      console.log(myItems);
      this.Items = myItems;
    },
      (error:any) => {
        console.log(error);
      });
      // this.Items=[{Name:"Dish",Id:"D"},
      //             {Name:"Plate",Id:"P"},
      //             {Name:"Bowl",Id:"B"}]
  }
  addBuyerOrder() {
    console.log(this.ClientId + this.ItemId + this.Quantity + this.Melt + 
      this.ExpectedDate + this.AdvanceAmount);
  }

  reset(){
    this.ClientId =null;
    this.Quantity = 0;
    this.ItemId= null;
    this.Melt = 0;
    this.ExpectedDate =null;
     this.AdvanceAmount=0;
  }
}
