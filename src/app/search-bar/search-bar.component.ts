import { Component, OnInit } from '@angular/core';
import { CurrencyModel } from '../models/currency-model';
import { SearchService } from './search.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  currencies: Array<CurrencyModel> = [];
  currencyModel!: CurrencyModel;
  currKeys!: string[];
  sourceCurrency: string = 'Please select the Currency';
  sourceCurrencyName!: string;
  destinationCurrency: string = 'Please select the Currency';
  transferAmount!: number;
  constructor(private searchService: SearchService, private toastr: ToastrService) { 
    this.searchService.getAllCurrencies().subscribe(currencies =>{
        //console.log(currencies);
        this.currKeys = Object.keys(currencies);
        this.currKeys.forEach(element => {
          this.currencyModel={'name': element, 'description': currencies[element]};
          this.currencies.push(this.currencyModel);
        });
    },
    error => {
      this.currencies.push({'name': 'Error', 'description': 'Error retriving currency list.'})
    });
  }

  ngOnInit(): void {
    
  }

  selectSourceCurrency(event: any) {
      this.sourceCurrencyName = event.target.value;
  }

  getResultSet(sourceCurr: string, destinationCurr: string) {
    this.toastr.info("Searching...")
    this.searchService.getAllResults(sourceCurr, destinationCurr, this.transferAmount).subscribe(result => {
      console.log(result);
      this.searchService.sendResult(result);
    },
    error => {
      console.log("Error while retriving result: ");
      console.log(error.error);
      this.toastr.error("Sorry, we are experiencing difficulties now. Kindly try after sometime.")
    });
  }

}
