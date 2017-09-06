import { Component, OnInit, Input } from "@angular/core";
import template from "./top.html";
import style from "../../style/themes/default/top.scss";

@Component({
    selector: "top",
    host: {
        class: 'top'
    },
    template,
    styles: [ style ]
})

export class TopComponent implements OnInit {
    @Input() currentComponent;

    constructor() {

    }

    ngOnInit() {

    }
}