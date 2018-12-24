import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SubjectInstance } from '../interfaces/subject'

@Injectable()
export class SubjectService {
  private globalSubject: Subject<any> = new Subject<any>();

  send(value: any): void{
    this.globalSubject.next(value)
  }
  recieve(): Observable<any>{
    return this.globalSubject.asObservable();
  }
  createInstance(): SubjectInstance {
    const service: SubjectInstance = Object.create(null)
    Object.assign(service, {
      subject: new Subject<any>(),
      send: value => service.subject.next(value),
      recieve: () => { return service.subject.asObservable()}
    })
    return service
  }
}
