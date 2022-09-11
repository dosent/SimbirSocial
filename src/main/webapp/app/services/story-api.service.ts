/* eslint-disable @typescript-eslint/no-parameter-properties */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StoryApiService {
  constructor(private readonly http: HttpClient) {}

  getStoryList() {
    return this.http.get('http://158.160.12.147/api/events');
  }
}
