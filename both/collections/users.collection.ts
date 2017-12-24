import { MongoObservable } from "meteor-rxjs";

export const UserCollection = new MongoObservable.Collection("users-collection");
