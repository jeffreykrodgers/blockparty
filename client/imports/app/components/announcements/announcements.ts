import { Component, OnInit, Input } from "@angular/core";
import template from "./announcements.html";
import style from "../../style/themes/default/announcements.scss";

@Component({
    selector: "announcements",
    host: {
        class: "announcements",
    },
    template,
    styles: [ style ]
})

export class AnnouncementsComponent implements OnInit {
    @Input() currentComponent;

    constructor() {

    }

    ngOnInit() {

    }
}