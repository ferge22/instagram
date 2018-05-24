import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

type UserFields = 'name' | 'email' | 'password';
type FormErrors = { [u in UserFields]: string }; //loopas objekto

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newUser:boolean = true;
  userForm : FormGroup;
  formErrors: FormErrors = {
     'name': '',
     'email': '',
     'password': ''
  };

  validationMessage = {
      'email': {
        'required': 'Email is required \n',
        'email': 'Email must be valid \n'
      },

      'name': {
        'required': 'Name is required \n',
        'minlength': 'Name must be atleast 3 chars long \n'
      },

      'password': {
        'required': 'Password is required \n',
        'pattern': 'Password  must contain atleast one letter and one number \n',
        'minlength': 'Password must be atleast 8 chars long \n',
        'maxlength': 'Password cannot be more than 40 chars long \n'
      }
  }


  constructor(private formbuilder: FormBuilder, private aS:AuthService, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.userForm = this.formbuilder.group(
      {
        'name': ['', [
          Validators.required,
          Validators.minLength(3)
        ]],

        'email':['',[
          Validators.required,
          Validators.email
        ]],

        'password':['',[
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(40),
          Validators.required
        ]]
      }
    );
    this.userForm.valueChanges.subscribe(
      (data) => this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  toggleForm(){
    this.newUser = !this.newUser;
  }

  onValueChanged(data? : any){
    if(!this.userForm){return;}

    const form = this.userForm;

    for(const field in this.formErrors){
      if(Object.prototype.hasOwnProperty.call(this.formErrors, field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const message = this.validationMessage[field];
          if(control.errors){
            for(const key in control.errors){
              if(Object.prototype.hasOwnProperty.call(control.errors, key)){
                this.formErrors[field] += `${(message as {[key:string]: string}) [key]}`;
              }
            }
          }
        }
      }
    }
  }

  signUp(){
    this.aS.emailSignUp(
      this.userForm.value['email'],
      this.userForm.value['name'],
      this.userForm.value['password']).then(
        () => this.router.navigate(['/dashboard'])
      )
  }

}
