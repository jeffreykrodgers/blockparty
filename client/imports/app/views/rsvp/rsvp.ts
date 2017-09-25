import { Component, OnInit } from "@angular/core";

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
    currentSetComponent: string;


    constructor() {

    };

    ngOnInit() {
        this.currentSetComponent = 'search';
    };

    setCurrentComponent(component) {
        this.currentSetComponent = component;
    };
}