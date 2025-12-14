package com.wedding.listingService.enums;

public enum ListingStatus {
    PENDING,   // Default state: waiting for Admin approval
    PUBLISHED, // Approved and visible to couples
    REJECTED,  // Denied by Admin
    ARCHIVED   // Hidden by the Vendor
}
