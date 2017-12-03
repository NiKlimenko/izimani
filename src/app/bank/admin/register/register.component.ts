import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AppAlertService} from '../../../shared/services/app-alert.service';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/user';
import {AppAlertParams} from '../../app-alert/app-alert.component';

/**
 * Register component
 */

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup;

  private userService: UserService;
  private appAlertService: AppAlertService;

  /**
   * @param {UserService} userService
   * @param {AppAlertService} appAlertService
   */
  constructor(userService: UserService, appAlertService: AppAlertService) {
    this.userService = userService;
    this.appAlertService = appAlertService;
    this.registerForm = new FormGroup({
      id: new FormControl(),
      email: new FormControl(),
      name: new FormControl(),
      secondName: new FormControl(),
      birthday: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }

  /**
   * Register a new customer
   */
  public register() {
    const form: FormGroup = this.registerForm;
    form.disable();
    const user: User = new User(form.value.id, form.value.name, form.value.secondName, form.value.birthday, form.value.email);
    const password: string = form.value.password;
    const confirmPassword: string = form.value.confirmPassword;

    this.userService.createUser(user, password, confirmPassword).subscribe(() => {
      this.registerForm.enable();
      this.appAlertService.showAlert(new AppAlertParams('A new customer has been registered successfully!', 3000, 'success'));
    }, (error: string) => {
      this.registerForm.enable();
      this.registerForm.setErrors({api: error});
    });
  }
}
