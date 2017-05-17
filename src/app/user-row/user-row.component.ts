import { HomeComponent } from '../home/home.component';
import { FilteredList } from '../filter/filteredList.component';

import {Component,Input,Output,OnInit,ViewChild,EventEmitter,ChangeDetectionStrategy} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FilterPipe } from '../filter/filter.pipe'

@Component({
    selector: '[user-row]',
    templateUrl: './user-row.component.html',
})

export class UserRowComponent {

  public users: Array<any>;
  public editMode: boolean = false;
  @Input() public pagedUsers: any[];

  constructor(
    private home: HomeComponent) {
    this.users = home.getUsers();
  }

  public edit():void {
    this.editMode = true;
  }

  public save():void {
    this.editMode = false;
  }

  public delete(id):void {
    this.pagedUsers.splice(id,1)
  }
}
