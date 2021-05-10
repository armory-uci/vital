import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SandboxService } from 'src/app/services/http-services/sandbox.service';
import {
  IRetryResponse,
  ISandbox
} from 'src/app/home/tutorial-page/tutorial-page.model';
import { IProblem } from '../problem-list/problem.model';
import { DOCUMENT, Location } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-tutorial-page',
  templateUrl: './tutorial-page.component.html',
  styleUrls: ['./tutorial-page.component.scss']
})
export class TutorialPageComponent implements OnInit {
  // TODO All these are hard-coded. Need to figure out the following
  // 1. Get them from a service that's triggered as soon as the user selects something in the problems page
  // 2. Get the types right. Seems hacky right now
  // 3. Put a loading indicator on all three, till there is content in them
  title = 'SQL Injection';
  tutorialContent = '<p>Content of the tutorial</p>';
  sandbox: {
    terminalUrl: SafeResourceUrl;
    websiteUrl: SafeResourceUrl;
  } = {
    terminalUrl: this.getLoadingPageUrl(),
    websiteUrl: this.getLoadingPageUrl()
  };

  private problem: IProblem;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private sandboxService: SandboxService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.sandbox.terminalUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.sandbox.terminalUrl as string
    );
    this.sandbox.websiteUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.sandbox.websiteUrl as string
    );
    this.problem = this.router.getCurrentNavigation()?.extras.state?.problem;
  }

  ngOnInit(): void {
    // Only create on problem that comes from the problems page.
    // TODO Maybe this makes sense as a query parameter once the backend supports only one container per user?
    if (!this.problem) return;
    this.sandboxService
      .create(this.problem.serverId)
      .subscribe((response: ISandbox) => {
        const { terminalUrl, websiteUrl } = response;
        this.waitUntilSiteIsUp(terminalUrl).then(({ isUp }) => {
          if (isUp) {
            this.sandbox.terminalUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              terminalUrl
            );
          }
        });
        this.waitUntilSiteIsUp(websiteUrl).then(({ isUp }) => {
          if (isUp) {
            this.sandbox.websiteUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              websiteUrl
            );
          }
        });
      });
  }

  // This function tries to hit a url using a "opaque" request.
  // This kind of a request doesn't depend on CORS setup
  private waitUntilSiteIsUp(
    url: string,
    every: number = 3000,
    times: number = 10
  ): Promise<IRetryResponse> {
    if (times === 0)
      return Promise.reject({ isUp: false, isRetriesExhausted: true });
    return fetch(url, { mode: 'no-cors' })
      .then(() => ({ isUp: true, isRetriesExhausted: false }))
      .catch(() => {
        return new Promise((resolve, reject) =>
          setTimeout(
            () =>
              this.waitUntilSiteIsUp(url, every, times--).then(resolve, reject),
            every
          )
        );
      });
  }

  private getLoadingPageUrl(): string {
    return Location.joinWithSlash(this.document.location.origin, 'loading');
  }
}
