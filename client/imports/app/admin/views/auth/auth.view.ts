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
    error: any;
    registering: boolean;
    errs: any;

    constructor(private router: Router,
                private zone: NgZone) {
        this.user = {profile: {}};
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
                    if (err) {this.error = err;} else {
                        this.zone.run(() => {
                            this.error = false;
                            this.router.navigate(['/admin']);
                        });
                    };
                });
                break;
            case 'facebook':
                this.error = 'Facebook oAuth Currently Disabled. Sarry!';

                //TODO add facebook oauth

                break;
            case 'google':
                this.error = 'Google oAuth Currently Disabled. Sarry!';

                //TODO add google oauth

                break;
        }
    };

    register() {
        if (Meteor.settings.registration_enabled) {
            if (this.user.password === this.user.pass_conf) {
                Accounts.createUser({
                    username: this.user.email,
                    email: this.user.email,
                    password: this.user.password,
                    profile: this.user.profile,
                }, () => {
                    this.registering = false;
                });
            }

            this.user = {profile:{}};
            this.registering = false;
        } else {
            this.error = 'Registration Disabled'
        }
    };

    toggleMode() {
        this.error = false;
        this.registering = !this.registering;
    }
}