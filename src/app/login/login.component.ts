import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {UserService} from '../shared/services/user.service';

/**
 * Login component
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public login: string;
  public password: string;
  public isErrorHappen: boolean = false;
  public isLoading: boolean = false;

  private authService: AuthService;
  private router: Router;

  /**
   * @param {AuthService} authService
   * @param {Router} router
   * @param {UserService} userService
   */
  constructor(authService: AuthService, router: Router, userService: UserService) {
    this.authService = authService;
    this.router = router;
    userService.clearUserCache();
  }

  /**
   * Sign in method
   * Requests token from API by user credentials
   */
  public signIn() {
    this.isLoading = true;
    this.authService.authenticate({username: this.login, password: this.password}).subscribe(() => {
      this.isLoading = false;
      this.router.navigateByUrl('/');
    }, () => {
      this.isErrorHappen = true;
      this.isLoading = false;
    });
  }
}
