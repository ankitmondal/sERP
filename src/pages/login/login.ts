import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {

    if (this.registerCredentials.email === null || this.registerCredentials.password === null) {
      console.log('Please entercredentials');
    }
    else {
      this.showLoading();

      this.auth.login(this.registerCredentials).subscribe((data: any) => {
        console.log(data.access_token);
        localStorage.setItem('userToken', data.access_token);
        this.navCtrl.setRoot(HomePage);
      },
        (err: any) => {
          this.showError(err.message);
          console.log("Login Error");
        });
    }
    // this.auth.login(this.registerCredentials).subscribe(allowed => {
    //   if (allowed) {        
    //     this.navCtrl.setRoot(HomePage);
    //   } else {
    //     this.showError("Access Denied");
    //   }
    // },
    //   error => {
    //     this.showError(error);
    //   });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
