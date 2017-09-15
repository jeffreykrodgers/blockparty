import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';

import template from "./search.html";
import style from "../../style/themes/default/search.scss";
import {GuestService} from "../../services/guest.service";

@Component({
    selector: "search",
    host: {
      class: "search"
    },
    template,
    styles: [ style ],
})

export class SearchComponent implements OnInit {
    @Output() currentComponent: EventEmitter<string> = new EventEmitter();
    @Output() currentGuestName: EventEmitter<string> = new EventEmitter();
    invitationNumber: number;
    guestName: string;
    findGuest: any;

    constructor(private guestService: GuestService) {

        this.findGuest = () => {
            //Check if model has invitationNumber
            //  Find a guest with a matching invitation number
            // If found, return guest Name and store guest in guestService
            // If not, return error saying guest not found. Maybe search by name?
            if (this.invitationNumber) {




                this.guestName = 'Keith';
                this.guestService.setGuestData({guestName: this.guestName});
                this.currentGuestName.emit(this.guestName);
                this.currentComponent.emit('guest');
            }
        }
    }

    ngOnInit() {

    }
}