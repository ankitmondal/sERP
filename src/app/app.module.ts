import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { addWorker } from '../pages/addWorker/addWorker'
import { addBuyer } from '../pages/addBuyer/addBuyer'
import { addItem } from '../pages/addItem/addItem'
import { addCapital } from '../pages/addCapital/addCapital'
import { addWorkerOrder } from '../pages/addWorkerOrder/addWorkerOrder'
import { addWorkerPurchase } from "../pages/addWorkerPurchase/addWorkerPurchase"
import { addBuyerOrder } from "../pages/addBuyerOrder/addBuyerOrder"
import { addBuyerSale } from "../pages/addBuyerSale/addBuyerSale"

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Image upload plugins
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    addWorker,
    addBuyer,
    addItem,
    addCapital,
    addWorkerOrder,
    addWorkerPurchase,
    addBuyerOrder,
    addBuyerSale,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    addWorker,
    addBuyer,
    addItem,
    addCapital,
    addWorkerOrder,
    addWorkerPurchase,
    addBuyerOrder,
    addBuyerSale,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
