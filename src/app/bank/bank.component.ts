import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {User} from '../shared/user';

/**
 * Bank component
 */

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  public currentUser: User;

  private authService: AuthService;
  private router: Router;

  /**
   * @param {AuthService} authService
   * @param {Router} router
   */
  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  public ngOnInit() {
    this.authService.getCurrentUser().subscribe((currentUser: User) => {
      this.currentUser = currentUser;
    });
  }

  /**
   * Log out method
   * Logged out from API and redirect to the login page
   */
  public logOut() {
    this.authService.logOut().subscribe(() => this.router.navigateByUrl('/login'));
  }
}
