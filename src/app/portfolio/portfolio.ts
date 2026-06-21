import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProjectCard } from "../project-card/project-card";

@Component({
  selector: 'app-portfolio',
  imports: [ProjectCard],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Danie Cuningham - Portfolio');
  }
}
