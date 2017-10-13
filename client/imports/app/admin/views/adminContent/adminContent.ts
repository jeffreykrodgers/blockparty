import {Component, OnInit} from "@angular/core";
import template from "./adminContent.html";
import style from "./adminContent.scss";
import {WeddingService} from "../../../services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";

@Component({
    selector: "adminContent",
    host: {
        class: 'adminContent',
    },
    template,
    styles: [style]
})

export class AdminContentView implements OnInit {
    weddingData: Observable<WeddingDB[]>;

    weddingId: string;
    guests: object[];
    tables: object[];
    meals: object[];
    venues: object[];
    charts: object[];

    constructor(private _weddingService: WeddingService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.charts = [
            {
                title: "RSVP Completion",
                type: 'percentage',
                data: [{
                    key: 'Complete',
                    slug: 'completion-rate',
                    color: '#8781EF',
                    value: 65,
                }]
            },
            {
                title: "Guest Summary",
                type: 'compound',
                data: [
                    {
                        key: 'Not Attending',
                        slug: 'not-attending',
                        color: '#F6A2D3',
                        value: 2,
                    },
                    {
                        key: 'Attending',
                        slug: 'attending',
                        color: '#78ECD6',
                        value: 55,
                    },
                    {
                        key: 'Total Invited',
                        slug: 'total-invited',
                        color: '#8781EF',
                        value: 80,
                    }
                ]
            },
            {
                title: "Meal Selection",
                type: 'division',
                data: [
                    {
                        key: 'Fish',
                        slug: 'fish',
                        color: '#F6A2D3',
                        value: 11,
                    },
                    {
                        key: 'Chicken',
                        slug: 'chicken',
                        color: '#8781EF',
                        value: 35,
                    },
                    {
                        key: 'Vegetarian',
                        slug: 'vegetarian',
                        color: '#78ECD6',
                        value: 9,
                    }
                ]
            }
        ];
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
            this.guests = wedding[0].guests;
            this.tables = wedding[0].tables;
            this.meals = wedding[0].meals;
            this.venues = wedding[0].venues;
        });
    };

    addItem() {

    };

    editItem(item) {

    };

    removeItem(item) {

    };

    hideModal(modal) {
        modal.hide();
    }
}