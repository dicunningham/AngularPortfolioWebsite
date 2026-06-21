import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProjectCard } from "../project-card/project-card";
import { Project } from '../_models/Project';
import { Tag } from '../_models/Tag';

@Component({
  selector: 'app-portfolio',
  imports: [ProjectCard],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {

  project: Project = {
    id: 0,
    name: 'Sample Angular App',
    summary: 'A brief summary of the project.',
    description: 'A detailed description of the project, its features, and technologies used.',
    projectLink: '',
    projectImages: [],
    tags: [Tag.ANGULAR, Tag.TYPESCRIPT]
  };
  
  constructor(private titleService: Title) {
    this.titleService.setTitle('Danie Cuningham - Portfolio');
  }
}
