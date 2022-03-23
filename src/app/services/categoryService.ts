import { Injectable, OnInit } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit {
  categories = [];

  constructor() {}

  ngOnInit() {}

  getCategories() {
    return this.categories;
  }

  setCategories(categories: any[]) {
    this.categories = categories;
  }
}
