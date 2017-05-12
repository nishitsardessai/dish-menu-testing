import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import {MdButtonModule} from '@angular/material';
import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu/menu.service";
import {MenuGroupItem} from "../../interfaces/menu";
import {Subscription} from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-menu-group-dish-detail',
  templateUrl: './menu-group-dish-detail.component.html',
  styleUrls: ['./menu-group-dish-detail.component.css']
})
export class MenuGroupDishDetailComponent {

  private menuGroupItemID;
  private subscription: Subscription;
  menuGroupItem:MenuGroupItem;

  cloudinaryImage: any;
  imageId: string;
  secureUrl: string;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'nishit', uploadPreset: 'kkzbmykl' })
  );
  constructor(private _menuService: MenuService,
              private route: ActivatedRoute) {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res: any = JSON.parse(response);
      this.imageId = res.public_id;
      this.secureUrl= res.secure_url;
      console.log("Image URL is: "+ res.secure_url);
      return { item, response, status, headers };
    };
}
 ngOnInit(){
     this.subscription = this.route.params.subscribe(
      (param: any) => {
        this.menuGroupItemID = param['DishID'];
      });

    this.updateDishDetail();
  }
   updateDishDetail(){
    this._menuService.getMenuItem(this.menuGroupItemID).subscribe(
      menuGroupItem => {
        this.menuGroupItem = menuGroupItem;
      },
      err => {
        console.log(err);
      }
    )
  }
 upload() {
        this.uploader.uploadAll();
    }




    data: any[] = [
    {review: 'nice dish', rating: 2 },
    {review: 'nice dish4', rating: 3 },
    {review: 'nice dish41', rating: 4 },
    {review: 'nice dish466', rating: 5 },
    {review: 'nice dish0', rating: 2 }

  ];
}




