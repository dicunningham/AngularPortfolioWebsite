import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProjectCard } from "../project-card/project-card";
import { Project } from '../_models/Project';
import { Tag } from '../_models/Tag';
import { Projects as ProjectsService } from '../_services/projects';

@Component({
  selector: 'app-portfolio',
  imports: [ProjectCard],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit {

  projects: Project[] = [];
  
  constructor(private titleService: Title, private projectsService: ProjectsService) {
    this.titleService.setTitle('Danie Cuningham - Portfolio');
  }

  ngOnInit(): void {
    this.projects = this.projectsService.GetProjects();
  }
}
