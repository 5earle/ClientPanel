import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SettingsService} from '../services/settings.service';


@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(private router: Router, public SR: SettingsService) {}
  canActivate(): boolean {
    if (this.SR.getSettings().allowReg) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
