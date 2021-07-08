import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseFormUser } from 'src/app/shared/utils/base-form-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private subscription: Subscription = new Subscription();
  private isValidEmail = /\S+@\S+\.\S+/;
 

  // loginForm = this.fb.group({
  //   username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
  //   password: ['', [Validators.required, Validators.minLength(6)]]
  // });

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public loginForm: BaseFormUser) { }

  ngOnInit(): void { 

    this.loginForm.baseForm.get('role').setValidators(null);
    this.loginForm.baseForm.get('role').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {

    if(this.loginForm.baseForm.invalid){
      return;
    }

    const formValue = this.loginForm.baseForm.value;
    this.subscription.add(
      this.authService.login(formValue).subscribe(res => {
        if (res) {
          this.router.navigate(['/home']);
        }
      })
    );
  }

  // getErrorMessage(field: string): string {
  //   let message;
  //   if (this.loginForm.get(field).errors.required) {
  //     message = 'Campo obligatorio';
  //   } else if (this.loginForm.get(field).hasError('pattern')) {
  //     message = 'Email no valido';
  //   } else if (this.loginForm.get(field).hasError('minlength')) {
  //     const minLength = this.loginForm.get(field).errors?.minlength.requiredLength;
  //     message = `Longitud mínimo ${minLength} caracteres`
  //   }
  //   return message;
   
  // }

  checkField(field: string): boolean {
  return this.loginForm.isValidField(field);
    // return (
    //   (this.loginForm.get(field).touched || this.loginForm.get(field).dirty)
    //   && !this.loginForm.get(field).valid
    // )

  }

}
