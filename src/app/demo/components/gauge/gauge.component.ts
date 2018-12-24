import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, HostListener} from '@angular/core';
import { SubjectService } from '../../shared/services/subject.service';
import { SubjectInstance, InstanceWrapper } from '../../shared/interfaces/subject';
import * as Highcharts from 'highcharts'
import { config } from './config'

@Component({
  selector: 'gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {
  @Input('title') title: string;
  @Input('subject') subject: InstanceWrapper;
  @ViewChild('gauge') gauge: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setChartSize()
  }

  options: any;
  currntTime: number;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private _subject: SubjectService
  ) { }

  ngOnInit() {
    this.options = config(this.title, this.subject.tv_data)
    this.subject.instance.recieve().subscribe( data => {
      let point = this.gauge.chart.series[0].points[0]
      point.update(data)
    })
  }
  ngAfterViewInit(){
    this.setChartSize()
  }
  setChartSize(){
    let width = this.elRef.nativeElement.clientWidth
    let height = this.elRef.nativeElement.clientWidth/1.5
    // let height = this.elRef.nativeElement.clientHeight
    this.gauge.chart.setSize(width, height)
  }
}
