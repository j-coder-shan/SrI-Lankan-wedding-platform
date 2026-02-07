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
}

export interface EnquiryRequest {
    listingId: number;
    vendorId: number;
    coupleId: number;
    eventDate: string;
    guestCount: number;
    message?: string;
    // We can also send couple's name/email/phone as metadata if not strictly from user table
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
}
