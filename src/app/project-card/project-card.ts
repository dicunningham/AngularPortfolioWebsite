import { Component, input } from '@angular/core';
import { Project } from '../_models/Project';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  readonly project = input({} as Project);
}
