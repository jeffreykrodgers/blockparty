import {Component, NgZone, OnInit} from "@angular/core";
import template from "./auth.view.html";
import style from "./auth.view.scss";
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {Router} from "@angular/router";

@Component({
    selector: "auth",
    host: {
        class: 'auth',
    },
    template,
    styles: [ style ]
})

export class AuthView implements OnInit {
    open: boolean;
    user: any;
    registering: boolean;
    errs: any;

    constructor(private router: Router,
                private zone: NgZone) {
        this.user = {};
    }

    ngOnInit() {
        if (Meteor.userId()) {
            this.router.navigate(['/admin']);
        }
    };

    login(type) {
        switch (type) {
            case 'password':
                Meteor.loginWithPassword(this.user.email, this.user.password, (err) => {
                    if (err) {console.error(err.reason)} else {
                        this.zone.run(() => {
                            this.router.navigate(['/admin']);
                        });
                    };
                });
                break;
            case 'facebook':
                console.log('Facebook oAuth Currently Disabled. Sarry!');

                //TODO add facebook oauth

                break;
            case 'google':
                console.log('Google oAuth Currently Disabled. Sarry!');

                //TODO add google oauth

                break;
        }
    };

    register() {

        if (this.user.password === this.user.pass_conf) {
            Accounts.createUser({
                username: this.user.email,
                email: this.user.email,
                password: this.user.password,
            }, () => {
                this.registering = false;
            });
        }

    };
}