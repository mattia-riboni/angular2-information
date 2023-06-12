import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private api: ApiService,
  ){ }
  ngOnInit(): void {
    this.getNewsIds();
    console.log(this.news)
  }

  newsId: number[] = [0];
  title = 'angular2-information';
  news = [];
  pageLenght: number = 10;
  newsIdStart = 0;

  getNewsIds(){
    this.api.getNewsId().subscribe((res: any) => {
      this.newsId = res;
      this.getNews(this.newsId);
    })
  }

  getNews(ids: number[]){
    for(let i = this.newsIdStart; i < this.pageLenght; i++){
      this.api.getNews(ids[i].toString()).subscribe((res: any) => {
        this.news.push(res)
      })
    }
  }

  loadMore(){
    this.newsIdStart = this.pageLenght + 1;
    this.pageLenght = this.pageLenght + 11;
    this.getNews(this.newsId);
  }


}
