import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {routes} from './app.routes';

import {EntryComponent} from "./views/entry/entry";
import {RsvpComponent} from "./views/rsvp/rsvp";

import {AppComponent} from "./app.component";
import {AnnouncementsComponent} from "./components/announcements/announcements";
import {DemoComponent} from "./components/demo/demo.component";
import {FinishedComponent} from "./components/finished/finished";
import {GiftComponent} from "./components/gift/gift";
import {GuestComponent} from "./components/guest/guest";
import {MealComponent} from "./components/meal/meal";
import {PhotosComponent} from "./components/photos/photos";
import {ReminderComponent} from "./components/reminder/reminder";
import {SearchComponent} from "./components/search/search";
import {SummaryComponent} from "./components/summary/summary";
import {TopComponent} from "./components/top/top";
import {BottomComponent} from "./components/bottom/bottom";


import {DemoDataService} from "./components/demo/demo-data.service";
import {WeddingService} from "./services/wedding.service";
import {RsvpService} from "./services/rsvp.service";

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule, MatOptionModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
} from '@angular/material';
import {AdminComponent} from "./views/admin/admin";
import {AdminContentComponent} from "./views/admin/adminContent/adminContent";
import {AdminTopComponent} from "./views/admin/adminTop/adminTop";


@NgModule({
    // Components, Pipes, Directive
    declarations: [
        AppComponent,

        //Admin
        AdminComponent,
        AdminTopComponent,
        AdminContentComponent,
        AnnouncementsComponent,
        DemoComponent,
        EntryComponent,
        GiftComponent,
        RsvpComponent,
        FinishedComponent,
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

        //TODO Fix SuiModule
        // SuiModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatNativeDateModule,
        MatOptionModule
    ],
    // Main Component
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}
