import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
@Component({
  selector: 'page-addWorkerOrder',
  templateUrl: 'addWorkerOrder.html'
})
export class addWorkerOrder {
  WorkerName: string;
  ItemName:string;
  Quantity:number;
  Melt:number;
  ExpectedDate:Date;
  AdvanceAmount:number;
  Workers: any;//Array<{Name: string, Id: string}>;
  Items:any;//Array<{Name:string,Id:string}>;

  constructor(public navCtrl: NavController,public adminService:AdminServiceProvider,public userService:UserServiceProvider) {

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
    console.log(this.WorkerName + this.ItemName + this.Quantity + this.Melt + 
      this.ExpectedDate + this.AdvanceAmount);
  }

}
