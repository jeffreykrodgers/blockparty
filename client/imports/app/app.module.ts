import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {routes} from './app.routes';

import {EntryView} from "./content/views/entry/entry";
import {RsvpView} from "./content/views/rsvp/rsvp";

import {AppComponent} from "./app.component";
import {AnnouncementsComponent} from "./content/components/announcements/announcements";
import {FinishedComponent} from "./content/components/finished/finished";
import {GiftComponent} from "./content/components/gift/gift";
import {GuestComponent} from "./content/components/guest/guest";
import {MealComponent} from "./content/components/meal/meal";
import {PhotosComponent} from "./content/components/photos/photos";
import {ReminderComponent} from "./content/components/reminder/reminder";
import {SearchComponent} from "./content/components/search/search";
import {SummaryComponent} from "./content/components/summary/summary";
import {TopComponent} from "./content/components/top/top";
import {BottomComponent} from "./content/components/bottom/bottom";

import {AdminView} from "./admin/admin";
import {AdminContentView} from "./admin/views/adminContent/adminContent";
import {admin_TopComponent} from "./admin/views/adminContent/adminTop/adminTop";

import {admin_AreaComponent} from "./admin/components/area/area";
import {admin_ChartComponent} from "./admin/components/chart/chart";
import {admin_GuestComponent} from "./admin/components/guest/guest";
import {admin_MealComponent} from "./admin/components/meal/meal";
import {admin_TableComponent} from "./admin/components/table/table";
import {admin_VenueComponent} from "./admin/components/venue/venue";

import {WeddingService} from "./common/services/wedding.service";
import {RsvpService} from "./content/services/rsvp.service";

import {NgSemanticModule} from "ng-semantic";
import {MainPipe} from "./common/pipes/main-pipe.module";
import {ModalsView} from "./admin/components/modals/modals";
import {ChartModule} from "angular2-highcharts";
import {ContentView} from "./content/content";
import {ModalService} from "./admin/components/modals/modals.service";
import {GuestsView} from "./admin/views/guests/guests.view";
import {MealsView} from "./admin/views/meals/meals.view";
import {VenuesView} from "./admin/views/venues/venues.view";
import {AnnouncementsView} from "./admin/views/announcements/announcements.view";
import {admin_SidebarComponent} from "./admin/views/adminContent/adminSidebar/adminSidebar.component";
import {DashboardView} from "./admin/views/dashboard/dashboard.view";
import {UtilityService} from "./common/services/utils.services";
import {TablesView} from "./admin/views/tables/tables.view";

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        AppComponent,

        //Admin
        AdminView,
        AdminContentView,
        DashboardView,
        ModalsView,
        GuestsView,
        TablesView,
        MealsView,
        VenuesView,
        AnnouncementsView,

        //Admin Components
        admin_AreaComponent,
        admin_ChartComponent,
        admin_TopComponent,
        admin_GuestComponent,
        admin_MealComponent,
        admin_TableComponent,
        admin_VenueComponent,
        admin_SidebarComponent,

        //Content Views
        ContentView,
        RsvpView,
        EntryView,

        //Content Components
        AnnouncementsComponent,
        FinishedComponent,
        GiftComponent,
        GuestComponent,
        MealComponent,
        PhotosComponent,
        ReminderComponent,
        SearchComponent,
        SummaryComponent,
        TopComponent,
        BottomComponent,
    ],
    // Entry Components
    entryComponents: [
        AppComponent
    ],
    // Providers
    providers: [
        WeddingService,
        RsvpService,
        ModalService,
        UtilityService,
    ],
    // Modules
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        NgSemanticModule,
        MainPipe,
        ChartModule.forRoot(require('highcharts')),
    ],
    // Main Component
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}
