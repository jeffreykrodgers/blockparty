import {Component, OnInit} from "@angular/core";
import {RsvpService} from "../../services/rsvp.service";
import {Router} from "@angular/router";
import template from "./reminder.html";
import style from "../../style/themes/default/reminder.scss";

@Component({
    selector: "reminder",
    host: {
        class: "reminder",
    },
    template,
    styles: [style]
})

export class ReminderComponent implements OnInit {
    rsvpData: any;
    guests?: object[];
    reminders?: object[];
    links?: object[];

    constructor(private _rsvpService: RsvpService,
                private _router: Router) {
        this.reminders = [];
        this.guests = [];
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

            this.guests.forEach((guest: any) => {
                if (guest.reminders) {
                    guest.reminders.forEach((reminder) => {
                        reminder.guest = guest._id;
                    });
                    this.reminders.push(...guest.reminders);
                }
            });
        });
    }

    addReminder() {
        this.reminders.push({});
    }

    removeReminder(reminder) {
        let i = this.reminders.indexOf(reminder);
        this.reminders.splice(i, 1);
    }

    setReminder() {
        this.guests.forEach((guest:any) => {
            guest.reminders = [];
            this.reminders.forEach((reminder?: any) => {
                if (guest._id === reminder.guest) {
                    guest.reminders.push({
                        time: reminder.time,
                        email: reminder.email,
                    })
                }
            });
        });


        this.links = this.rsvpData.links.filter(
            (link: any) => link.name === 'Registries');

        if (this.links.length === 0)
            this.rsvpData.links.push({name: 'Registries', slug: '/rsvp/registries'});

        this._rsvpService.setRsvpData(this.rsvpData, true);
        this._router.navigate(['/rsvp/registries']);

    }
}