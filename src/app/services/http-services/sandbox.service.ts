import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { environment } from '../../../environments/environment';
import { UserInfoService } from '../utility-services/user-info.service';

export interface ISandbox {
  terminalUrl: string;
  websiteUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class SandboxService {
  constructor(private http: HttpClient, private userInfo: UserInfoService) {}

  create(sandboxServerId: string): Observable<ISandbox> {
    return this.http.put<ISandbox>(
      Location.joinWithSlash(
        environment.serverUrl,
        `/sandbox/spawn/${sandboxServerId}`
      ),
      {
        idtoken: this.userInfo.getUserInfo().idToken
      }
    );
  }
}
