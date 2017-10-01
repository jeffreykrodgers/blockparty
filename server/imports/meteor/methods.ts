import {WeddingCollection} from "../../../both/collections/wedding.collection";
import {check} from "meteor/check";
import {Meteor} from "meteor/meteor";

Meteor.methods({

    setGuests: (weddingId: string, guestData: object[]) => {
        check(weddingId, String);
        check(guestData, Array);


    },

    setMeals: (weddingId: string, mealData: object[]) => {
        check(weddingId, String);
        check(mealData, Array);

    },

    updateWedding: (weddingId:string, weddingData:object) => {
        check(weddingId, String);
        check(weddingData, Object);

        WeddingCollection.collection.update(weddingId, {$set: weddingData});
    },

    updateGuests: (weddingId: string, guestData: object[]) => {
        check(weddingId, String);
        check(guestData, Array);

        guestData.forEach((guest?: any) =>{
            WeddingCollection.collection.update({_id: weddingId, "guests._id": guest._id}, {$set: {"guests.$": guest}});
        });

    },

    testMethods: (testMessage: string) => {
        console.log(testMessage);
    }
});