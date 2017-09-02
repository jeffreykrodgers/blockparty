import { Injectable } from '@angular/core';

@Injectable()

export class GuestService {
    guestData: any;

    constructor() {

    }

    currentGuestData() {
        return this.guestData;
    }

    setGuestData(guestData) {
        this.guestData = guestData;
    }

    getGuestData(guestData) {
        return this.guestData;
    }

}