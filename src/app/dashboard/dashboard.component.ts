import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {User} from '../shared/user';

/**
 * Dashboard component
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public currentUser: User;

  private authService: AuthService;
  private router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  public ngOnInit() {
    this.authService.getCurrentUser().subscribe((currentUser: User) => {
      this.currentUser = currentUser;
    });
  }

  public logOut() {
    this.authService.logOut().subscribe(() => this.router.navigateByUrl('/login'));
  }
}
