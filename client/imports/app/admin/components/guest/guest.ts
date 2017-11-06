import {Component, Input, OnInit} from "@angular/core";
import template from "./guest.html";
import style from "./guest.scss";
import {ModalService} from "../../views/modals/modals.service";
import {WeddingService} from "../../../services/wedding.service";

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
    @Input() guest: object;

    constructor(private _weddingService: WeddingService) {

    }

    ngOnInit() {
        $('.activitiesToggle').popup({
            inline: true,
            on: 'click'
        });
    }

    mealColor(meal) {
        switch (meal) {
            case 'Chicken':
                return 'purple';
            case 'Salmon':
                return 'pink';
            case 'Vegetarian':
                return 'teal';
        }
    }
}