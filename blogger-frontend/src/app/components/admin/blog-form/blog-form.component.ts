import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Import ReactiveFormsModule
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../category';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../blog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss',
})
export class BlogFormComponent {
  blogForm!: FormGroup;
  isChecked: boolean = false;
  categoryList: Category[] = [];
  isEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.blogForm = this.formBuilder.group({
      id: [null],
      categoryId: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      content: ['', Validators.required],
      image: [''],
      isFeatured: [false],
    });
  }

  ngOnInit(): void {
    this.getCategoryList();

    let id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.blogService.getBlogByIdService(id).subscribe((res) => {
        this.blogForm.patchValue(res as Blog);
      });
    }
  }

  createBlog() {
    let model: any = this.blogForm.value;
    this.blogService.createBlogService(model as Blog).subscribe(() => {
      alert('Blog created successfully');
      this.router.navigateByUrl('admin/manage-blogs');
    });
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe((res) => {
      this.categoryList = res;
    });
  }

  updateBlog() {
    let model: any = this.blogForm.value;
    this.blogService
      .updateBlogService(this.blogForm.value.id, model)
      .subscribe(() => {
        alert('Blog Updated successfully');
        this.router.navigateByUrl('admin/manage-blogs');
      });
  }
}
