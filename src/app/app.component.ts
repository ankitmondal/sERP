import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { addWorker } from '../pages/addWorker/addWorker'
import { addBuyer } from '../pages/addBuyer/addBuyer'
import { addItem } from '../pages/addItem/addItem'
import { addCapital } from '../pages/addCapital/addCapital'
import { addWorkerOrder } from '../pages/addWorkerOrder/addWorkerOrder'
import { addWorkerPurchase } from "../pages/addWorkerPurchase/addWorkerPurchase"
import { addBuyerOrder } from "../pages/addBuyerOrder/addBuyerOrder"
import { addBuyerSale } from "../pages/addBuyerSale/addBuyerSale"

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  //rootPage: any = HomePage;
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;
  _pageComponent:Component;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'addWorker', component: addWorker },
      { title: 'Buyer', component: addBuyer },
      { title: 'Item', component: addItem },
      { title: 'Capital', component: addCapital },
      { title: 'placeOrder', component: addWorkerOrder },
      { title: 'purchaseItem', component: addWorkerPurchase },
      { title: 'acceptOrder', component: addBuyerOrder },
      { title: 'sale', component: addBuyerSale }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToPage(pageName) {
    this._pageComponent=this.pages.find(x=>x.title==pageName).component;
    this.nav.setRoot(this._pageComponent);
  }

}
