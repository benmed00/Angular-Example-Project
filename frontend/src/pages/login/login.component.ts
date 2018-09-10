import { StorageService } from './../../services/storage.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '../../app/entities';
import { MatSnackBar } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt:boolean;

  constructor(
    @Inject(forwardRef(() => FormBuilder)) private fb: FormBuilder,
    @Inject(forwardRef(() => AuthenticationService)) private authenticationService: AuthenticationService,
    private router:Router,
    private snackBar: MatSnackBar, 
    private storage:StorageService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    console.log('try to connect ! ')
    if (this.form.valid) {
      let credentials:Credentials= new Credentials(this.form.get('userName').value, this.form.get('password').value);
      this.authenticationService.login(credentials).subscribe(this.successConnexion.bind(this), 
        this.wrongCredentials.bind(this));
    }
    this.formSubmitAttempt = true;
  }

  successConnexion(res) {
    let token:string = res.token;
    // localStorage.setItem('token', token);
    this.storage.storeToken(token) ;
    this.authenticationService.userDetails()
      .subscribe((res)=> { 
        this.storage.storeUser(res) ;
        setTimeout(()=>this.router.navigate(['/shops']),1000);
      })
  }

  wrongCredentials(err) {
    console.log('error', err);
    this.snackBar.open('Wrong username or password', '', {
      duration: 2000
    });
  }

}
