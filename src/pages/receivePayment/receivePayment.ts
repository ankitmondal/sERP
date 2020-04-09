import { Component,OnInit } from '@angular/core';
import { NavController, ActionSheetController, AlertController  } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { TransModel } from '../../models/trans.model';
@Component({
  selector: 'page-receivePayment',
  templateUrl: 'receivePayment.html'
})
export class receivePayment implements OnInit {
  Clients: any;
  ClientId:number;
  Quantity:number;
  isReverse:boolean=false;
  Transactions: any;
  TranSummary: any;

  constructor(public navCtrl: NavController,public userService: UserServiceProvider,
               public alertCtrl: AlertController, public actionSheetCtrl : ActionSheetController) {
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

  createTransactionRecord(){
    let trans:TransModel= new TransModel(this.isReverse,null,this.ClientId,this.Quantity);
    this.userService.CreateTransaction(trans)
    .subscribe(()=>{
      this.showAlert("Success","Your payment transaction has been recorded");
      this.generate();
      this.reset();
    },
      (error:any) => {
        console.log(error.message);
        this.showAlert("Error",error.message);
        console.log("Error");
      }
    );
   }

  showAlert(title,message) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  reset(){
    this.ClientId=0;
    this.Quantity=null;
    this.isReverse=false;
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
}
