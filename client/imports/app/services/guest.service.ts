import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";

@Injectable()
export class GuestService {
    private guestDataObservable = new Subject<any>();
    guestData: any;

    constructor() {

    }

    getGuestData(): Observable<any> {
        return this.guestDataObservable.asObservable();
    }

    setGuestData(guestData: any) {
        this.guestDataObservable.next(guestData);
    }
}