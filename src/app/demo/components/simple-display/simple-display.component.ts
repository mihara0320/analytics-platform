import { Component, OnInit, Input } from '@angular/core';
import { SubjectInstance, InstanceWrapper } from '../../shared/interfaces/subject'

@Component({
  selector: 'simple-display',
  templateUrl: './simple-display.component.html',
  styleUrls: ['./simple-display.component.scss']
})
export class SimpleDisplayComponent implements OnInit {
  @Input('title') title: string;
  @Input('unit') unit: string;
  @Input('subject') subject: InstanceWrapper;

  value: number = 0;

  constructor() { }

  ngOnInit() {
    this.subject.instance.recieve().subscribe( value => {
      this.value = value
    })
  }

}
