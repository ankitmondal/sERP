import { AdminServiceProvider } from './../../providers/admin-service/admin-service';
import { Component } from '@angular/core';
import { orderModel } from '../../models/order.model';
import { ModalController,NavController,AlertController, DateTime } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-addWorkerPurchase',
  templateUrl: 'addWorkerPurchase.html'
})
export class addWorkerPurchase {
  WorkerID: number;
  ItemID:number;
  Quantity: number = 0;
  Melt: number ;
  Wastage: number ;
  Payment: number = this.Melt + this.Wastage;
  Fine: number = this.Quantity * this.Payment / 100;
  Advance:number=0;
  MetalPaid:number;
  Workers: any;//Array<{ Name: string, Id: string }>;
  Items: any;//Array<{ Name: string, Id: string }>;
  submitted: boolean = false;
  constructor(public modalCtrl: ModalController,public userService:UserServiceProvider,
    public navCtrl: NavController, public alertCtrl: AlertController) 
  {
    this.userService.GetWorker()
    .subscribe((myWorkers:any) => {
      console.log(myWorkers);
      this.Workers = myWorkers;
    },
      (error:any) => {
        console.log(error);
      });
    // this.Workers = [{ Name: "Ankit", Id: "AM" },
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
  purchaseFromWorker() {
    let wOrder:orderModel = new orderModel(0,this.WorkerID,this.ItemID,this.Fine,this.Melt,this.Advance,0,null,null,null,"",0,3)
    console.log(this.WorkerID);

    this.userService.AddOrder(wOrder)
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
    // console.log(this.WorkerName + this.ItemName + this.Quantity + this.Melt +
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
    this.Fine = this.Quantity * (this.Melt * 1 + this.Wastage * 1 ) / 100;
  }
  presentModal() {
    this.submitted = true;
  }

}
