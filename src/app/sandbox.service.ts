import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:3000/sandbox';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {
  constructor(private http: HttpClient) {}

  create() {
    return this.http.get(`${BASE_URL}/spawn/sqlInjection`);
  }
}
