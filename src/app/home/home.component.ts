import {
  Component,
  OnInit,
  DoCheck
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

import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'underscore';
import {UserRowComponent} from '../user-row/user-row.component';


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
    FormBuilder
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first ,compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})

@Pipe({
  name: 'filter'
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

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    private fb: FormBuilder
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
    this.getUsers();
    this.newUser = {first_name: '', last_name: ''};
  }

  public getUsers() {
    this.users = [
      {email: 'test@test.com',first_name: 'test', last_name: 'test1', id: 1},
      {email: 'test1@test.com',first_name: 'rav', last_name: 'test2',id: 2},
      {email: 'test1zz@test.com',first_name: 'ravzz', last_name: 'testzz2',id: 3},
      {email: 'test@test.com',first_name: 'test', last_name: 'test1', id: 4},
      {email: 'test1@test.com',first_name: 'rav', last_name: 'test2',id: 5},
      {email: 'test1zz@test.com',first_name: 'ravzz', last_name: 'testzz2',id: 6},
      {email: 'test@test.com',first_name: 'test', last_name: 'test1', id: 7},
      {email: 'test1@test.com',first_name: 'rav', last_name: 'test2',id: 8},
      {email: 'test1zz@test.com',first_name: 'ravzz', last_name: 'testzz2',id: 9},
      {email: 'test@test.com',first_name: 'test', last_name: 'test1', id: 10},
      {email: 'test1@test.com',first_name: 'rav', last_name: 'test2',id: 11},
      {email: 'test1zz@test.com',first_name: 'ravzzsdsaa', last_name: 'testzz2',id: 12},
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

  public userFilter():void {
        transform(items: any, filter: any): any {
      if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
          return items.filter(item =>
              filterKeys.reduce((memo, keyName) =>
                  (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
          return items;
      }
    }
  }

}

export class FilterPipe implements PipeTransform {
    transform(items: any, filter: any): any {
      if (filter && Array.isArray()) {
          let filterKeys = Object.keys(filter);
          return items.filter(item =>
              filterKeys.reduce((memo, keyName) =>
                  (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
          return items;
      }
    }
}