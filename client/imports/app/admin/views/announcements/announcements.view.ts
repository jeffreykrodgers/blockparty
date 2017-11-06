import {Component, OnInit} from "@angular/core";
import template from "./announcements.view.html";
import style from "./announcements.view.scss";

@Component({
    selector: "announcements",
    host: {
        class: 'announcements',
    },
    template,
    styles: [style]
})

export class AnnouncementsView implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}