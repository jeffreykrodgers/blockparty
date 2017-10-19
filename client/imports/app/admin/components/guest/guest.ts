import {Component, Input, OnInit} from "@angular/core";
import template from "./guest.html";
import style from "./guest.scss";

@Component({
    selector: "guest-card",
    host: {
        class: 'guest card',
    },
    template,
    styles: [style],
})

export class admin_GuestComponent implements OnInit {
    @Input() guest: object;

    constructor() {

    }

    ngOnInit() {

    }

    mealColor(meal) {
        switch(meal) {
            case 'Chicken':
                return 'purple';
            case 'Salmon':
                return 'pink';
            case 'Vegetarian':
                return 'teal';
        }
    }
}