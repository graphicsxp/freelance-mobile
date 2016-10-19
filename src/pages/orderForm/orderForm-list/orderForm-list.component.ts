import { Component, OnInit } from '@angular/core';
import { IOrderForm } from '../model/orderForm-model';
import { NavController, ModalController } from 'ionic-angular';
import { OrderFormDetailComponent } from '../orderForm-detail/orderForm-detail.component';
import { OrderFormService } from '../service/orderForm-service';
import { Vibration, Transfer, FileOpener } from 'ionic-native';

//import * as  _ from 'lodash';

declare var cordova: any;

@Component({
  selector: 'order-form-list',
  templateUrl: './orderForm-list.component.html',
  providers: [OrderFormService]
})
export class OrderFormListComponent
  implements OnInit {

  orderForms: IOrderForm[] = [];
  errorMessage: string;

  constructor(private _orderFormService: OrderFormService,
    private _modalCtrl: ModalController,
    private _navCtrl: NavController) { }

  ngOnInit(): void {
    this._orderFormService.getAll()
      .subscribe(
      orderForms => this.orderForms = orderForms,
      error => this.errorMessage = <any>error
      );
  }

  itemSelected(item: IOrderForm): void {
    this._navCtrl.push(OrderFormDetailComponent, { id: item.id })
  }

  openOrderForm(item: IOrderForm): void {
    let fileTransfer: Transfer = new Transfer();
    let targetPath = cordova.file.dataDirectory + 'myOrderForm.pdf';

    fileTransfer.download(item.fileUrl, targetPath).then((res) => {
      console.log('the file was downloaded successfully:' + res);
      FileOpener.open(targetPath, 'application/pdf').then((res) => {
        console.log('the file was opened successfully:' + res);
      }).catch(err => {
        console.log('an error occured while opening the file:' + err)
      });
      Vibration.vibrate(1500);
    }).catch((err) => {
      console.log('an error occured while downloading the file:' + err)
      Vibration.vibrate(100);
    });
  }
}
