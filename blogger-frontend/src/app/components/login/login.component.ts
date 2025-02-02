import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if ((this.email, this.password)) {
      this.authService
        .loginService(this.email, this.password)
        .subscribe((res) => {
          localStorage.setItem('token', res.accessToken);
          this.router.navigateByUrl('admin/manage-blogs');
        });
    } else {
      alert('Please fill email and password values');
    }
  }
}
