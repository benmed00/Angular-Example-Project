import { Account } from './../../app/entities';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;                    
  private formSubmitAttempt: boolean; 


  constructor(
    @Inject(forwardRef(() => FormBuilder)) private fb: FormBuilder,
    @Inject(forwardRef(() => Router)) private router:Router,          
    private authService: AuthenticationService ,
    private snackBar: MatSnackBar, 
  ) {}

  ngOnInit() {
    this.form = this.fb.group({     
      'userName': ['', Validators.required],
      'email': ['' , Validators.required],
      'password': ['', Validators.required],
      'confimPassword': ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { 
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    console.log('try to register')
    if (this.form.valid) {
      let account:Account = new Account(null, this.form.get('userName').value ,
        this.form.get('password').value, this.form.get('email').value,true , [] ) ;

      if(account.password != this.form.get('confimPassword').value)
        return this.snackBar.open('Invalid password','', {
              duration: 1200
            });
      console.log('the new acc ', account) ;
      this.authService.register(account)
        .subscribe(this.registerSuccess.bind(this), this.registerError.bind(this)) ; 
    }
    this.formSubmitAttempt = true;             
  }


  registerSuccess(res){
    console.log('User added with success', res) ;
    this.snackBar.open('Registration with success','', {
      duration: 1200
    });
    this.router.navigate(['/login']) ;
  }

  registerError(err){
    console.log('Error adding user', err) ;
    this.snackBar.open('Registration error','', {
      duration: 1200
    });
  }
  
}
