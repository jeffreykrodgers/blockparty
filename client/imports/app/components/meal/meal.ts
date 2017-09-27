import { Component, OnInit,  Output, EventEmitter } from "@angular/core";
import template from "./meal.html";
import { Observable } from "rxjs";
import style from "../../style/themes/default/meal.scss";
import {WeddingService} from "../../services/wedding.service";
import {RsvpService} from "../../services/rsvp.service";
import {WeddingDB} from "../../../../../both/models/wedding.model";

@Component({
    selector: "meal",
    host: {
        class: "reminder",
    },
    template,
    styles: [ style ]
})

export class MealComponent implements OnInit {
    @Output() currentComponent: EventEmitter<string> = new EventEmitter();

    rsvpData: Observable<any>;
    weddingData: Observable<WeddingDB[]>;

    guests: object[];
    meals: object[];
    activeGuest: object;
    guests_without_meals: object[];

    constructor(private _weddingService: WeddingService, private _rsvpService: RsvpService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.rsvpData = rsvp;
            this.guests = rsvp.guests;
            this.activeGuest = rsvp.guests[0];

            this.guests_without_meals = rsvp.guests.filter(function(guest){
                return !guest.meal;
            });
        });
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding =>{
            this.meals = wedding[0].meals;
        });
    }

    setMeal() {
        this._rsvpService.setRsvpData(this.rsvpData);

        const need_meals = this.guests_without_meals.length;

        if (need_meals > 0) {
            this.activeGuest = this.guests[need_meals];
        } else {
            this.currentComponent.emit('reminder');
        }
    }
}