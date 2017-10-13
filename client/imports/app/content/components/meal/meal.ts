import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import template from "./meal.html";
import {Observable} from "rxjs";
import style from "../../style/themes/default/meal.scss";
import {WeddingService} from "../../../services/wedding.service";
import {RsvpService} from "../../../services/rsvp.service";
import {WeddingDB} from "../../../../../../both/models/wedding.model";

@Component({
    selector: "meal",
    host: {
        class: "reminder",
    },
    template,
    styles: [style]
})

export class MealComponent implements OnInit {
    rsvpData: any;
    weddingData: Observable<WeddingDB[]>;

    guests: object[];
    meals: object[];
    activeGuest: object;
    guests_without_meals: object[];

    constructor(private _weddingService: WeddingService, private _rsvpService: RsvpService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
    }

    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.rsvpData = rsvp;
            this.guests = rsvp.guests;
            this.activeGuest = rsvp.guests[0];
            this.guests_without_meals = rsvp.guests.filter(function (guest) {
                return !guest.meal;
            });
        });

        this.weddingData.subscribe(wedding => {
            this.meals = wedding[0].meals;
        });
    }

    setMeal() {
        this.guests_without_meals = this.guests.filter((guest:any) => {
           return !guest.meal;
        });

        const need_meals = this.guests_without_meals.length;

        if (need_meals > 0) {
            this.activeGuest = this.guests[need_meals];
        } else {
            this.rsvpData.current_component = {
                name: 'reminder',
                title: 'Set a Reminder'
            };
            this._rsvpService.setRsvpData(this.rsvpData, true);
        }


    }
}