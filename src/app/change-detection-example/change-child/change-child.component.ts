import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChildRecordService } from '../child-record.service';
import { LogService } from '../../log.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-change-child',
  templateUrl: './change-child.component.html',
  styleUrls: ['./change-child.component.css']
})
export class ChangeChildComponent implements OnInit, OnChanges {

  @Input()
  id: number;

  record = '';
  private recordSubscription: Subscription;

  constructor(
    private logService: LogService,
    private childRecordService: ChildRecordService
  ) { }

  ngOnInit() {
    this.setupRecordSubscription(this.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.logService.log('Change detected for ChangeChildComponent');
    if (this.recordSubscription) {
      this.recordSubscription.unsubscribe();
    }

    this.setupRecordSubscription(changes.id.currentValue);
  }

  setupRecordSubscription(id: number) {
    this.recordSubscription = this.childRecordService.getChildRecord(id)
      .subscribe((record: string) => this.record = record );
  }
}
