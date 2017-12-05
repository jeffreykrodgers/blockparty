import {Component, Input, OnInit} from "@angular/core";
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
    charts: any;

    constructor() {
        this.charts = [
            {type: 'rsvp'},
            {type: 'meals'},
            {type: 'budget'}];
    }


    ngOnInit() {

    }
}