import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import template from "./guest.html";
import style from "../../style/themes/default/guest.scss";
import {RsvpService} from "../../services/rsvp.service";
import {Router} from "@angular/router";

declare let $: any;

@Component({
    selector: "guest",
    template,
    styles: [style],
})

export class GuestComponent implements OnInit {
    rsvpData: any;
    links: object[];
    editing: boolean;
    beingEdited: any;

    constructor(private _rsvpService: RsvpService,
                private _router: Router) {

    }

    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe((rsvp) => {
            this.rsvpData = rsvp;

            if (!rsvp.links) this.rsvpData.links = [];

            if (!this.rsvpData.invitation_num)
                this._router.navigate(['/rsvp']);
        });
    }

    ngAfterViewInit() {
        $('.ui.checkbox').checkbox();
    };

    editName(guest) {
        this.editing = true;
        this.beingEdited = guest._id;
    }

    saveGuest() {
        this.editing = false;
        this.beingEdited = false;
    }

    setGuests() {
        this.links = this.rsvpData.links.filter(
            (link: any) => link.name === 'Meals');

        if (this.links.length === 0)
            this.rsvpData.links.push({name: 'Meals', slug: '/rsvp/meals'});

        this._rsvpService.setRsvpData(this.rsvpData, true);
        this._router.navigate(['/rsvp/meals']);
    }
}