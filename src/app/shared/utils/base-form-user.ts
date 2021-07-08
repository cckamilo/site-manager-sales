import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;
  constructor(private fb: FormBuilder) {

  }
  baseForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', [Validators.required]]
  });

  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty)
      && !this.baseForm.get(field).valid
    )
  }


  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm.get(field);
    if (errors) {
      const minlength = errors?.minlength?.requiredLength;
      const messages = {
        required: 'Campo obligatorio',
        pattern: 'Email no valido',
        minlength: `Longitud mínimo ${minlength} caracteres`
      };
      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }


    // let message;
    // if (this.loginForm.get(field).errors.required) {
    //   message = 'Campo obligatorio';
    // } else if (this.loginForm.get(field).hasError('pattern')) {
    //   message = 'Email no valido';
    // } else if (this.loginForm.get(field).hasError('minlength')) {
    //   const minLength = this.loginForm.get(field).errors?.minlength.requiredLength;
    //   message = `Longitud mínimo ${minLength} caracteres`
    // }
    // return message;

  }


}