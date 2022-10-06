import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { 
    this.loginForm = this.formBuilder.group(
      {
        user: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  ngOnInit(): void {
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
