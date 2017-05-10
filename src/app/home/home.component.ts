import {
  Component,
  OnInit,
  DoCheck
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import {ReactiveFormsModule,FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator} from '../validators';


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
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Set our default values
  public localState = { value: 'zzz' };
  public isSubmitted = false;
  public users:any[];
  public newUser:any;

  public form:FormGroup;
  public email:AbstractControl;
  public first_name:AbstractControl;
  public editMode: boolean = false;
  public isHidden: boolean = false;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    private fb: FormBuilder) {

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

  public getUsers():void {
    this.users = [
      {email: 'test@test.com',first_name: 'test', last_name: 'test1', id: 1},
      {email: 'test1@test.com',first_name: 'rav', last_name: 'test2',id: 2},
      {email: 'test1zz@test.com',first_name: 'ravzz', last_name: 'testzz2',id: 2}
    ];
  }

  public edit():void {
    this.editMode = true;
  }

  public save():void {
    this.editMode = false;
  }

  public delete(id):void {
    // this.isHidden = true;
    this.users.splice(id,1)
    this.form.reset();
  }

  public DoCheck() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public onSubmit(values:Object):void {
    this.users.push({first_name: values["first_name"], email: values["email"]});
    this.form.reset();
  }
}
