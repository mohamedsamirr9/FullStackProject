import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { CategoriesService } from '../../services/categories-service';

@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  categories: any[] = [];
  constructor(
    private router: Router,
    public auth: Auth,
    private categoryService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (result) => {
        console.log(result);
        this.categories = result;
      },
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
