import { Component, OnInit } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';

import { GuestService } from "../../services/guest.service";

import template from "./rsvp.html";
import style from "../../style/themes/default/rsvp.scss";

@Component({
    selector: "rsvp",
    host: {
      class: "rsvp",
    },
    template,
    styles: [ style ],
})

export class RsvpComponent implements OnInit {
    guestSubscription: Subscription;
    rsvp: any;
    currentSetComponent: any;
    currentSetGuest: any;

    constructor(private guestService: GuestService) {
        this.currentSetGuest = this.guestService.getGuestData().subscribe();
        console.log(this.currentSetGuest);
    }

    ngOnInit() {
        this.currentSetComponent = 'search';
    };

    setCurrentComponent(component) {
        this.currentSetComponent = component;
    }
}