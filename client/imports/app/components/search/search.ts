import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { GuestService } from "../../services/guest.service";

import template from "./search.html";
import style from "../../style/themes/default/search.scss";

@Component({
    selector: "search",
    template,
    styles: [ style ],
    providers: [GuestService]
})

export class SearchComponent implements OnInit {
    @Output() currentComponent: EventEmitter<string> = new EventEmitter();
    guestName: string;
    findGuest: any;

    constructor(private guestService:GuestService) {

        this.findGuest = () => {
            if (this.guestName) {
                this.guestService.setGuestData({guestName: this.guestName});
                this.currentComponent.emit('guest');
            }
        }

    }

    ngOnInit() {

    }
}

// @Component({
//     selector: 'child-comp',
// (...)
// })
// export class ChildComponent {
//     @Output()
//     uploaded:EventEmitter<string> = new EventEmitter();
//
//     uploadComplete() {
//         this.uploaded.emit('complete');
//     }