import {Component, Input} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import { APIService } from '../services/api.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'data-collection',
  styleUrls: ['./data-table.component.scss'],
  templateUrl: './data-table.component.html',
})
export class DataCollectionComponent {
  @Input() path = 'test';
  @Input() displayedColumns: any[] = [];
  dataSource: MyDataSource;
  dataSubject = new BehaviorSubject<any[]>([]);
  constructor(private apiService: APIService) {}

  OnInit() {
    this.dataSource =  new MyDataSource(this.dataSubject);
    this.apiService.getData(this.path).subscribe({
      next: value => this.dataSubject.next([value])
    });
  }
}
export class MyDataSource extends DataSource<any[]> {
  constructor(private subject: BehaviorSubject<any[]>) {
    super ();
  }
  connect(): Observable<any[]> {
    return this.subject.asObservable();
  }
  disconnect(): void {}
}

