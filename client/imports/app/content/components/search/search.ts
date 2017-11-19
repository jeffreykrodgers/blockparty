import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import template from "./search.html";
import { Observable } from "rxjs";
import style from "../../style/themes/default/search.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {RsvpService} from "../../services/rsvp.service";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {Router} from "@angular/router";

@Component({
    selector: "search",
    host: {
      class: "search"
    },
    template,
    styles: [ style ],
})

export class SearchComponent implements OnInit {
    weddingData: Observable<WeddingDB[]>;

    invitationNumber: string;
    guests: any;
    errors: any;

    constructor(private _weddingService: WeddingService,
                private _rsvpService: RsvpService,
                private _router: Router) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.errors = [];
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding =>{
            this.guests = wedding[0].guests;
        });
    }

    findGuests() {
        if (this.invitationNumber) {
            this.invitationNumber = this.invitationNumber.toUpperCase();
            const invitationParty = this.guests.filter(
                guest => guest.invitation_num == this.invitationNumber);

            if (invitationParty.length > 0) {
                this._rsvpService.setRsvpData({
                    guests: invitationParty,
                    invitation_num: this.invitationNumber
                });

                this._router.navigate(['/rsvp/guests']);

            } else {
                this.errors.push("No Guests found with this invitation number");
            }

        } else {
            this.errors.push("Please input an invitation number");
        }
    }
}