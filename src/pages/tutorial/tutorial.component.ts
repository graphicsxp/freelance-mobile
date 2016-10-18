import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Tutorial page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'tutorial',
  templateUrl: 'tutorial.component.html'
})
export class TutorialComponent {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    // console.log('Hello Tutorial Page');
  }

}
