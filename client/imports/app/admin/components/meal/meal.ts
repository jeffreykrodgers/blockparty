import {Component, Input, OnInit} from "@angular/core";
import template from "./meal.html";
import style from "./meal.scss";
import {ModalService} from "../../services/modals.service";
import {WeddingService} from "../../../common/services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";

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

    weddingData: Observable<WeddingDB[]>;
    upload: any;

    constructor(private _weddingService: WeddingService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.upload = {path: ''};
    }

    ngOnInit() {
        if (this.meal.image) {
            this.weddingData.subscribe(wedding => {
                let uploads = wedding[0].uploads.filter((upload) => {
                    return upload._id = this.meal.image;
                });

                this.upload = uploads[0];
            });
        }

        $('.activitiesToggle').popup({
            inline: true,
            on: 'click'
        });
    }
}