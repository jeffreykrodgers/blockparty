import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
// import {SuiModule} from 'ng2-semantic-ui';

import {routes} from './app.routes';

import {EntryComponent} from "./views/entry/entry";
import {RsvpComponent} from "./views/rsvp/rsvp";

import {AppComponent} from "./app.component";
import {DemoComponent} from "./components/demo/demo.component";
import {GuestComponent} from "./components/guest/guest";
import {MealComponent} from "./components/meal/meal";
import {PhotosComponent} from "./components/photos/photos";
import {ReminderComponent} from "./components/reminder/reminder";
import {SearchComponent} from "./components/search/search";

import {DemoDataService} from "./components/demo/demo-data.service";

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        AppComponent,
        DemoComponent,
        EntryComponent,
        RsvpComponent,
        GuestComponent,
        MealComponent,
        PhotosComponent,
        ReminderComponent,
        SearchComponent,
    ],
    // Entry Components
    entryComponents: [
        AppComponent
    ],
    // Providers
    providers: [
        DemoDataService
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
