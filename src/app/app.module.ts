import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//Pages
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

//API Call Related
import { HttpClientModule } from '@angular/common/http';
// import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './auth/auth.interceptor'
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { AdminServiceProvider } from '../providers/admin-service/admin-service';
import { HttpModule } from "@angular/http";

import { PipesModule} from "../pipes/pipes.module";


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
    HttpClientModule,
    HttpModule,
    PipesModule,
    IonicModule.forRoot(MyApp)
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
    AuthServiceProvider,
    AdminServiceProvider,
    UserServiceProvider
    // ,
    // {
    //   provide : HTTP_INTERCEPTORS,
    //   useClass : AuthInterceptor,
    //   multi : true
    // }
    
  ]
})
export class AppModule {}
