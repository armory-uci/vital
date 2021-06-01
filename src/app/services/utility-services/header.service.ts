import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private title = '';
  private backArrowVisible = false;

  constructor(private router: Router) {
    // Makes sure the header title is cleared off every time the page changes,
    // so as to not have stale info in the header
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.setHeaderTitle('');
        this.backArrowVisible = e.url.includes('tutorial');
      });
  }

  setHeaderTitle(title: string) {
    this.title = title;
  }

  getHeaderTitle() {
    return this.title;
  }

  isBackArrowVisible() {
    return this.backArrowVisible;
  }
}
