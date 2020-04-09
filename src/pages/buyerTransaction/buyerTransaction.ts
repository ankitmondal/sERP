import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-buyerTransaction',
  templateUrl: 'buyerTransaction.html'
})
export class buyerTransaction implements OnInit {
  ClientId: number;
  Clients:any;
  Transactions:any;
  TranSummary:any;
  constructor(public navCtrl: NavController,public userService:UserServiceProvider) {
  }

  generate(){
    this.userService.GetClientTransaction(this.ClientId)
    .subscribe((myTrans:any) => {
      console.log(myTrans);
      this.Transactions = myTrans.Details;
      this.TranSummary=myTrans.Summary;
      console.log(this.TranSummary);
    },
      (error:any) => {
        console.log(error);
      });
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
  }
}
