import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";
import { Meteor} from "meteor/meteor";
import {WeddingService} from "./wedding.service";
import {WeddingDB} from "../../../../both/models/wedding.model";
import {MeteorObservable} from "meteor-rxjs";

@Injectable()
export class RsvpService {
    private rsvpDataObservable = new Subject<any>();

    weddingData: Observable<WeddingDB[]>;
    weddingId: string;

    constructor(private _weddingService: WeddingService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
        })
    }

    getRsvpData(): Observable<any> {
        return this.rsvpDataObservable.asObservable();
    }

    setRsvpData(rsvpData: any, updateDb?: boolean) {
        if (updateDb) {
            this._weddingService.updateWedding(this.weddingId, rsvpData.guests);
        }

        this.rsvpDataObservable.next(rsvpData);
    }
}