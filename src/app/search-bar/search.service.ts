import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RateModel } from '../models/rate-model';
import { ResultModel } from '../models/result-model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private subjectName = new Subject<any>();
  private resultModel!: ResultModel;
  private rates: RateModel[] = [];
  private results: Array<ResultModel> = [];
  private rateKeys:string[] = [];
  private transferAmount: number = 1;
  
  constructor(private http: HttpClient) { }

  getAllCurrencies():Observable<any> {
    console.log("calling currency service");
    return this.http.get<any>('https://openexchangerates.org/api/currencies.json');
  }

  getAllResults(source: string, destination: string, transferAmount: number):Observable<any> {
    this.transferAmount = transferAmount;
    if(this.transferAmount == undefined) {this.transferAmount = 1;}
    return this.http.get<any>('https://api.exchangeratesapi.io/latest?base=' + source + '&symbols=' + destination);
  }

  sendResult(message: any) { //the component that wants to update something, calls this fn
    this.rateKeys = Object.keys(message['rates']);
    this.rateKeys.forEach(element=> {
      this.rates.push({'name': element, 'value' : message['rates'][element]});
    });
    
    this.resultModel = {"name": "Based on EU Information", 'date': message['date'], 'base': message['base'], 'transferAmount': this.transferAmount,'serviceCharge' : 0, 'rates': this.rates};
    this.results.push(this.resultModel);
    console.log(this.results);
    this.rates = []; //clear the values once pused in to the result model.
    this.subjectName.next(this.results); //next() will feed the value in Subject
  }

  getResult(): Observable<any> { //the receiver component calls this function 
    return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

}
