import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { ApiService } from './api.service';
import { TmplAstBoundEvent } from '@angular/compiler';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Should retrive news's ids from API via GET", () => {
    const ids: number[] = [123,124,125]


    service.getNewsId().subscribe((res: any) => {
      expect(res.length).toBe(3);
      expect(res).toEqual(ids);
    })


    const request = httpController.expectOne(service.API_URL)
    expect(request.request.method).toBe('GET')
  })

  it('Should retive news from API via GET', () => {
    const news = [{
      by: 'test',
      descendants: 0,
      id: 0,
      score: 0,
      time: 0,
      type: 'test',
      title: 'test',
      url: 'test'
    }]

    service.getNews('1').subscribe((res: any) => {
      expect(res.length).toBe(1);
      expect(res).toEqual(news);
    })

    const request = httpController.expectOne(service.NEWS_URL + '1.json');
    expect(request.request.method).toBe('GET');

  })
});
