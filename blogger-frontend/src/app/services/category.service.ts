import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategoryList() {
    return this.http.get<Category[]>(environment.apiUrl + '/Category');
  }
}
