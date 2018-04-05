import {Component, OnDestroy, OnInit} from "@angular/core";
import {RsvpService} from "../../services/rsvp.service";
import {Router} from "@angular/router";
import template from "./song.component.html";
import style from "../../style/themes/default/reminder.scss";

@Component({
    selector: 'song',
    template,
    styles: [style]
})
export class SongComponent implements OnInit, OnDestroy {
    rsvpData: any;
    newSong?: boolean;
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

            this.guests = rsvp.guests.filter(function (guest) {
                return guest.attending;
            });
        });
    }
    ngOnDestroy() {

    }
    submitSong() {
        this.links = this.rsvpData.links.filter(
            (link: any) => link.name === 'Lyft');

        this.rsvpData.song.invite = this.rsvpData.invitation_num;

        if (this.links.length === 0)
            this.rsvpData.links.push({name: 'Lyft', slug: '/rsvp/lyft'});

        console.log(this.rsvpData);

        this._rsvpService.setRsvpData(this.rsvpData, true, true);
        this._router.navigate(['/rsvp/lyft']);
    }
}