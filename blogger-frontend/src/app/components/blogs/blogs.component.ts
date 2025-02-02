import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../blog';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../blog-card/blog-card.component';

@Component({
  selector: 'app-blogs',
  imports: [CommonModule, BlogCardComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {

  blogList: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.blogService.getAllBlogService().subscribe((res) => {
      this.blogList = res;
    })
  }

}
