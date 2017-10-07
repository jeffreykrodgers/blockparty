import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";

import template from "./gift.html";
import style from "../../style/themes/default/gift.scss";

import {WeddingService} from "../../services/wedding.service";
import {RsvpService} from "../../services/rsvp.service";

@Component({
    selector: "gift",
    host: {
        class: "gift",
    },
    template,
    styles: [ style ]
})

export class GiftComponent implements OnInit {
    //I/O
    @Output() currentComponent: EventEmitter<object> = new EventEmitter();

    //Observables
    rsvpData: any;

    //Other Variables
    guests?: object[];
    gifts?: object[];
    addingGift: boolean;

    constructor(private _weddingService: WeddingService, private _rsvpService: RsvpService) {
        this.gifts = [];
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.rsvpData = rsvp;
            this.guests = rsvp.guests;

            this.guests.forEach((guest: any) => {
                if (guest.gift && this.gifts.filter((r: any) => r.guest === guest._id).length === 0) {
                    this.gifts.push({
                        guest: guest._id,
                        amount: guest.gift,
                    });
                }
            });
        });
    }


    ngOnInit() {

    }

    addGift() {
        this.gifts.push({});
        this.addingGift = true;
    }

    startPayment() {
        //TODO: Paypal stuff will go here
        this.addingGift = false;
    }

    setGift() {

        this.gifts.forEach((gift?: any) => {
            this.guests.filter((guest?: any) => {
                if (guest._id === gift.guest) {
                    guest.gift = gift.amount;
                }
            });
        });

        this.rsvpData.current_component = {
            name: 'summary',
            title: 'Summary'
        };

        this._rsvpService.setRsvpData(this.rsvpData, true);
    }
}