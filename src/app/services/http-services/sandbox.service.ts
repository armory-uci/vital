import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { environment } from '../../../environments/environment';
import { UserInfoService } from '../utility-services/user-info.service';
import { ISandbox } from '../../home/tutorial-page/tutorial-page.model';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {
  private idToken: string;
  constructor(private http: HttpClient, private userInfo: UserInfoService) {
    userInfo.getUserInfo().subscribe((info) => {
      this.idToken = info.idToken;
    });
  }

  create(sandboxServerId: string): Observable<ISandbox> {
    return this.http.put<ISandbox>(
      Location.joinWithSlash(
        environment.serverUrl,
        `/sandbox/spawn/${sandboxServerId}`
      ),
      {
        idtoken: this.idToken
      }
    );
  }
}
