import { Component, Input } from '@angular/core';
import { Blog } from '../../blog';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  id: number = 0;
  blogDetails!: Blog;
  categoryList: Category[] = [];

  constructor(
    private blogService: BlogService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.collectId();
    this.getCategoryList();
    this.getBlogById(this.id);
    this.getCategoryName();
  }

  collectId() {
    this.id = this.route.snapshot.params['id'];
    return this.id;
  }

  getBlogById(id: number) {
    return this.blogService.getBlogByIdService(id).subscribe((res) => {
      this.blogDetails = res;
    });
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe((res) => {
      this.categoryList = res;
    });
  }

  getCategoryName() {
    return this.categoryList.find(x => x.id == this.blogDetails?.categoryId)?.name;
  }
}
