import {Route} from '@angular/router';

import {EntryView} from './content/views/entry/entry';
import {RsvpView} from './content/views/rsvp/rsvp';
import {AdminView} from "./admin/admin";
import {ContentView} from "./content/content";


export const routes: Route[] = [
    {path: '', component: ContentView, children: [
        {path: '', component: EntryView},
        {path: 'rsvp', component: RsvpView}
    ]},
    {path: 'admin', component: AdminView},
];