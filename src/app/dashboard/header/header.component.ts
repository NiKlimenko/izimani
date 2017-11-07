import {Component, EventEmitter, Output} from '@angular/core';

/**
 * Header for dashboard
 */

@Component({
  selector: 'app-dash-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output()
  public logout: EventEmitter<void> = new EventEmitter();
}
