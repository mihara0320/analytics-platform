import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface SubjectInstance {
  subject: Subject<any>;
  send: (value: any) => void;
  recieve: () => Observable<any>;
}

export interface InstanceWrapper {
  label: string,
  tv_data: Array<Array<number>>,
  instance: SubjectInstance,
}
