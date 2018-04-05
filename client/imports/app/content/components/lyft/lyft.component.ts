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

            if (rsvp.guests) {
                this.guests = rsvp.guests;
                let lyftArray = this.guests.filter(guest => guest.lyft);
                this.lyftGuest.guest = lyftArray[0] ? lyftArray[0]._id : {};
               // console.log(this.guests.filter(guest => guest.lyft));
            }
        });
    }

    submitLyft() {
        let guest = this.rsvpData.guests.find(guest => guest._id === this.lyftGuest.guest);
        let i = this.rsvpData.guests.indexOf(guest);

        if (i && this.rsvpData.guests[i]) {
            this.rsvpData.guests.forEach(guest => guest.lyft = false);
            this.rsvpData.guests[i].lyft = true;
        }

        this.links = this.rsvpData.links.filter(
            (link: any) => link.name === 'Registries');

        if (this.links.length === 0)
            this.rsvpData.links.push({name: 'Registries', slug: '/rsvp/registries'});

        this._rsvpService.setRsvpData(this.rsvpData, true);
        this._router.navigate(['/rsvp/registries']);
    }

}