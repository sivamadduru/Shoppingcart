import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  array: any = [
    {
      tabName: 'Flipkart',
      itemsArray: [{ id: '', item: '', count: 0, totalprice: 0 }],
    },
    {
      tabName: 'Amazon',
      itemsArray: [{ id: '', item: '', count: 0, totalprice: 0 }],
    },
    {
      tabName: 'Myntra',
      itemsArray: [{ id: '', item: '', count: 0, totalprice: 0 }],
    },
  ];
  constructor() {}
}
