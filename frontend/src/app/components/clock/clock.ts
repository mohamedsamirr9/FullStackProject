import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clock',
  imports: [],
  templateUrl: './clock.html',
  styleUrl: './clock.css',
})
export class Clock {
  private timerId: any;
  date = new Date();
  hour = this.date.getHours();
  min = this.date.getMinutes();
  second = this.date.getSeconds();
  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.second++;
      if (this.second === 60) {
        this.second = 0;
        this.min++;
      }
      if (this.min == 60) {
        this.min = 0;
        this.hour++;
      }
      if (this.hour == 24) {
        this.hour = 0;
      }
    }, 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.timerId);
    console.log('Clock stopped');
  }
}
