import {
  Component,
  OnInit,
  DoCheck,
  ApplicationRef,
  ChangeDetectorRef
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { ReactiveFormsModule, FormGroup, AbstractControl, 
  FormBuilder, Validators, FormControl } from '@angular/forms';
import {EmailValidator} from '../validators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import {PageService} from '../services/pagination.service';

import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'underscore';
import {UserRowComponent} from '../user-row/user-row.component';


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',
   // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
    FormBuilder,
    PageService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first ,compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  // Set our default values
  public localState = { value: 'zzz' };
  public isSubmitted = false;
  public users: any[];
  public newUser: any;

  public form: FormGroup;
  public email: AbstractControl;
  public first_name: AbstractControl;
  public isHidden: boolean = false;
  public pager: any = {};
  public pagedUsers: any[];

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    private fb: FormBuilder,
    private pagerService: PageService
    ) {

    this.form = fb.group({
      'email': ['zzzz',Validators.compose([EmailValidator.validate,Validators.required, Validators.minLength(4)])],
      'first_name': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.email = this.form.controls['email'];
    this.first_name = this.form.controls['first_name'];
  }

  public ngOnInit() {
    console.log('hello `Home` component');
    this.newUser = {first_name: '', last_name: ''};
    this.setPage(1);
  }

  public getUsers() {
    this.users = [
      {email: 'test@test.com',first_name: 'one', last_name: 'test1', id: 1},
      {email: 'test1@test.com',first_name: 'two', last_name: 'test2',id: 2},
      {email: 'test1zz@test.com',first_name: 'three', last_name: 'testzz2',id: 3},
      {email: 'test@test.com',first_name: 'four', last_name: 'test1', id: 4},
      {email: 'test1@test.com',first_name: 'five', last_name: 'test2',id: 5},
      {email: 'test1zz@test.com',first_name: 'six', last_name: 'testzz2',id: 6},
      {email: 'test@test.com',first_name: 'seven', last_name: 'test1', id: 7},
      {email: 'test1@test.com',first_name: 'eight', last_name: 'test2',id: 8},
      {email: 'test1zz@test.com',first_name: 'nine', last_name: 'testzz2',id: 9},
      {email: 'test@test.com',first_name: 'ten', last_name: 'test1', id: 10},
      {email: 'test1@test.com',first_name: 'eleven', last_name: 'test2',id: 11},
      {email: 'test1zz@test.com',first_name: 'twelve', last_name: 'testzz2',id: 12},
    ];

    return this.users;
  }

  public DoCheck() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public onSubmit(values:Object):void {
    this.users.push({first_name: values['first_name'], email: values["email"]});
    this.form.reset();
  }

  public setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.users.length, page);

        // get current page of items
        this.pagedUsers = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
        return this.pager, this.pagedUsers;
    }
}