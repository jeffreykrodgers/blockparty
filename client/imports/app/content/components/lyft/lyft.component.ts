import {Component, OnDestroy, OnInit} from "@angular/core";
import {RsvpService} from "../../services/rsvp.service";
import {Router} from "@angular/router";
import template from "./lyft.component.html";
import style from "../../style/themes/default/reminder.scss";

@Component({
    selector: 'lyft',
    template,
    styles: [style]
})
export class LyftComponent implements OnInit, OnDestroy {
    rsvpData: any;
    lyftGuest?: string;
    guests?: any;
    links?: object[];

    constructor(private _rsvpService: RsvpService,
                private _router: Router) {

    }
    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.rsvpData = rsvp;

            if (!rsvp.links) this.rsvpData.links = [];

            if (!this.rsvpData.invitation_num)
                this._router.navigate(['/rsvp']);

            this.lyftGuest = rsvp.guests.filter(function (guest) {
                return guest.lyft;
            })[0];
        });
    }
    ngOnDestroy() {}
    submitLyft() {
        this.links = this.rsvpData.links.filter(
            (link: any) => link.name === 'Registries');

        if (this.links.length === 0)
            this.rsvpData.links.push({name: 'Registries', slug: '/rsvp/registries'});

        this._rsvpService.setRsvpData(this.rsvpData, true);
        this._router.navigate(['/rsvp/registries']);
    }

}