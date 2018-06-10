import { Component, OnInit } from '@angular/core';

import {FoodService} from '../services/food.service';
import {AuthService} from "../services/auth.service";

interface Food {
  obj: Object;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //variable declarations
  cart = [];
  foodDetails = [];
  rowCount: number[];
  cartCount = 0;
  found;
  id: number;
  grandTotal=0;
  private _showCart = false;

  //return items in the cart
  get cartItems(){
    return this.cart;
  }

  //calculate grand total for the items in the cart
  getGrandTotal(){
    this.grandTotal=0;
    if(this.cart.length > 0){
      for (let item of this.cart){

        this.grandTotal =  this.grandTotal +(item.price * item.qnty);
      }

      return this.grandTotal;

    }
  }

  getShowCart(): boolean {

    return this._showCart;
  }

  setShowCart(value: boolean) {

    this._showCart = value;
  }

getauth(){
    return this.authService;
}


//on component call make a the http request to load food details
  constructor(private foodService: FoodService,private authService: AuthService) {
    //call foodservice for the http request
    this.foodService.getFoodDetails().subscribe((data) => {

      //add to the array
      this.foodDetails.push(data);
      if (this.foodDetails.length / 4 < 0) {
        this.rowCount = Array (1).fill(0).map((x, i) => i);
      } else {

        this.rowCount = Array ((this.foodDetails.length % 4) + 1).fill(0).map((x, i) => i);
      }
    });
  }

  ngOnInit() {

  }

  // search in the cart by ID of the food
  findInCart(id) {
    return this.cart.find(function (obj) { return obj.foodId === id; });
  }

  //get the index of the food item in the cart
  findInCartID(id) {
    return this.cart.findIndex(function (obj) { return obj.foodId === id; });
  }

  //calls when a item is removed from the cart
  removeItem(item){
    this.found = this.findInCart(item.foodId);
    this.id = this.findInCartID(item.foodId);
    //remove if quantity is 1 or else reduce one from quantity
    if (this.found.qnty == 1){
      this.cart.splice(this.id,1);
    }else{
      this.found.qnty= this.found.qnty - 1;
    }
    //update carts item count
    this.cartCount =  this.cartCount - 1;


  }

  //calls when user add items to the cart
  addToCart(item) {
    //check if the item already in cart
    this.found = this.findInCart(item.foodId);

    //first time adding to cart
    if ( this.found == undefined) {
      item.qnty = 1;
      this.cart.push(item);
    }else{
      //if already added to the cart increase the quantity
      item.qnty = item.qnty + 1;
    }

    //update item count
    this.cartCount =  this.cartCount + 1;

  }

}
