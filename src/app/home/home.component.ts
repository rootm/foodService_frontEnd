import { Component, OnInit } from '@angular/core';
import {FoodService} from '../food.service';

interface Food {
  obj: Object;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foodDetails: Object = [];
  message = 'yyyyyyyyyyy';

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    console.error('yyyyy');
    this.foodService.getFoodDetails().subscribe(data => {
      this.foodDetails = data;
    });
    console.log('xxxxx');
  }

}
