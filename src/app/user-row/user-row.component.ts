import {
  Component,
  OnInit,
  DoCheck
} from '@angular/core';

import { HomeComponent } from '../home/home.component';
import {PageService} from '../services/pagination.service';

@Component({
    selector: 'user-row',
    templateUrl: './user-row.component.html',
    providers: [ PageService ] 
})

export class UserRowComponent implements OnInit {

  public users: any[];
  public editMode: boolean = false;
  public pager: any = {};
  public pagedUsers: any[];

  constructor(
    private home: HomeComponent,
    private pagerService: PageService) {
    this.users = home.getUsers();
  }

  public ngOnInit() {
    this.setPage(1);
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

  public setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.users.length, page);

        // get current page of items
        this.pagedUsers = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
        
    }
}
