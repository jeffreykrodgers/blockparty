import { Component, OnInit, Input } from "@angular/core";
import template from "./reminder.html";
import style from "../../style/themes/default/reminder.scss";

@Component({
    selector: "reminder",
    template,
    styles: [ style ]
})

export class ReminderComponent implements OnInit {
    @Input() currentComponent;

    constructor() {

    }

    ngOnInit() {

    }
}