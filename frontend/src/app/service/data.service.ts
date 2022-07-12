import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchModel } from './../model/search.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) {  }

  private resultsSubject = new BehaviorSubject<Array<any>>([]);
  public results$ = this.resultsSubject.asObservable();

  private addResultsFromApi(results: Array<any>) {
    this.resultsSubject.next([...this.resultsSubject.value, results]);
  }

  public searchHotels(model: SearchModel) {
    // clear old data
    this.resultsSubject.next([]);

    this.http.get<Array<{}>>(environment.serverUrl + 'getSearchApis', {
      params: {
        groupSize: model.groupSize,
        destination: model.destination,
      }
    }).subscribe(result => {
      result.map(apiConfig => this.callApi(apiConfig, model));
    });
    // first get searches array to query
    // than callApi them parallel
    // update results array

  }

  public callApi(apiConfig: any, model: SearchModel) {
    this.http.get<Array<{}>>(environment.serverUrl + 'searchApiConcrete', {
      params: {
        groupSize: apiConfig.group,
        destination: model.destination,
        apiType: apiConfig.apiType
      }
    }).subscribe((searchResults: any) => {
      this.addResultsFromApi(searchResults?.body?.accommodations);
    });
  }

  public getDestinations$() {
    return this.http.get('/assets/resorts.json')
  }
}
