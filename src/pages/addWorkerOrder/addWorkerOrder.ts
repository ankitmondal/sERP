import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  Workers: Array<{Name: string, Id: string}>;
  Items:Array<{Name:string,Id:string}>;

  constructor(public navCtrl: NavController) {
      this.Workers=[{Name:"Ankit",Id:"AM"},
                    {Name:"Purnendu",Id:"PM"},
                    {Name:"Sukhendu",Id:"SM"}];

      this.Items=[{Name:"Dish",Id:"D"},
                  {Name:"Plate",Id:"P"},
                  {Name:"Bowl",Id:"B"}]
  }
  addWorkerOrder() {
    console.log(this.WorkerName + this.ItemName + this.Quantity + this.Melt + 
      this.ExpectedDate + this.AdvanceAmount);
  }

}
