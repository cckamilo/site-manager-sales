import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FilesService } from '../../services/files.service';
import { Files, result } from '../../interfaces/files';
@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

  id: string;
  product: result;
  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private service: FilesService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {

      this.id = params['id'];

      this.service.getFileId(this.id)
        .subscribe(res => {
          this.product = res.body['result']
        },
          error => console.log(error))
      console.log(this.id);

      console.log(params['id'])
    })
  }

  deleteFile(id: string) {
    this.service.deleteFile(id).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/image-list'])
      },
      err => console.log(err)
    )
  }

  updateFile(name: HTMLInputElement, price: number, quantity: number, size: HTMLInputElement, description: HTMLInputElement): boolean {
    console.log(this.id, name.value, price)
    this.service.updateFile(this.id, name.value, price, quantity, size.value, description.value)
      .subscribe(
        res => {
          this.router.navigate(['/image-list'])
        },
        err => console.log(err)
      )
    return true;
  }

}
