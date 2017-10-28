import {Component, Input, OnInit} from "@angular/core";
import template from "./meal.html";
import style from "./meal.scss";

@Component({
    selector: "meal-card",
    host: {
        class: 'meal card',
    },
    template,
    styles: [style],
})

export class admin_MealComponent implements OnInit {
    @Input() meal: any;

    constructor() {

    }

    ngOnInit() {
                                                                            
    }
}