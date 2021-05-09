import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  tutorialContent = {
    explore: `
    In the right most window, you can see a website that queries for items in an inventory. Let us try to get some information about the nature of query and get an idea about the SQL commands used internally.

    We can do this simply by querying inventory items and analyzing its output.  Let us input item \*\*hammer\*\* and submit.

    We see the query output shows a list of items that have \*\*hammer\*\* in its name. This would mean the SQL command might have a wildcard matching that matches all items with hammer in it.

    \`\`\`sql
    SELECT ?? FROM ?? WHERE ?? LIKE '%hammer%'
    \`\`\``,
    exploit: `
    In the above command, we really don't have control over the entire SQL syntax. But the \*\*'hammer'\*\* within the wildcard symbols \*\*%%\*\* is where we can skillfully insert our commands to exploit SQL.

    What would the SQL command look like if instead of \*\*hammer\*\* we put the following

    \`\`\`sql
    hammer' UNION (SELECT TABLE\_NAME, TABLE\_SCHEMA FROM information\_schema.tables);--
    \`\`\`

    \*Note the space in the end after \`-- \`\*

    The SQL command would now look like this:

    \`\`\`sql
    SELECT ?? FROM ?? WHERE ?? LIKE '%hammer' UNION (SELECT TABLE\_NAME, TABLE\_SCHEMA FROM information\_schema.tables);--%'
    \`\`\`

    <br>

    > \*\*Note:\*\* \*\*INFORMATION\_SCHEMA\*\* provides access to database metadata, information about the MySQL server such as the name of a database or \*\*table\*\*, the data type of a column, or access privileges

    You can now see rows with MySQL database metadata getting appended (UNION) along with the query result. This exposes critical database credentials and tables that can further be exploited to access more values and even remove tables.
    `,
    mitigate: `
    The given website is running on a flask server written in Python. You can explore the server code using the terminal shown in the middle pane.

    Navigate to \`app.py\` to see the server code and how SQL command is constructed.

    In line number \`42\` of \`app.py\`we see the SQL command is constructed using a simple string concatenation:

    \`\`\`python
    sql\_command = "select \* from items where item\_name like '%%"+item+"%'"
    \`\`\`

    Plain string concatenation is always a bad idea when it comes to constructing SQL commands.

    Its always a good idea to follow best practices to solve such problems. Python (\[PEP 249\](http://www.python.org/dev/peps/pep-0249/)) has suggestions on how queries should be executed for various db operations requirements.

    ## String formatting in python
    The problem with above string concatenated command was that the item name was never assumed to be a string as a whole. There were ways to bypass the escape sequence and become part of the main syntax through some clever positioning of characters such as \`%\` and \`--\`.

    Python has a fix for solving such ambiguities using \*\*string formatting\*\*. This allows our code to treat a string formatted variable to be a whole string no matter what escape sequences it may contain. This is done using \*\*%s\*\*.

    The command can be executed in the following manner to treat the input texts as strings as a whole and to prevent it from getting combined with the SQL syntax.

    \`\`\`python
    cursor.execute("SELECT \* FROM items WHERE item\_name LIKE %s ''", ("%"+item+"%",))
    \`\`\`

    Remove the \`sql\_command\` at line \`42\` and replace the execute command in line \`45\` with the above.

    Trying the malicious SQL inject input no longer exposes critical database information.

    <strong>Congratulations!!! you just learnt how to secure your python server from SQLInjection</strong>`
  };
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
