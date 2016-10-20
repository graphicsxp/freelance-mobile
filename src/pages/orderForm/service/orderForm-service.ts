import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IOrderForm } from '../model/orderform-model';
import { BaseService } from '../../../providers/base.service';
import { Http } from '@angular/http';
import { LoadingService } from '../../shared/service/loading-service';

@Injectable()
export class OrderFormService extends BaseService<IOrderForm>{

  constructor(_http: Http,  @Inject(LoadingService) loadingService: LoadingService) {
    super(_http, loadingService);
    this.serviceUrl = './build/orderForms.json';
  }

  getAll(): Observable<IOrderForm[]> {
    return super.getAll();
  }

  getById(id: number): Observable<IOrderForm> {
    return super.getById(id);
  }
}
