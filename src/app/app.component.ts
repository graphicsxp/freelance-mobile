import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { OrderFormListComponent } from '../pages/orderForm/orderForm-list/orderForm-list.component';
import { TutorialComponent } from '../pages/tutorial/tutorial.component';
import { LoginComponent } from '../pages/login/login.component';
import { Auth, User } from '@ionic/cloud-angular';
import { Push, PushToken } from '@ionic/cloud-angular';
import { AppVersion } from 'ionic-native';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginComponent;

  pages: Array<{ title: string, component: any }>;
  username: string;
  numberOfOrderForms: number = 0;
  orderFormListComponent = OrderFormListComponent;
  tutorialComponent = TutorialComponent;
  app: any = {
    name: '',
    versionCode: '',
    versionNumber: '',
    packageName: ''
  };

  constructor(public platform: Platform, private _auth: Auth, public user: User, private _alertController: AlertController, public push: Push) {
    this.initializeApp();

    let menu: any;

    if (this._auth.isAuthenticated()) {
      menu = { title: 'Welcome ' + this.user.details.name + ' (Logout)', component: null }
    } else {
      menu = { title: 'Login', component: LoginComponent }
    }

    this.username = this.user.details.username;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      AppVersion.getAppName().then(v => this.app['name'] = v);
      AppVersion.getVersionCode().then(v => this.app['versionCode'] = v);
      AppVersion.getVersionNumber().then(v => this.app['versionNumber'] = v);
      AppVersion.getPackageName().then(v => this.app['versionCode'] = v);

      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        console.log('Token saved:', t.token);
      });

      this.push.rx.notification()
        .subscribe((msg) => {
          this.numberOfOrderForms++;
        });

      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false); // for ios overlapping

      if (Splashscreen) {
        setTimeout(() => {
          Splashscreen.hide();
        }, 100);
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.numberOfOrderForms = 0;
    this.nav.setRoot(page);
  }

  logout() {

    let confirm = this._alertController.create({
      title: 'Confirm',
      message: 'Are you sure you want to logout ?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            this._auth.logout();
            this.nav.setRoot(LoginComponent);
          }
        }
      ]
    });
    confirm.present();
  }
}
