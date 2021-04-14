import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IRefer } from './reference.model';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private http: HttpClient) { }

  getReference() {
    return this.http.get<{message: string, posts: IRefer[]}>(
      "http://localhost:3000/api/getRefer"
    );
  }
}
