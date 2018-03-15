import { Injectable } from '@angular/core';
import {Tracker} from "meteor/tracker";

@Injectable()
export class UserService {
    user: any;

    constructor() {
        // Tracker.autorun(() => {
        //     this.user = Meteor.user();
        // });
    }

    public getUser() {
        return Meteor.user();
    }

    public updateUser(id: string, obj: object) {

    }

    public deleteUser(type: string, obj:any) {

    }
}