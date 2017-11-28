import { Component, OnInit } from "@angular/core";

import template from "./rsvp.html";
import style from "../../style/themes/default/rsvp.scss";
import {RsvpService} from "../../services/rsvp.service";

@Component({
    selector: "rsvp",
    host: {
      class: "rsvp",
    },
    template,
    styles: [ style ],
})

export class RsvpView implements OnInit {
    links: object[];

    constructor(private _rsvpService: RsvpService) {};

    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.links = rsvp.links;
        });

    };
}