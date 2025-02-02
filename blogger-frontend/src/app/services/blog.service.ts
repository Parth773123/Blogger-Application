import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { Blog } from '../blog';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getFeaturedBlogService() {
    return this.http.get<Blog[]>(environment.apiUrl + '/Blogs/featured');
  }

  getAllBlogService() {
    return this.http.get<Blog[]>(environment.apiUrl + '/Blogs');
  }

  getBlogByIdService(id: number) {
    return this.http.get<Blog>(environment.apiUrl + '/Blogs/' + id);
  }

  deleteBlogService(id: number) {
    return this.http.delete(environment.apiUrl + '/Blogs/' + id);
  }

  createBlogService(blog: Blog) {
    return this.http.post(environment.apiUrl + '/Blogs', blog);
  }

  updateBlogService(id: number, blog: Blog) {
    return this.http.put(environment.apiUrl + '/Blogs/' + id, blog);
  }
}
