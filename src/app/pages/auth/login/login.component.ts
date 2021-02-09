import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private isValidEmail = /\S+@\S+\.\S+/;
  hide = true;
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {

    if(this.loginForm.invalid){
      return;
    }

    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authService.login(formValue).subscribe(res => {
        if (res) {
          this.router.navigate(['/home']);
        }
      })
    );
  }

  getErrorMessage(field: string): string {
    let message;
    if (this.loginForm.get(field).errors.required) {
      message = 'Campo obligatorio';
    } else if (this.loginForm.get(field).hasError('pattern')) {
      message = 'Email no valido';
    } else if (this.loginForm.get(field).hasError('minlength')) {
      const minLength = this.loginForm.get(field).errors?.minlength.requiredLength;
      message = `Longitud mínimo ${minLength} caracteres`
    }
    return message;
   
  }

  isValidField(field: string): boolean {

    return (
      (this.loginForm.get(field).touched || this.loginForm.get(field).dirty)
      && !this.loginForm.get(field).valid
    )

  }

}
