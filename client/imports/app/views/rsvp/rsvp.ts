import { Component, OnInit } from "@angular/core";
import template from "./rsvp.html";
import style from "../../style/themes/default/rsvp.scss";
import {SearchComponent} from "../../components/search/search";

@Component({
    selector: "rsvp",
    template,
    styles: [ style ],
})

export class RsvpComponent implements OnInit {
    rsvp: any;
    currentComponent: any;

    constructor() {

    }

    ngOnInit() {
        this.currentComponent = 'search';
    };

    setCurrentComponent(component) {
        this.currentComponent = component;
    }
}


// @Component({
//     template `
//     <child-comp (uploaded)="someMethod($event)"></child-comp>
//   `,
//     directives: [ ChildComponent ]
// })
// export class ParentComponent {
// (...)
//
//     someMethod(event) {
//     }
// }