import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IRefer } from './reference.model';
import { environment } from '../../environments/environment';

const NODE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private http: HttpClient) { }

  getReference() {
    return this.http.get<{message: string, posts: IRefer[]}>(
      NODE_URL + "/getRefer"
    );
  }

  postReference(postData: IRefer) {
    return this.http.post<{message: string}>(NODE_URL+"/postRefer", postData);
  }
}
