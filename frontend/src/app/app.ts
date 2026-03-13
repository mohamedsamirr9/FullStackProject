import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';
import { Clock } from './components/clock/clock';
import { Home } from './components/home/home';
import { Footeer } from './components/footeer/footeer';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Nav, Clock, Home, Footeer],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  showClock: boolean = true;

  onToggleClock() {
    this.showClock = !this.showClock;
  }
}
