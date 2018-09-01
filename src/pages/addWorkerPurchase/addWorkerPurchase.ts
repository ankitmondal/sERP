import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-addWorkerPurchase',
  templateUrl: 'addWorkerPurchase.html'
})
export class addWorkerPurchase {
  WorkerName: string;
  ItemName: string;
  Quantity: number = 0;
  Melt: number = 58;
  Wastage: number = 5;
  Payment: number = this.Melt + this.Wastage;
  Fine: number = this.Quantity * this.Payment / 100;
  Advance:number=0;
  MetalPaid:number;
  Workers: any;//Array<{ Name: string, Id: string }>;
  Items: any;//Array<{ Name: string, Id: string }>;
  submitted: boolean = false;
  constructor(public modalCtrl: ModalController,public userService:UserServiceProvider) {
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
    console.log(this.WorkerName + this.ItemName + this.Quantity + this.Melt +
      this.Wastage + this.Payment);
    this.submitted = false;
  }
  calculate() {
    this.Fine = this.Quantity * (this.Melt * 1 + this.Wastage * 1 ) / 100;
  }
  presentModal() {
    this.submitted = true;
  }

}
