export interface Enquiry {
    id: number;
    listingId: number;
    vendorId: number;
    coupleId: number;
    eventDate: string; // ISO
    guestCount: number;
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'BOOKED';
    finalPrice?: number;
    message?: string;
    // Snapshots
    coupleNameSnapshot?: string;
    coupleEmailSnapshot?: string;
    couplePhoneSnapshot?: string;
    listingTitleSnapshot?: string;
}

export interface EnquiryRequest {
    listingId: number;
    vendorId: number;
    coupleId: number;
    eventDate: string;
    guestCount: number;
    message?: string;
    // Snapshots to ensure backend saves them
    coupleNameSnapshot?: string;
    coupleEmailSnapshot?: string;
    couplePhoneSnapshot?: string;
    listingTitleSnapshot?: string;
}
