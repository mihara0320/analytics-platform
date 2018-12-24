import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navs = [
    { title: 'Time Series', link: '', icon: 'timeline' },
    { title: 'Current Value', link: 'current', icon: 'access_time' }
  ];

  currentRoute: string;

  constructor(private router: Router) {
    this.router.events.subscribe(e => {
      if (e['url']) {
        this.currentRoute = e['url'] === '/' ? 'Time Series' : 'Current Value';
      }
    });
  }

  isSelected(nav) {
    return {
      'selected': nav.title === this.currentRoute
    };
  }
}
