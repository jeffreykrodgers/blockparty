import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";

@Injectable()
export class RsvpService {
    private rsvpDataObservable = new Subject<any>();

    constructor() {
    }

    getRsvpData(): Observable<any> {
        return this.rsvpDataObservable.asObservable();
    }

    setRsvpData(rsvpData: any) {
        console.log(rsvpData);
        this.rsvpDataObservable.next(rsvpData);
    }
}