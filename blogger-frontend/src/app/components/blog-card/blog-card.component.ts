import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../blog';
import { Category } from '../../category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-blog-card',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {

  @Input() blog!: Blog;
  categoryList: Category[] = [];

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCategoryList();
    this.getCategoryName();
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe((res) => {
      this.categoryList = res;
    });
  }

  getCategoryName() {
    return this.categoryList.find(x => x.id == this.blog?.categoryId)?.name;
  }

}
