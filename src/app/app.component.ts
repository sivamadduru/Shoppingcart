import { outputAst } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  amazonDataSource = [
    {
      id: '',
      item: '',
      count: 0,
      totalprice: 0,
    },
  ];
  flipKartDataSource = [
    {
      id: '',
      item: '',
      count: 0,
      totalprice: 0,
    },
  ];
  
  myntraDataSource = [
    {
      id: '',
      item: '',
      count: 0,
      totalprice: 0,
    },
  ];
  tabName: string = 'Flipkart';

  constructor() {}

  getIndex(eve: any) {
    this.tabName =
      eve.index == 0 ? 'Flipkart' : eve.index == 1 ? 'Amazon' : 'Myntra';
  }
}
