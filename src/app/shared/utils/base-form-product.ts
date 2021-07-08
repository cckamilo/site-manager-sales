import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { error } from 'protractor';

@Injectable({ providedIn: 'root' })
export class BaseFormProduct {
    errorMessage = null;
    constructor(private fb: FormBuilder) { }

    baseForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.maxLength(150)]],
        size: ['', [Validators.required]],
        quantity: [0, [Validators.min(1), Validators.max(9999)]],
        price: [0, [Validators.min(1), Validators.max(9999999)]],
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
            
            const maxlength = errors?.maxlength?.requiredLength;
            console.log(maxlength)
            const messages = {
                required: 'Campo obligatorio',
                maxlength: `Longitud mínimo ${maxlength} caracteres`,
            };
            const errorKey = Object.keys(errors).find(Boolean);
            this.errorMessage = messages[errorKey];
        }

    }
}