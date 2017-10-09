import { Component, OnInit } from "@angular/core";
import template from "./adminTop.html";
import style from "./adminTop.scss";

@Component({
    selector: "adminTop",
    host: {
        class: 'adminTop',
    },
    template,
    styles: [ style ]
})

export class AdminTopComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {

    };
}