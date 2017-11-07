import {Component, OnInit} from "@angular/core";
import template from "./meals.view.html";
import style from "./meals.view.scss";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {WeddingService} from "../../../common/services/wedding.service";
import {ModalService} from "../modals/modals.service";

@Component({
    selector: "meals",
    host: {
        class: 'meals',
    },
    template,
    styles: [style]
})

export class MealsView implements OnInit {
    weddingData: Observable<WeddingDB[]>;

    guests: object[];
    meals: object[];

    constructor(private _weddingService: WeddingService,
                private _modalService: ModalService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.guests = wedding[0].guests;
            this.meals = wedding[0].meals;
        });
    }
}