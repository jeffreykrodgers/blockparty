import {Component, Input, OnInit} from "@angular/core";
import template from "./meal.html";
import style from "./meal.scss";
import {ModalService} from "../../views/modals/modals.service";
import {WeddingService} from "../../../services/wedding.service";

@Component({
    selector: "meal-card",
    host: {
        class: 'meal card',
    },
    template,
    styles: [style],
})

export class admin_MealComponent implements OnInit {
    @Input() meal: any;

    constructor(private _modalService: ModalService,
                private _weddingService: WeddingService) {

    }

    ngOnInit() {
                                                                            
    }
}