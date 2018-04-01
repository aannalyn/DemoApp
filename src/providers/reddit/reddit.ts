import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RedditProvider {
  private url:string = 'https://www.reddit.com/r';

  constructor(public http: HttpClient) { }

  getPosts(category, limit) {
    return this.http.get(`${this.url}/${category}/top.json?limit=${limit}`)
  }

}
