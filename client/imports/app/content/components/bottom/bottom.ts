import { Component, OnInit, Input } from "@angular/core";
import template from "./bottom.html";
import style from "../../style/themes/default/bottom.scss";

@Component({
    selector: "bottom",
    host: {
        class: "bottom",
    },
    template,
    styles: [ style ]
})

export class BottomComponent implements OnInit {
    @Input() currentComponent;

    constructor() {

    }

    ngOnInit() {

    }
}