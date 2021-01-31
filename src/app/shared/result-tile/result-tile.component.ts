import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultModel } from 'src/app/models/result-model';
import { SearchService } from 'src/app/search-bar/search.service';

@Component({
  selector: 'app-result-tile',
  templateUrl: './result-tile.component.html',
  styleUrls: ['./result-tile.component.css']
})
export class ResultTileComponent implements OnInit {

  private subscriptionName!: Subscription; //important to create a subscription
  results: Array<ResultModel> = [];
  page: number = 1;
  pageSize:number =3;
  constructor(private  searchService: SearchService) {

    this.subscriptionName = this.searchService.getResult().subscribe(
      message=>{
        this.results = message;
        //console.log(this.results[0]);
      }
    );
   }

  ngOnInit(): void {
  }

  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
            this.subscriptionName.unsubscribe();
 }

}
