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
export class LyftComponent implements OnInit {
    rsvpData: any;
    lyftGuest?: any;
    guests?: any;
    links?: object[];

    constructor(private _rsvpService: RsvpService,
                private _router: Router) {
        this.lyftGuest = {};
    }
    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.rsvpData = rsvp;

            if (!rsvp.links) this.rsvpData.links = [];

            if (!this.rsvpData.invitation_num)
                this._router.navigate(['/rsvp']);

            this.guests = rsvp.guests;
            this.lyftGuest.guest = rsvp.guests.find(guest => guest.lyft)._id;
        });
    }

    submitLyft() {
        let guest = this.rsvpData.guests.find(guest => guest._id === this.lyftGuest.guest);
        let i = this.rsvpData.guests.indexOf(guest);
        this.rsvpData.guests.forEach(guest => guest.lyft = false);
        this.rsvpData.guests[i].lyft = true;

        this.links = this.rsvpData.links.filter(
            (link: any) => link.name === 'Registries');

        if (this.links.length === 0)
            this.rsvpData.links.push({name: 'Registries', slug: '/rsvp/registries'});

        this._rsvpService.setRsvpData(this.rsvpData, true);
        this._router.navigate(['/rsvp/registries']);
    }

}