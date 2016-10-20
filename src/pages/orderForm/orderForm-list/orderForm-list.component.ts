import { Component, OnInit } from '@angular/core';
import { IOrderForm } from '../model/orderForm-model';
import { NavController, ModalController } from 'ionic-angular';
import { OrderFormDetailComponent } from '../orderForm-detail/orderForm-detail.component';
import { OrderFormService } from '../service/orderForm-service';

//import * as  _ from 'lodash';

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
}
