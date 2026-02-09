export interface SendMessageRequest {
    receiverId: number;
    listingId: number;
    messageContent: string;
    senderNameSnapshot?: string;
    listingTitleSnapshot?: string;
}

export interface VendorMessageResponse {
    id: string;
    senderId: number;
    senderName: string;
    listingId: number;
    listingTitle: string;
    messageContent: string;
    createdAt: string;
}
