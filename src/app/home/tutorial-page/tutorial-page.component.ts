import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    terminalUrl: 'http://localhost:3001',
    websiteUrl: 'http://localhost:5000'
  };

  constructor(private sanitizer: DomSanitizer) {
    this.sandbox.terminalUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.sandbox.terminalUrl as string
    );
    this.sandbox.websiteUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.sandbox.websiteUrl as string
    );
  }

  ngOnInit(): void {}
}
