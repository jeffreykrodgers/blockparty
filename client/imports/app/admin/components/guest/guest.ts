import {Component, Input, OnInit} from "@angular/core";
import template from "./guest.html";
import style from "./guest.scss";
import {WeddingService} from "../../../common/services/wedding.service";

declare let $: any;

@Component({
    selector: "guest-card",
    host: {
        class: 'guest card',
    },
    template,
    styles: [style],
})

export class admin_GuestComponent implements OnInit {
    @Input() guest: any;
    @Input() meals: any;

    constructor() {}

    ngOnInit() {
        $('.activitiesToggle').popup({
            inline: true,
            on: 'click'
        });
    }

    mealColor(meal) {
        let result = this.meals.filter(m => m.name === meal);
        return result[0].color;
    }

    guestStatus() {
        if (this.guest.completed && this.guest.attending) {
            return 'attending';
        } else if (this.guest.completed && !this.guest.attending) {
            return 'missing';
        } else if (!this.guest.completed) {
            return 'incomplete';
        }
    }
}