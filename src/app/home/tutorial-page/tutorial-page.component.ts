import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SandboxService } from 'src/app/sandbox.service';

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
    terminalUrl: 'http://localhost:4200/loading',
    websiteUrl: 'http://localhost:4200/loading'
  };

  private problem: string;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private sandboxService: SandboxService,
    private location: Location
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
    // Only create on problem, or maybe not?
    if (!this.problem) return;
    console.log(this.problem);
    this.sandboxService
      .create()
      .subscribe((response: { terminalUrl: string; websiteUrl: string }) => {
        this.sandbox.terminalUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          response.terminalUrl
        );
        // FIXME Wait 10 secs for thr website
        setTimeout(() => {
          this.sandbox.websiteUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            response.websiteUrl
          );
        }, 10000);
      });
  }
}
