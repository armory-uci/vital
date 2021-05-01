import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ISandbox } from 'src/app/home/tutorial-page/tutorial-page.model';
import { SandboxService } from './sandbox.service';

describe('SandboxService', () => {
  let service: SandboxService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SandboxService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verify triggering of create method', () => {
    let actualResponse = null;
    const serverId = 'svr#123';
    service.create(serverId).subscribe((response) => {
      actualResponse = response;
    });
    const expected: ISandbox = {
      terminalUrl: 'http://terminal',
      websiteUrl: 'http://website',
      arn: 'mockArn'
    };

    httpMock
      .expectOne(
        (req: HttpRequest<ISandbox>) =>
          req.url === 'http://localhost:3000/sandbox/spawn/svr#123'
      )
      .flush(expected);

    expect(actualResponse).toEqual(expected);
  });
});
