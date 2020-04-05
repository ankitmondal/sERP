import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: 'testing@test.com', password: 'Test@123' };

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    if (this.registerCredentials.email === null || this.registerCredentials.password === null) {
      this.showError('Please Enter Credentials');
    }
    else {
      this.showLoading();
      this.auth.login(this.registerCredentials).subscribe((data: any) => {
        localStorage.setItem('userToken', data.access_token);
        this.navCtrl.setRoot(HomePage);
      },
        (err: any) => {
          this.showError(err.message);
          console.log("Login Error");
        });
    }
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
