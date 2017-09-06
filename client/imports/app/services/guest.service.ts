import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GuestService {
    private guestData = new Subject<any>();

    constructor() {

    }

    getGuestData() {
        return this.guestData.asObservable();
    }

    setGuestData(guestData: any) {
        this.guestData.next(guestData);
    }
}