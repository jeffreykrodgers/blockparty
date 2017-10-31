import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class RsvpService {
    private modalDataObservable = new BehaviorSubject<any>({
        form: [],
    });

    constructor() {

    }

    getModalData(): Observable<any> {
        return this.modalDataObservable.asObservable();
    }

    setModalData(modalData: any) {
        this.modalDataObservable.next(modalData);
    }
}