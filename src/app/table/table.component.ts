import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as data from '../../assets/productList.json';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild(MatTable) table!: MatTable<any>;
  @Input() tabName: string = '';
  @Input() dataSource: Array<object> = [];
  jsonData = (data as any).default;
  tableHeader: Array<string> = ['id', 'item', 'count', 'totalprice', 'action'];
  tableRows: Array<object> = [];
  summaryData: any;
  searchText: any = '';
  isMenuOpen: boolean = true;
  newItemForm: FormGroup = this.fb.group({
    itemName: ['', [Validators.required]],
    itemCount: ['', [Validators.required]],
  });

  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder) {}

  ngOnChanges(): void {
    this.tableRows = this.dataSource;
    this.tabName = this.tabName;
    this.showData(this.tableRows);
    this.isMenuOpen = true;
  }

  ngOnInit(): void {
    this.tableRows = this.dataSource;
    this.tabName = this.tabName;
    this.showData(this.tableRows);
  }

  displayList(): void {
    this.isMenuOpen = true;
  }

  //delete an item
  handleDeleteItem(index: number) {
    let existingData = this.tableRows;
    existingData.splice(index, 1);
    this.tableRows = existingData;
    this.renderRows();
  }
  //adding new item
  handleAddItem() {
    let foundItem: any = this.jsonData.find(
      (item1: any) =>
        item1.item === this.newItemForm.value.itemName.trim().toLowerCase()
    );
    //new item name is not in the predefined json list
    if (this.newItemForm.value.itemName.trim() && !foundItem) {
      this._snackBar.open('please give some other data', '', {
        duration: 1000,
      });
    }

    //new item name & new item data is entered & item name is entered as per predefined list
    if (this.newItemForm.value.itemName.trim() &&
      this.newItemForm.value.itemCount &&
      foundItem) {
      this.tableRows.push({
        id: Math.max(...this.tableRows.map((item: any) => item.id)) + 1,
        item: this.newItemForm.value.itemName.trim().toLowerCase(),
        count: parseInt(this.newItemForm.value.itemCount),
        totalprice: this.newItemForm.value.itemCount * foundItem.price,
      });
      this.newItemForm.reset();
      this.renderRows();
    }
  }
  renderRows() {
    this.table?.renderRows();
    this.showData(this.tableRows);
    this.searchText = '';
  }

  //show summary data
  showData(data: any) {
    this.summaryData = {
      site: this.tabName,
      count: this.reduceItems(data, 'count'),
      totalPrice: this.reduceItems(data, 'totalprice'),
    };
  }
  //send added count,added total price
  reduceItems(arr: Array<any>, key: string) {
    return arr
      .map((item) => item[key])
      .reduce((total, current) => {
        return total + current;
      });
  }
  insertItem(item: any) {
    this.searchText = item;
    this.isMenuOpen = false;
  }
}
