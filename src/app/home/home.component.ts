import { Component, OnInit } from '@angular/core';

import {FoodService} from '../services/food.service';

interface Food {
  obj: Object;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cart = [];
  foodDetails = [];
  rowCount: number[];
  cartCount = 0;
  found;
  id: number;
  grandTotal=0;
  private _showCart = false;


  getGrandTotal(){
    this.grandTotal=0;
    if(this.cart.length > 0){
      for (let item of this.cart){
        console.log(this.grandTotal);
        this.grandTotal =  this.grandTotal +(item.price * item.qnty);
      }

    }
  }

  getShowCart(): boolean {
    this.getGrandTotal();
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

  findInCart(id) {
    return this.cart.find(function (obj) { return obj.foodId === id; });
  }

  findInCartID(id) {
    return this.cart.findIndex(function (obj) { return obj.foodId === id; });
  }

  removeItem(item){
    this.found = this.findInCart(item.foodId);
    this.id = this.findInCartID(item.foodId);
    if (this.found.qnty == 1){
      this.cart.splice(this.id,1);
    }else{
      this.found.qnty= this.found.qnty - 1;
    }
    this.cartCount =  this.cartCount - 1;
    console.log("here")

  }

  addToCart(item) {
    this.found = this.findInCart(item.foodId);
    console.log("xxx");
    console.log(this.found);
    if ( this.found == undefined) {
      item.qnty = 1;
      this.cart.push(item);
    }else{
      item.qnty = item.qnty + 1;
    }

    this.cartCount =  this.cartCount + 1;
    // console.log(item);
  }

}
