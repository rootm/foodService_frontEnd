import {Component, OnInit} from '@angular/core';
import {FoodService} from './food.service';

interface Food {
  obj: Object;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  cart = [];
  foodDetails = [];
  rowCount: number[];
  cartCount: number;
  private _showCart = false;
  hideCart = true;
  message = 'yyyyyyyyyyy';

  getShowCart(): boolean {
   return this._showCart;
  }

  setShowCart(value: boolean) {
    console.log('show cart');
    this._showCart = value;
  }





  constructor(private foodService: FoodService) {
     this.foodService.getFoodDetails().subscribe((data) => {
       console.log(data);
       this.foodDetails.push(data);
       if (this.foodDetails.length / 4 < 0) {
         this.rowCount = Array (1).fill(0).map((x, i) => i);
       } else {
         console.log((this.foodDetails.length % 4) + 1);
         this.rowCount = Array ((this.foodDetails.length % 4) + 1).fill(0).map((x, i) => i);
       }
     });
  }

  ngOnInit() {
    console.error('yyyyy');
    // console.log(this.foodDetails.toString());
    }

    addToCart(item) {
      this.cart.push(item);
      this.cartCount = this.cart.length;
    }


}
