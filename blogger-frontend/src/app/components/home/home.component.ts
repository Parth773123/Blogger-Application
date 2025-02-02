import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../blog';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../category';

@Component({
  selector: 'app-home',
  imports: [CommonModule, BlogCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  blogList!: Blog[];


  constructor(private blogService: BlogService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getFeaturedBlogs();
  }
  
  
  getFeaturedBlogs() {
    this.blogService.getFeaturedBlogService().subscribe((res) => {
      this.blogList = res;
    });
  }
}
