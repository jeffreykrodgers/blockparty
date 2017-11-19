import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import template from "./meal.html";
import {Observable} from "rxjs";
import style from "../../style/themes/default/meal.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {RsvpService} from "../../services/rsvp.service";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {Router} from "@angular/router";

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
    // guests_without_meals: object[];

    constructor(private _weddingService: WeddingService,
                private _rsvpService: RsvpService,
                private _router: Router) {
        this.weddingData = this._weddingService.getWedding({}).zone();
    }

    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.rsvpData = rsvp;

            if (!this.rsvpData.invitation_num)
                this._router.navigate(['/rsvp']);

            this.guests = rsvp.guests.filter((guest:any) => guest.attending);
            this.activeGuest = this.guests[0];
            // this.guests_without_meals = rsvp.guests.filter(function (guest) {
            //     return !guest.meal && guest.attending;
            // });
        });

        this.weddingData.subscribe(wedding => {
            this.meals = wedding[0].meals;
        });
    }

    setMeal() {
        // this.guests_without_meals = this.guests.filter((guest:any) => {
        //    return !guest.meal && guest.attending;
        // });
        //
        // const need_meals = this.guests_without_meals.length;

        const guest_count = this.guests.length;
        const guest_index = this.guests.indexOf(this.activeGuest);

        console.log("Count:", guest_count);
        console.log("Index:", guest_index);

        if (guest_index < guest_count - 1) {
            this.activeGuest = this.guests[guest_index + 1];
        } else {
            this._rsvpService.setRsvpData(this.rsvpData, true);
            this._router.navigate(['/rsvp/reminders']);
        }
    }
}