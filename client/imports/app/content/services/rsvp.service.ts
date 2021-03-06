import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {WeddingService} from "../../common/services/wedding.service";
import {WeddingDB} from "../../../../../both/models/wedding.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class RsvpService {
    private rsvpDataObservable = new BehaviorSubject<any>({
        guests: [],
        invitiation_num: '',
        current_component: {
            name: 'search',
            title: 'Enter your Invitation Number'
        }
    });

    weddingData: Observable<WeddingDB[]>;
    weddingId: string;

    constructor(private _weddingService: WeddingService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
        });
    }

    getRsvpData(): Observable<any> {
        return this.rsvpDataObservable.asObservable();
    }

    setRsvpData(rsvpData: any, updateDb?: boolean, song?: boolean) {
        if (updateDb) {
            WeddingService.updateWeddingItem(this.weddingId, rsvpData.guests, 'Guest');
        }

        if (song) {
            if (rsvpData.song._id) {
                WeddingService.updateWeddingItem(this.weddingId, [rsvpData.song], 'Song');
            } else {
                WeddingService.addWeddingItem(this.weddingId, [rsvpData.song], 'Song');
            }
        }

        this.rsvpDataObservable.next(rsvpData);
    }
}