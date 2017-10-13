import { Component, OnInit } from "@angular/core";
import template from "./admin.html";
import style from "./admin.scss";

@Component({
    selector: "admin",
    host: {
        class: 'admin',
    },
    template,
    styles: [ style ]
})

export class AdminView implements OnInit {

    constructor() {

    }

    ngOnInit() {

    };
}