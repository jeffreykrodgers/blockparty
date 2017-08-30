
interface Wedding {
    _id?: string;
    date: any;
    spouses: Spouse[];
    venues: Venue[];
    meals: Meal[];
    announcements: Announcement[];
    guests: Guest[];
}

interface Spouse {
    _id?: string;
    first_name: String;
    last_name: String;
    email: String;
    password: String;
    services: any;
}

interface Venue {
    _id?: string;
    name: string;
    address: string;
    event: string;
    start_time: any;
    end_time: any;
}

interface Meal{
    _id?: string;
    name: string;
    notes: string;
}

interface Announcement {
    _id?: string;
    date: any;
    title: string;
    announcement: string;
}

interface Guest {
    _id?: string;
    guest_name: string;
    meal: string;
    reminder: Reminder;
    additions: Additions;
}

interface Reminder {
    date: any;
    test: string;
}

interface Additions {
    count: number;
    details: Details;
}

interface Details {
    _id?: string;
    name: string;
    meal: string;
}

export type WeddingDB = Wedding;