import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cities: Array<string> = ["city1", "city2", "city3"];
  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

}
