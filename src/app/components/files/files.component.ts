import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
interface HtmlInputEvent extends Event{
target: HTMLInputElement & EventTarget;

}

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})

export class FilesComponent implements OnInit{

  selectedFile: Array<File> = [];
  fileInput: File;
  photoSelected: string | ArrayBuffer;
  photoSelectedTwo: string | ArrayBuffer;
  arr: Array<any> = []
  public user: FormGroup;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }

  get userDetails(): FormArray{
    return this.user.get('userDetails') as FormArray;
  }

  ngOnInit(): void {
  this.user = this.fb.group({
    userDetails: this.fb.array([])
  });

  this.userDetails.push(this.fb.group({
    cbCamisetas: ['', Validators.required],
    titulo: ['', Validators.required],
    description: ['', Validators.required]
  }));
  this.userDetails.push(this.fb.group({
    talla: ['', Validators.required],
    cantidad: ['', Validators.required],
    
  }));
  this.userDetails.push(this.fb.group({
    precio:['', Validators.required]
    
  }))
  
  }

  onFileSelected(event: HtmlInputEvent){
    if (event.target.files && event.target.files[0]){
      this.fileInput = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.fileInput);

    }
    this.selectedFile.push(<File>event.target.files[0]);
    console.log(this.selectedFile);
  }

  onFileSelectedTwo(event: HtmlInputEvent){
    if (event.target.files && event.target.files[0]){
      this.fileInput = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.photoSelectedTwo = reader.result;
      reader.readAsDataURL(this.fileInput);

    }
    this.selectedFile.push(<File>event.target.files[0]);
    console.log(this.selectedFile);
    console.log()
  }

  submitForm(){

    if (this.userDetails.valid){
 
      const fd = new FormData();
      this.selectedFile.forEach(f => {
        fd.append("files",f);
      })
      fd.append("category","Camisetas");
      fd.append("title",this.userDetails.value[0].titulo);
      fd.append("description",this.userDetails.value[0].description);
      fd.append("size",this.userDetails.value[1].talla);
      fd.append("quantity",this.userDetails.value[1].cantidad);
      fd.append("price",this.userDetails.value[2].precio);
  
      this.http.post("https://sitemanagermarket.azurewebsites.net/api/v1/products", fd)
      .subscribe(res => {
         this.router.navigate(['/image-list'])
         console.log(res)
      }, err => console.log(err));

    }else{
      console.log("invalid")
    }
   
    
  }
}
