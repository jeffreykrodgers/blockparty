import { Component, OnInit } from "@angular/core";
import template from "./entry.html";
import style from "../../style/themes/default/entry.scss";

@Component({
    selector: "entry",
    host: {
      class: 'entry',
    },
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

    };
}