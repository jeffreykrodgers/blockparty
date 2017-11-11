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

    constructor(private _weddingService: WeddingService) {}

    ngOnInit() {
        $('.activitiesToggle').popup({
            inline: true,
            on: 'click'
        });
    }

    mealColor(meal) {
        //TODO: This is hardcoded, needed to get color value from meal object
        switch (meal) {
            case 'Chicken':
                return 'purple';
            case 'Salmon':
                return 'pink';
            case 'Vegetarian':
                return 'teal';
        }
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