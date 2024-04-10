import { Component } from '@angular/core';
import { IUserInfo } from './interfaces/app.interface';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-demo';
  listData: IUserInfo[] = [];
  defaultData: IUserInfo = {
    id: 0,
    name: '',
    age: '',
    nationality: '',
  }
  itemCur: IUserInfo = {
    ...this.defaultData
  };

  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.handleGetListData();
  }
  handleGetListData(): void {
    this.appService.getData().subscribe((res: IUserInfo[]) => {
      this.listData = res;
    });
  };
  handleDeleteData(id: number): void {
    this.appService.deleteData(id).subscribe(() => {
      this.handleGetListData();
    });
  };
  handleAddData(): void {
    this.appService.addData({ name: this.itemCur.name, age: this.itemCur.age, nationality: this.itemCur.nationality }).subscribe(() => {
      this.handleGetListData();
      this.onClearState();
    });
  };
  onClearState(): void {
    this.itemCur = { ...this.defaultData };
  };
  onPickItem(data: IUserInfo): void {
    this.itemCur = { ...data }
  };
  handleUpdateData(): void {
    this.appService.updateData(this.itemCur).subscribe(() => {
      this.handleGetListData();
      this.onClearState();
    });
  };
}
