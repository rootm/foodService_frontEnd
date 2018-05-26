import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Food {
  obj: Object;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) { }

  getFoodDetails() {
    return this.httpClient.get('http://localhost:8080/api/food/');
  }
}
