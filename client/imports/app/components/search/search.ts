import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import template from "./search.html";
import { Observable } from "rxjs";
import style from "../../style/themes/default/search.scss";
import {WeddingService} from "../../services/wedding.service";
import {RsvpService} from "../../services/rsvp.service";
import {WeddingDB} from "../../../../../both/models/wedding.model";


@Component({
    selector: "search",
    host: {
      class: "search"
    },
    template,
    styles: [ style ],
})

export class SearchComponent implements OnInit {
    @Output() currentComponent: EventEmitter<string> = new EventEmitter();

    weddingData: Observable<WeddingDB[]>;

    invitationNumber: number;
    errors: any;


    constructor(private _weddingService: WeddingService, private _rsvpService: RsvpService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.errors = [];
    }

    ngOnInit() {

    }

    findGuests() {
        if (this.invitationNumber) {
            this.weddingData.subscribe(weddings => {
                const invitationParty = weddings[0].guests.filter(
                    guest => guest.invitation_num === this.invitationNumber);

                if (invitationParty.length > 0) {
                    this._rsvpService.setRsvpData({
                        "guests": invitationParty,
                        "invitation_num": this.invitationNumber
                    });

                    this.currentComponent.emit('guest');

                } else {
                    this.errors.push("No Guests found with this invitation number");
                }
            });

        } else {
            this.errors.push("Please input an invitation number");
        }
    }
}