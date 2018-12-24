import { Component, OnInit, ViewChild, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { SubjectService } from '../../shared/services/subject.service';
import { SubjectInstance, InstanceWrapper } from '../../shared/interfaces/subject';
import { Observable } from 'rxjs/Observable';
import { mapStyle } from './mapStyle'

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @ViewChild('map') map: any;
  @Input('subject_lat') subject_lat: InstanceWrapper;
  @Input('subject_lon') subject_lon: InstanceWrapper;

  lat: number;
  lng: number;

  constructor(
    private _subject: SubjectService,
  ) { }

  ngOnInit() {
    let length = this.subject_lat.tv_data.length
    this.lat = this.subject_lat.tv_data[length-1][1]
    this.lng = this.subject_lon.tv_data[length-1][1]

    this.subject_lat.instance.recieve().subscribe( data => this.lat = data )
    this.subject_lon.instance.recieve().subscribe( data => this.lng = data )

    this.map.styles = mapStyle
    this.map.zoom = 13
  }
}
