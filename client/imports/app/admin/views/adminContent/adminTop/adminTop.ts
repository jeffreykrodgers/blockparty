import {Component, OnInit} from "@angular/core";
import template from "./adminTop.html";
import style from "./adminTop.scss";
import {WeddingService} from "../../../../common/services/wedding.service";

import {UserService} from "../../../../common/services/user.service";
import {Meteor} from "meteor/meteor";
import {Tracker} from "meteor/tracker";

@Component({
    selector: "adminTop",
    host: {
        class: 'adminTop',
    },
    template,
    styles: [style]
})

export class admin_TopComponent implements OnInit {
    weddingData: any;
    user: any;

    constructor(private _weddingService: WeddingService,
                private _userService: UserService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.user = {};
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.weddingData = wedding[0];
        });

        Tracker.autorun(() => {
            let user = this._userService.getUser();
            this.user.profile = user ? user.profile : {};
        });
    };

    initials() {
        const f = this.user.profile.first_name;
        const l = this.user.profile.last_name;

        return (f && l) ? f[0].toUpperCase() + l[0].toUpperCase() : 'AU';
    };

}