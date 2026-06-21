import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Projects } from '../_services/projects';
import { Project } from '../_models/Project';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  featuredProject = {} as Project;
  
  constructor(private titleService: Title, private projectsService: Projects) {
    this.titleService.setTitle('Danie Cuningham - Home');
  }

  ngOnInit(): void {
    this.featuredProject = this.projectsService.GetProjectById(0);
  }
}
