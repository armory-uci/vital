import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { environment } from '../../../environments/environment';

export interface ISandbox {
  terminalUrl: string;
  websiteUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class SandboxService {
  constructor(private http: HttpClient) {}

  create(sandboxServerId: string): Observable<ISandbox> {
    return this.http.get<ISandbox>(
      Location.joinWithSlash(
        environment.serverUrl,
        `/sandbox/spawn/${sandboxServerId}`
      )
    );
  }
}
