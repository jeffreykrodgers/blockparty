import { Component, OnInit } from "@angular/core";
import template from "./rsvp.html";
import style from "../../style/themes/default/rsvp.scss";

@Component({
    selector: "rsvp",
    template,
    styles: [ style ]
})

export class RsvpComponent implements OnInit {
    rsvp: any;
    currentComponent: any;

    constructor() {

    }

    ngOnInit() {
        this.currentComponent = 'search';
    };
}