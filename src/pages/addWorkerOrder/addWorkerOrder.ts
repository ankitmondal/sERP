import { workerorderModel } from './../../models/workerorder.model';
import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
@Component({
  selector: 'page-addWorkerOrder',
  templateUrl: 'addWorkerOrder.html'
})
export class addWorkerOrder {
  WorkerID: number;
  ItemID:number;
  Quantity:number;
  Melt:number;  
  ExpectedDate:Date;
  AdvanceAmount:number;
  Description: string;
  Workers: any;//Array<{Name: string, Id: string}>;
  Items:any;//Array<{Name:string,Id:string}>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public adminService:AdminServiceProvider,public userService:UserServiceProvider) {

    this.userService.GetWorker()
    .subscribe((myWorkers:any) => {
      console.log(myWorkers);
      this.Workers = myWorkers;
    },
      (error:any) => {
        console.log(error);
      });
    

      // this.Workers=[{Name:"Ankit",Id:"AM"},
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
  addWorkerOrder() {
    let wOrder:workerorderModel = new workerorderModel(0,this.WorkerID,this.ItemID,this.Quantity,this.Melt,this.AdvanceAmount,0,this.ExpectedDate,null,null,"",0)
    this.userService.AddWorkerOrder(wOrder)
    .subscribe(addedItem => {
      this.showAlert("Success","Order has been added successfully");
      console.log(addedItem);
      this.reset();
    },
      (error:any) => {
        console.log(error.message);
        this.showAlert("Error",error.message);
        console.log("Error");
      }
    );
    console.log(this.WorkerID.toString() + this.ItemID + this.Quantity + this.Melt + 
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
    this.WorkerID =0;
    this.Quantity = 0;
    this.ItemID =0;
    this.Melt = 0;
  }
}
