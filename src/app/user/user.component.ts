import {
  Component,
  OnInit,
  DoCheck
} from '@angular/core';

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
    public users:any[];

    public ngOnInit() {
        this.getUsers();
    }

    public getUsers():void {
    this.users = [
      {email: 'test@test.com',first_name: 'test', last_name: 'test1', id: 1},
      {email: 'test1@test.com',first_name: 'rav', last_name: 'test2',id: 2},
      {email: 'test1zz@test.com',first_name: 'ravzz', last_name: 'testzz2',id: 2}
    ];
  }

}
