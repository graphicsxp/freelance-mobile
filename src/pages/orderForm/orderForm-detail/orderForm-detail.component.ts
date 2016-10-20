import { IOrderForm } from '../model/orderForm-model';
import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { OrderFormService } from '../service/orderForm-service';
import { LoadingService } from '../../shared/service/loading-service';
import { Vibration, Transfer, FileOpener } from 'ionic-native';

declare var cordova: any;

@Component({
  selector: 'order-form-detail',
  templateUrl: './orderForm-detail.component.html',
  providers: [OrderFormService, LoadingService]
})
export class OrderFormDetailComponent implements OnInit {
  myOrderForm: IOrderForm;
  errorMessage: string;

  constructor(private _navParams: NavParams,
    private _viewCtrl: ViewController,
    private _orderFormService: OrderFormService) { }

  ngOnInit(): void {
    this._orderFormService.getById(+this._navParams.get('id')).subscribe(
      orderForm => this.myOrderForm = orderForm,
      error => this.errorMessage = <any>error
    );
  }

  dismiss() { this._viewCtrl.dismiss(); }

  openOrderForm(item: IOrderForm): void {
    let fileTransfer: Transfer = new Transfer();
    let targetPath = cordova.file.externalDataDirectory + 'myOrderForm.pdf';

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
