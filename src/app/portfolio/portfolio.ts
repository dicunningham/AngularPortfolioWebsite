import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Danie Cuningham - Portfolio');
  }
}
