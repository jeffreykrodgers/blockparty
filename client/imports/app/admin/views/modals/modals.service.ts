import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ModalService {
    private modalObservable = new Subject<any>();
    // private modalDataObservable = new BehaviorSubject<any>({
    //     form: [],
    // });

    openModal(type, object = {}, mode = 'Add') {
        const data = {
            form: type,
            mode: mode,
            data: object,
        };
        this.modalObservable.next(data);
    }

    get events$ () {
        return this.modalObservable.asObservable();
    }
}