import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { OrderFormListComponent } from '../pages/orderForm/orderForm-list/orderForm-list.component';
import { OrderFormDetailComponent } from '../pages/orderForm/orderForm-detail/orderForm-detail.component';

import { TutorialComponent } from '../pages/tutorial/tutorial.component'

import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';

import { HeaderComponent } from '../pages/shared/component/header.component';

// import { BaseService } from '../providers/base.service';
import { OrderFormService } from '../pages/orderForm/service/orderForm-service';
import { LoadingService } from '../pages/shared/service/loading-service';
import { NetworkAvailabilityService } from '../pages/shared/service/networkAvailability-service';


import 'rxjs/Rx'; // load all features of reactive extensions

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '34433194'
  },
  'push': {
    'sender_id': '623443274766',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    OrderFormDetailComponent,
    OrderFormListComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    TutorialComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrderFormDetailComponent,
    OrderFormListComponent,
    LoginComponent,
    SignupComponent,
    TutorialComponent
  ],
  providers: [LoadingService, OrderFormService, NetworkAvailabilityService]
})
export class AppModule { }
