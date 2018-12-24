import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navs = [
    {title: 'Time Series', link: '', icon: 'timeline'},
    {title: 'Current Value', link: 'current', icon:'access_time'}
  ]
}
