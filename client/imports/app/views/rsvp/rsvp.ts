import { Component, OnInit } from "@angular/core";

import template from "./rsvp.html";
import style from "../../style/themes/default/rsvp.scss";
import {GuestService} from "../../services/guest.service";

@Component({
    selector: "rsvp",
    host: {
      class: "rsvp",
    },
    template,
    styles: [ style ],
})

export class RsvpComponent implements OnInit {
    rsvp: any;
    currentSetComponent: string;
    currentGuest: string;

    constructor(private _guestService: GuestService) {

    };

    ngOnInit() {
        this.currentSetComponent = 'search';
        this._guestService.init();
    };

    setCurrentComponent(component) {
        this.currentSetComponent = component;
    };

    setGuestName(name) {
        this.currentGuest = name;
    };
}