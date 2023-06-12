import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AppComponent', () => {

  let api: ApiService;
  let app: AppComponent
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [ ApiService ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
    api = TestBed.inject(ApiService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular2-information'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular2-information');
  });

  it('should get ids from api', () => {
    const fakeIds = [1, 2, 3, 4, 5];
    const getNewsIdsSpy = spyOn(api, 'getNewsId').and.returnValue(of(fakeIds))
    const getNewsSpy = spyOn(app, 'getNews');
    app.getNewsIds();
    expect(getNewsIdsSpy).toHaveBeenCalled();
    expect(getNewsSpy).toHaveBeenCalled();
    expect(app.newsId).toEqual(fakeIds);
  })

  it('Should load 10 more news', () => {
    app.pageLenght = 5;
    const getNewsSpy = spyOn(app, 'getNews');
    app.loadMore();
    expect(app.pageLenght).toEqual(5 + 11);
    expect(getNewsSpy).toHaveBeenCalled();
  })

});
