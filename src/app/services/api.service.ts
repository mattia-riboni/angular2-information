import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  API_URL: string = 'https://hacker-news.firebaseio.com/v0/newstories.json'
  NEWS_URL: string = 'https://hacker-news.firebaseio.com/v0/item/';

  getNewsId(): Observable<Object>{
    return this.http.get(this.API_URL)
  }

  getNews(id: string): Observable<Object>{
    return this.http.get(`${this.NEWS_URL}${id}.json`)
  }

}
