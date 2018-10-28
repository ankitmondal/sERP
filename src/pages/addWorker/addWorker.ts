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
  phoneNumber: number;
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
    this.adminService.AddWorker(this.WorkerName , this.age , this.address , this.phoneNumber)
    .subscribe(addedWorker => {
      this.showAlert("Success","Worker has been added successfully");
      console.log(addedWorker);
      this.reset();
    },
      (error:any) => {
        console.log(error.message);
        this.showAlert("Error",error.message);
        console.log("Error");
      }
    );

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
  showUpdateDeleteActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your added Item',
      buttons: [
        {
          text: 'Edit',
          role: 'Edit',
          handler: () => {
            console.log('Destructive clicked');
            this.showAlert("Item Edited", "Your Item has been updated");
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Archive clicked');
            this.showAlert("Item Deleted", "Your Item has been removed from list");
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
    this.showUpdateDeleteActionSheet();
  }

  reset(){
    this.WorkerName = "";
    this.age = 0;
    this.address = "";
    this.phoneNumber = 0;
  }
}


