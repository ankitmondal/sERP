import { Component,OnInit } from '@angular/core';
import { NavController} from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-workerTransaction',
  templateUrl: 'workerTransaction.html'
})
export class workerTransaction implements OnInit {
  WorkerID: number;
  Workers:any;
  Transactions:any;
  TranSummary:any;
  constructor(public navCtrl: NavController,public userService:UserServiceProvider) {
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
 
  ngOnInit(){
    this.userService.GetWorker()
    .subscribe((myWorkers:any) => {
      this.Workers = myWorkers;
    },
      (error:any) => {
        console.log(error);
      });
  }
}
