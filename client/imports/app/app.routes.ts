import {Route} from '@angular/router';

import {EntryView} from './content/views/entry/entry';
import {RsvpView} from './content/views/rsvp/rsvp';
import {AdminView} from "./admin/admin";
import {ContentView} from "./content/content";
import {GuestsView} from "./admin/views/guests/guests.view";
import {VenuesView} from "./admin/views/venues/venues.view";
import {MealsView} from "./admin/views/meals/meals.view";
import {AnnouncementsView} from "./admin/views/announcements/announcements.view";
import {DashboardView} from "./admin/views/dashboard/dashboard.view";


export const routes: Route[] = [
    {path: '', component: ContentView, children: [
        {path: '', component: EntryView},
        {path: 'rsvp', component: RsvpView}
    ]},
    {path: 'admin', component: AdminView, children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardView},
        {path: 'guests', component: GuestsView},
        {path: 'venues', component: VenuesView},
        {path: 'meals', component: MealsView},
        {path: 'announcements', component: AnnouncementsView}
    ]},
];