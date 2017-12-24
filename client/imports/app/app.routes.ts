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
import {SearchComponent} from "./content/components/search/search";
import {GuestComponent} from "./content/components/guest/guest";
import {MealComponent} from "./content/components/meal/meal";
import {ReminderComponent} from "./content/components/reminder/reminder";
import {GiftComponent} from "./content/components/gift/gift";
import {SummaryComponent} from "./content/components/summary/summary";
import {FinishedComponent} from "./content/components/finished/finished";
import {TablesView} from "./admin/views/tables/tables.view";
import {AuthView} from "./admin/views/auth/auth.view";


export const routes: Route[] = [
    {path: '', component: ContentView, children: [
        {path: '', component: EntryView},
        {path: 'rsvp', component: RsvpView, children: [
            {path: '', component: SearchComponent},
            {path: 'guests', component: GuestComponent},
            {path: 'meals', component: MealComponent},
            {path: 'reminders', component: ReminderComponent},
            {path: 'gifts', component: GiftComponent},
            {path: 'summary', component: SummaryComponent},
            {path: 'finished', component: FinishedComponent},
        ]}
    ]},

    {path: 'admin', component: AdminView, children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardView},
        {path: 'guests', component: GuestsView},
        {path: 'tables', component: TablesView},
        {path: 'venues', component: VenuesView},
        {path: 'meals', component: MealsView},
        {path: 'announcements', component: AnnouncementsView}
    ]},

    {path: 'login', component: AuthView}
];