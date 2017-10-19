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
import {DemoComponent} from "./content/components/demo/demo.component";
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
import {AdminTopView} from "./admin/views/adminTop/adminTop";

import {admin_AreaComponent} from "./admin/components/area/area";
import {admin_ChartComponent} from "./admin/components/chart/chart";
import {admin_GuestComponent} from "./admin/components/guest/guest";
import {admin_MealComponent} from "./admin/components/meal/meal";
import {admin_TableComponent} from "./admin/components/table/table";
import {admin_VenueComponent} from "./admin/components/venue/venue";

import {DemoDataService} from "./content/components/demo/demo-data.service";
import {WeddingService} from "./services/wedding.service";
import {RsvpService} from "./services/rsvp.service";

import {NgSemanticModule} from "ng-semantic";
import {MainPipe} from "./pipes/main-pipe.module";
import {ModalsView} from "./admin/views/modals/modals";


@NgModule({
    // Components, Pipes, Directive
    declarations: [
        AppComponent,

        //Admin
        AdminView,
        AdminTopView,
        AdminContentView,
        ModalsView,

        //Admin Components
        admin_AreaComponent,
        admin_ChartComponent,
        admin_GuestComponent,
        admin_MealComponent,
        admin_TableComponent,
        admin_VenueComponent,

        //Content Views
        RsvpView,
        EntryView,

        //Content Components
        AnnouncementsComponent,
        DemoComponent,
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
        DemoDataService,
        WeddingService,
        RsvpService
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
    ],
    // Main Component
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}
