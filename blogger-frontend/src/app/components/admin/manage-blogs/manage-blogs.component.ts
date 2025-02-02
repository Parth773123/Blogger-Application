import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../blog';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../category';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-blogs',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './manage-blogs.component.html',
  styleUrl: './manage-blogs.component.scss',
})
export class ManageBlogsComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'categoryId',
    'actions',
  ];
  dataSource: MatTableDataSource<Blog>;
  blogs: Blog[] = [];
  categoryList: Category[] = [];
  categoryMap: Map<number, string> = new Map();

  constructor(
    private blogService: BlogService,
    private categoryService: CategoryService
  ) {
    this.dataSource = new MatTableDataSource(this.blogs);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllBlogs();
    this.getAllCategories();
  }

  getAllBlogs() {
    this.blogService.getAllBlogService().subscribe({
      next: (blogDetails: Blog[]) => {
        this.blogs = blogDetails;
        this.dataSource = new MatTableDataSource(this.blogs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error(err) {
        // console.log('An error occured while fetching blogs', err);
      },
    });
  }

  getAllCategories() {
    this.categoryService.getCategoryList().subscribe((res) => {
      this.categoryList = res;
      this.categoryList.forEach((category) => {
        this.categoryMap.set(category.id, category.name);
      });
    });
  }

  getCategoryName(id: number): string {
    return this.categoryMap.get(id) || 'Unknown';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBlog(id: number) {
    this.blogService.deleteBlogService(id).subscribe(() => {
      this.dataSource.data = this.blogs.filter(x => x.id != id);
    })
  }
}
