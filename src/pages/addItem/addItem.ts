import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform,
         LoadingController, Loading, AlertController  } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { itemModel  } from '../../models/item.model';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

declare var cordova: any;

@Component({
  selector: 'page-addItem',
  templateUrl: 'addItem.html'
})
export class addItem {
  ItemName: string;
  Category: string;

  lastImage: string = null;
  loading: Loading;

  selectedItem: any;
  icons: string[];
  items: itemModel[];//Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, 
              private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, 
              public adminService:AdminServiceProvider,  public userService: UserServiceProvider,
              public platform: Platform, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

      this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];
  
      this.items = [];
      // for (let i = 1; i < 11; i++) {
      //   this.items.push({
      //     title: 'Item ' + i,
      //     note: 'This is item #' + i,
      //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      //   });
      // }

  }

  ngOnInit(){
    this.getItem();
  }
  addItem() {
    let item:itemModel = new itemModel(this.ItemName,this.Category);
    this.adminService.AddItem(item)
    .subscribe(addedItem => {
      this.showAlert("Success","Item has been added successfully");
      console.log(addedItem);
      this.reset();
    },
      (error:any) => {
        console.log(error.message);
        this.showAlert("Error",error.message);
        console.log("Error");
      }
    );

    console.log(this.ItemName + this.Category);
  }

  getItem(){
    this.userService.GetMyItems()
        .subscribe((data:any)=>{
          this.items=data;
          console.log(this.items);
        },
        (error:any) =>{
          console.log(error.message);
          this.showAlert("Error",error.message);
          console.log("Error");
      });
  }

  showUpdateDeleteActionSheet(item:any) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your added Item',
      buttons: [
        {
          text: 'Edit',
          role: 'Edit',
          handler: () => {
            console.log('Update clicked');
            this.showAlert("Item Edited","Your Item has been updated");
          }
        },{
          text: 'Delete',
          handler: () => {
            console.log('Remove clicked '+ item.itemID );
            this.adminService.DeleteItem(item.itemID).subscribe((res: any) => console.log("user deleted"));;
            this.showAlert("Item Deleted","Your Item has been removed from list");
            this.getItem();
          }
        },{
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
  showAlert(title,message) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(addItem, {
    //   item: item
    // });
    console.log(event);
    console.log(item);
    this.showUpdateDeleteActionSheet(item);
  }
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
  
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  // Always get the accurate path to your apps folder
  
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  
  public uploadImage() {
    // Destination URL
    var url = "http://yoururl/upload.php";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }
  reset(){
    this.ItemName = "";
    this.Category = "";   
  }



}
