import {Component, Input, OnInit} from "@angular/core";
import template from "./meal.html";
import style from "./meal.scss";
import {ModalService} from "../../views/modals/modals.service";
import {WeddingService} from "../../../common/services/wedding.service";

declare let $: any;

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

    constructor(private _weddingService: WeddingService) {

    }

    ngOnInit() {
        $('.activitiesToggle').popup({
            inline: true,
            on: 'click'
        });
    }
}