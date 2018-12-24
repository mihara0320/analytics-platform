import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import * as Highcharts from 'highcharts'
import { config } from './config'

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input('data') data: any;
  @Input('title') title: string;
  @Input('unit') unit: string;
  @ViewChild('instance') instance: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setChartSize()
  }

  options: any;

  constructor( private elRef: ElementRef ) { }

  ngOnInit() {
    let options = {
      title: this.title,
      categories: [],
      unit: this.unit,
      series: []
    }
    this.data.forEach(el => {
      options.categories.push(el.label)
      options.series.push({data: [Number(el.data.value.toFixed(1))], name: el.label})
    })
    this.options = config(options)
  }
  ngAfterViewInit(){
    this.setChartSize()
  }
  setChartSize(){
    let width = this.elRef.nativeElement.clientWidth
    let height = this.elRef.nativeElement.clientWidth/1.5
    this.instance.chart.setSize(width, height)
  }

}
