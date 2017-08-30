import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {DemoComponent} from "./demo/demo.component";
import {EntryComponent} from "./entry/entry";
import {GuestComponent} from "./guest/guest";
import {MealComponent} from "./meal/meal";
import {PhotosComponent} from "./photos/photos";
import {ReminderComponent} from "./reminder/reminder";
import {SearchComponent} from "./search/search";

import {DemoDataService} from "./demo/demo-data.service";

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        AppComponent,
        DemoComponent,
        EntryComponent,
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
        BrowserModule
    ],
    // Main Component
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}
