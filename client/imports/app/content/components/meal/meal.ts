import {Component, OnInit, Output, EventEmitter, ElementRef, ViewChild} from "@angular/core";
import template from "./meal.html";
import {Observable} from "rxjs";
import style from "../../style/themes/default/meal.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {RsvpService} from "../../services/rsvp.service";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {Router} from "@angular/router";
import {FilterPipe} from "../../../common/pipes/filter.pipe";

declare let $: any;

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
    meals?: object[];
    activeGuest: any;
    links: object[];
    uploads: any;
    dietary: boolean;

    constructor(private _weddingService: WeddingService,
                private _rsvpService: RsvpService,
                private _router: Router,
                private _filterPipe: FilterPipe,
                private element: ElementRef) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.dietary = false;
    }

    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.rsvpData = rsvp;

            if (!rsvp.links) this.rsvpData.links = [];
            if (!this.rsvpData.invitation_num) this._router.navigate(['/rsvp']);

            this.guests = rsvp.guests.filter((guest:any) => guest.attending);
        });

        if (this.guests.length > 0) {
            this.activeGuest = this.guests[0];
        } else {
            this.activeGuest = {};
            this.rsvpData.links = [
                {name: 'Guests', slug: '/rsvp/guests'},
                {name: 'Summary', slug: '/rsvp/summary'}
            ];
            this._rsvpService.setRsvpData(this.rsvpData, false);
            this._router.navigate(['/rsvp/summary']);
        }

        this.subscribeWedding();

        console.log(this.activeGuest);
    }

    resetDietary() {
        Meteor.setTimeout(() => {
            if (this.activeGuest.meal) {
                this.dietary = false;
            }
        }, 800);
    }

    setMeal() {
        const guest_count = this.guests.length;
        const guest_index = this.guests.indexOf(this.activeGuest);

        if (guest_index < guest_count - 1) {
            this.activeGuest = this.guests[guest_index + 1];
            this.subscribeWedding();
            $('.content').animate({ scrollTop: $(".content").offset().top }, 300);
        } else {
            this.links = this.rsvpData.links.filter(
                (link:any) => link.name === 'Reminders');

            if (this.links.length === 0)
                this.rsvpData.links.push({name: 'Reminders', slug: '/rsvp/reminders'});

            this._rsvpService.setRsvpData(this.rsvpData, true);
            this._router.navigate(['/rsvp/reminders']);
        }
    }

    mealImage(meal) {
        let upload = this.uploads.filter((upload) => upload._id === meal.image);
        return upload[0].path;
    }

    toggleDietary() {
        console.log("Dietary", this.dietary);
        this.activeGuest.meal = "";
        this.dietary = !this.dietary;
    }

    subscribeWedding() {
        this.weddingData.subscribe(wedding => {
            if (this.activeGuest.child) {
                console.log('Dis a child');
                this.meals = this._filterPipe.transformMeal(wedding[0].meals, [{'kids': true}]);
            } else {
                console.log('Dis not a child');
                this.meals = this._filterPipe.transformMeal(wedding[0].meals, [{'kids': false}]);
            }
            this.uploads = wedding[0].uploads;
        });
    }
}