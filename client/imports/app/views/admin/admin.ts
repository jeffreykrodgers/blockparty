import { Component, OnInit } from "@angular/core";
import template from "./admin.html";
import style from "./styles/admin.scss";

@Component({
    selector: "admin",
    host: {
        class: 'admin',
    },
    template,
    styles: [ style ]
})

export class AdminComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {

    };
}