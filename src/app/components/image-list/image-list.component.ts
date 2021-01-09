import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';
import { Files } from 'src/app/interfaces/files';
import {Router } from '@angular/router';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  arr: Files
  constructor(private service: FilesService, private router: Router) { }

  ngOnInit() {

    this.service.getFiles()
    .subscribe(res => {   
      this.arr = res.body['result'];  
      console.log(this.arr)
    });
  }

  selectedImage(id: string){

    this.router.navigate(["/image", id])
   
  }

}
