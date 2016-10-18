import { IOrderForm } from '../model/orderForm-model';
import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { OrderFormService } from '../service/orderForm-service';
import { LoadingService } from '../../shared/service/loading-service';

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

  dismiss() {
    this._viewCtrl.dismiss();
  }
}
