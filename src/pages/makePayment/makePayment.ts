import { Component,OnInit } from '@angular/core';
import { NavController, ActionSheetController, AlertController  } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { TransModel } from '../../models/trans.model';


@Component({
  selector: 'page-makePayment',
  templateUrl: 'makePayment.html'
})
export class makePayment implements OnInit {
  Workers: any;
  WorkerID:number;
  Quantity:number;
  isReverse:boolean=false;
  Transactions: any;
  TranSummary: any;

  constructor(public navCtrl: NavController,public userService: UserServiceProvider,
               public alertCtrl: AlertController, public actionSheetCtrl : ActionSheetController) {
  }

  ngOnInit(){
    this.userService.GetWorker()
    .subscribe((myWorkers:any) => {
      this.Workers = myWorkers;
    },
      (error:any) => {
        console.log(error);
      });
  }
   createTransactionRecord(){
    let trans:TransModel= new TransModel(this.isReverse,this.WorkerID,null,this.Quantity);
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
    this.WorkerID=0;
    this.Quantity=null;
    this.isReverse=false;
  }

  generate(){
    this.userService.GetWorkerTransaction(this.WorkerID)
    .subscribe((myTrans:any) => {
      console.log(myTrans);
      this.Transactions = myTrans.Details;
      this.TranSummary=myTrans.Summary;
    },
      (error:any) => {
        console.log(error);
      });
  }
}
