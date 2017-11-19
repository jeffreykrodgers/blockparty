import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import template from "./finished.html";
import style from "../../style/themes/default/finished.scss";
import {RsvpService} from "../../services/rsvp.service";
import {Observable} from "rxjs/Observable";

import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {WeddingService} from "../../../common/services/wedding.service";

@Component({
    selector: "finished",
    template,
    styles: [ style ],
})

export class FinishedComponent implements OnInit {
    rsvpData: Observable<any>;
    weddingData: Observable<WeddingDB[]>;

    venues: object[];

    constructor(private _weddingService: WeddingService, private _rsvpService: RsvpService) {
        this.weddingData = this._weddingService.getWedding({}).zone();

        this._rsvpService.getRsvpData().subscribe(rsvp => this.rsvpData = rsvp);
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding =>{
            this.venues = wedding[0].venues;
        });
    }
}