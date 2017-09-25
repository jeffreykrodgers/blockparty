import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
// import {SuiModule} from 'ng2-semantic-ui';

import {routes} from './app.routes';

import {EntryComponent} from "./views/entry/entry";
import {RsvpComponent} from "./views/rsvp/rsvp";

import {AppComponent} from "./app.component";
import {AnnouncementsComponent} from "./components/announcements/announcements";
import {DemoComponent} from "./components/demo/demo.component";
import {GuestComponent} from "./components/guest/guest";
import {MealComponent} from "./components/meal/meal";
import {PhotosComponent} from "./components/photos/photos";
import {ReminderComponent} from "./components/reminder/reminder";
import {SearchComponent} from "./components/search/search";
import {TopComponent} from "./components/top/top";
import {BottomComponent} from "./components/bottom/bottom";

import {DemoDataService} from "./components/demo/demo-data.service";
import {WeddingService} from "./services/wedding.service";
import {RsvpService} from "./services/rsvp.service";


@NgModule({
    // Components, Pipes, Directive
    declarations: [
        AppComponent,
        AnnouncementsComponent,
        DemoComponent,
        EntryComponent,
        RsvpComponent,
        GuestComponent,
        MealComponent,
        PhotosComponent,
        ReminderComponent,
        SearchComponent,
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
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        //TODO Fix SuiModule
        // SuiModule
    ],
    // Main Component
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}
