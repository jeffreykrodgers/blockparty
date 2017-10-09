import { Route } from '@angular/router';

import { EntryComponent } from './views/entry/entry';
import { RsvpComponent } from './views/rsvp/rsvp';
import {AdminComponent} from "./views/admin/admin";


export const routes: Route[] = [
    { path: '', component: EntryComponent },
    { path: 'rsvp', component: RsvpComponent},
    { path: 'admin', component: AdminComponent},
];