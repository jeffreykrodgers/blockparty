
interface Wedding {
    _id?: string;
    date: any;
    theme: any;
    spouses: Spouse[];
    venues?: Venue[];
    meals?: Meal[];
    announcements?: Announcement[];
    guests?: Guest[];
    tables?: Table[];
}

interface Spouse {
    _id?: string;
    first_name: String;
    last_name: String;
    title: String;
    email?: String;
    password?: String;
    services?: any;
}

interface Venue {
    _id?: string;
    name: string;
    address: {
        street: string,
        city: string,
        state: string,
        zip: string,
    };
    event: string;
    start_time: any;
    end_time: any;
}

interface Meal {
    _id?: string;
    name: string;
    notes?: string;
}

interface Announcement {
    _id?: string;
    date: any;
    title: string;
    announcement: string;
}

interface Table {
    _id?: string;
    number: number;
    notes?: string;
    seats: number;
    guests: string[];
}

interface Guest {
    _id?: string;
    name: string;
    email?: string;
    invitation_num: number;
    attending?: boolean;
    complete?: boolean;
    secondary: boolean;
    meal?: string;
    relation?: string;
    party?: string;
    reminder?: number;
    gift?: number;
    table?: number;
}

export type WeddingDB = Wedding;