import { Component, OnInit } from "@angular/core";
import template from "./entry.html";
import style from "./entry.scss";

@Component({
    selector: "entry",
    template,
    styles: [ style ]
})

export class EntryComponent implements OnInit {
    rsvp: any;

    constructor() {
        this.rsvp = () => {
            console.log('RSVPd');
        }
    }

    ngOnInit() {

    }

    rsvp
}