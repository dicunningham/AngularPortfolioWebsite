import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  imports: [],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Danie Cuningham - Resume');
  }
}
