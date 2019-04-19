import { workerModel } from './../../models/worker.model';
//import { Woker } from './../../app/worker';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
@Component({
  selector: 'page-addWorker',
  templateUrl: 'addWorker.html'
})
export class addWorker implements OnInit {
  WorkerName: string;
  age: number;
  address: string;
  phoneNumber: string;
  kID: number;
  icons: string[];
  Workers: any;//Array<{ wId:string ,wName: string, wAddress: string, icon: string }>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,
    public adminService:AdminServiceProvider, public userService: UserServiceProvider ) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.Workers = [];
    // for (let i = 1; i < 3; i++) {
    //   this.Workers.push({
    //     wId:'',
    //     wName: 'Worker ' + i,
    //     wAddress: 'Address  #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
    
  }

  ngOnInit(){
    this.getWorker();
  }

  addWorker() {
    let worker:workerModel = new workerModel(this.WorkerName,this.address,this.phoneNumber,this.age,this.kID);

    if(worker.kID === undefined){
    this.adminService.AddWorker(this.WorkerName , this.age , this.address , this.phoneNumber)
    .subscribe(addedWorker => {
      this.showAlert("Success","Worker has been added successfully");
      console.log(addedWorker);
      this.reset();
      this.getWorker();
    },
      (error:any) => {
        console.log(error.message);
        this.showAlert("Error",error.message);
        console.log("Error");
      }
    );
  }
    else{
      this.adminService.UpdateWorker(this.kID,worker)
      .subscribe(UpdatedWorker => {
        this.showAlert("Success","Worker has been Updated successfully");
        console.log(UpdatedWorker);
        this.reset();
        this.getWorker();
      },
        (error:any) => {
          console.log(error.message);
          this.showAlert("Error",error.message);
          console.log("Error in Update");
        }
      );
    }

    console.log(this.WorkerName + this.age + this.address + this.phoneNumber);
  }

  getWorker(){
    this.userService.GetWorker()
        .subscribe((data:any)=>{
          this.Workers=data;
          console.log(this.Workers);
        },
        (error:any) =>{
          console.log(error.message);
          this.showAlert("Error",error.message);
          console.log("Error");
      });
  }
  showUpdateDeleteActionSheet(worker:any) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your added Item',
      buttons: [
        {
          text: 'Edit',
          role: 'Edit',
          handler: () => {
            console.log('Update clicked for' +worker.workerName );
            this.WorkerName= worker.workerName;
  this.age=worker.wAge;
  this.address=worker.wAddress ;
  this.phoneNumber=worker.wPhone ;
  this.kID=worker.kID ;
            this.showAlert("Worker Edit", "Your Worker details has been loaded");
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Remove clicked for '+worker.kID);
            this.adminService.DeleteWorker(worker.kID).subscribe((res: any) => console.log("worker deleted"));;
            this.showAlert("Worker Deleted", "Your Worker has been removed from list");
            this.getWorker();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showAlert(title, message) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  itemTapped(event, item) {
    console.log(event);
    console.log(item);
    this.showUpdateDeleteActionSheet(item);
  }

  reset(){
    this.WorkerName = "";
    this.age = 0;
    this.address = "";
    this.phoneNumber = "";
    this.kID=undefined;
  }
}


