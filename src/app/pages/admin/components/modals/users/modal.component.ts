import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users/users.service';
import { BaseFormUser } from 'src/app/shared/utils/base-form-user';
enum Action{
  Edit = 'edit',
  New = 'new'
};
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  action = Action.New;
  showPasswordField = true;
  hide = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
  public userForm: BaseFormUser,
  private userService: UsersService) { }

  ngOnInit(): void {
  
    if(this.data?.user.hasOwnProperty('id')){
      this.action = Action.Edit;
      this.showPasswordField = false;
      this.userForm.baseForm.get('password').setValidators(null);
      this.userForm.baseForm.updateValueAndValidity();
      this.data.title = 'Edit user'
      this.pathFormData();
    }else{
      this.userForm.baseForm.reset();
    }
    
  }

  onSave(): void{
    const formValue = this.userForm.baseForm.value;
    if(this.action == Action.New){

      this.userService.new(formValue).subscribe( res => {
        console.log('new' , res);
        
      })

    }else{
      const userId = this.data?.user?.id;
      this.userService.update(userId, formValue).subscribe( res => {
        console.log('update', res)
      })
    }
  }

  checkField(field: string): boolean{
   return this.userForm.isValidField(field);
  }

  private pathFormData(): void{
    this.userForm.baseForm.patchValue({
      username: this.data?.user?.username,
      role: this.data?.user?.role
    })
  }

}
