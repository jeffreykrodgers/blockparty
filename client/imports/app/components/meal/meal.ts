import { Component, OnInit, Input } from "@angular/core";
import template from "./meal.html";
import style from "../../style/themes/default/meal.scss";

@Component({
    selector: "meal",
    template,
    styles: [ style ]
})

export class MealComponent implements OnInit {
    @Input() currentComponent;

    constructor() {

    }

    ngOnInit() {

    }
}