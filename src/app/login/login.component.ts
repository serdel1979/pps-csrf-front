import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BanckService } from '../services/bank.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private loginService: BanckService, private router: Router, private cookie: CookieService) { 
    this.loginForm = this.formBuilder.group(
      {
        user: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  ngOnInit(): void {
    const cook = this.cookie.check('cookie-jwt');
    if (cook) {
      this.router.navigateByUrl('/home');
      return;
    } 
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.login(this.loginForm.value)
      .subscribe((data: any) => {
        this.router.navigate(['/home']);
      }, (err: any) => {
        alert(`Error ${err.message}`);
      });

  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }


}
