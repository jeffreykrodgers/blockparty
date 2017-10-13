import {Component, Input, OnInit} from "@angular/core";
import template from "./venue.html";
import style from "./venue.scss";

@Component({
    selector: "venue-card",
    host: {
        class: 'venue card',
    },
    template,
    styles: [style],
})

export class admin_VenueComponent implements OnInit {
    @Input() venue: object;

    constructor() {

    }

    ngOnInit() {

    }
}