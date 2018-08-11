import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public AF: AngularFireAuth) {}
  canActivate(): Observable<boolean> {
    // if false we should not see the route
    return this.AF.authState.map(auth => {
      if (!auth) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });
  }
}
