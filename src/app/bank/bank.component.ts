import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../shared/services/auth.service';
import {UserService} from '../shared/services/user.service';
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

  public currentUser: Observable<User>;

  private authService: AuthService;
  private userService: UserService;
  private router: Router;

  /**
   * @param {AuthService} authService
   * @param {UserService} userService
   * @param {Router} router
   */
  constructor(authService: AuthService, userService: UserService, router: Router) {
    this.authService = authService;
    this.userService = userService;
    this.router = router;
  }

  public ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  /**
   * Log out method
   * Logged out from API and redirect to the login page
   */
  public logOut() {
    this.authService.logOut().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
