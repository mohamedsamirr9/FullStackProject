import { Component, signal } from '@angular/core';

declare var tns: any;

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly title = signal('project');
  ngAfterViewInit() {
    tns({
      container: '.hero-slider',
      items: 1,
      slideBy: 'page',
      autoplay: true,
      autoplayButtonOutput: false,
      mouseDrag: true,
      controls: false,
      nav: true,
    });
  }
}
