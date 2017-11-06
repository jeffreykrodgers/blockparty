import {Component, OnInit} from "@angular/core";
import template from "./dashboard.view.html";
import style from "./dashboard.view.scss";

@Component({
    selector: "dashboard",
    host: {
        class: 'dashboard',
    },
    template,
    styles: [style]
})

export class DashboardView implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}