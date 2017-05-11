import { Component } from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

@Component({
  selector: 'app-menu-group-dish-detail',
  templateUrl: './menu-group-dish-detail.component.html',
  styleUrls: ['./menu-group-dish-detail.component.css']
})
export class MenuGroupDishDetailComponent {

  cloudinaryImage: any;
  imageId: string;
  secureUrl: string;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'nishit', uploadPreset: 'kkzbmykl' })
  );
  constructor() {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res: any = JSON.parse(response);
      this.imageId = res.public_id;
      this.secureUrl= res.secure_url;
      console.log("Image URL is: "+ res.secure_url);
      return { item, response, status, headers };
    };
}
 upload() {
        this.uploader.uploadAll();
    }

}




