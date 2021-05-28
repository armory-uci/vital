import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private title$ = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    // Makes sure the header title is cleared off every time the page changes,
    // so as to not have stale info in the header
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.setHeaderTitle('');
      });
  }

  setHeaderTitle(title: string) {
    this.title$.next(title);
  }

  getHeaderTitle() {
    return this.title$;
  }
}
