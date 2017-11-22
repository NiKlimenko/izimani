import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

type ActiveState = 'bank'|'admin';

/**
 * Header for dashboard
 */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  public admin: boolean;

  @Output()
  public logout: EventEmitter<void> = new EventEmitter();

  public navState: ActiveState = 'bank';

  /**
   * @param {Router} router
   */
  constructor(router: Router) {
    const lastRouteSegment: string = router.url.split('/').slice(-1)[0];
    this.navState = <ActiveState> lastRouteSegment;
  }

  /**
   * Header link click handle
   * @param {ActiveState} nav
   */
  public headerLinkClicked(nav: ActiveState) {
    this.navState = nav;
  }
}
