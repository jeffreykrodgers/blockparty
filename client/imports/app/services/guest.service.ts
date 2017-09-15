import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";
import { WeddingService } from "./wedding.service";

@Injectable()
export class GuestService {
    private guestDataObservable = new Subject<any>();
    currentWedding: any;
    guestData: any;

    constructor(private weddingService: WeddingService) {
        this.currentWedding = this.weddingService.getWedding().fetch();
    }

    init() {
        console.log(this.currentWedding);
    }

    getGuestData(): Observable<any> {
        return this.guestDataObservable.asObservable();
    }

    setGuestData(guestData: any) {
        this.guestDataObservable.next(guestData);
    }
}