import client from '../api/client';

export interface StartConversationByListingRequest {
    listingId: number;
    vendorId: number;
    vendorName: string;
    listingTitle: string;
    listingImage?: string;
}

export interface Conversation {
    id: string;
    enquiryId?: number;
    listingId?: number;
    lastMessageAt: string;
    unreadCount: number;
    // For couples: vendor details
    vendorId?: number;
    vendorName?: string;
    vendorImage?: string;
    // For vendors: couple details
    coupleId?: number;
    coupleName?: string;
    coupleImage?: string;
    // Listing details (if conversation is listing-based)
    listingTitleSnapshot?: string;
    listingImageSnapshot?: string;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: number;
    content: string;
    timestamp: string;
    status: 'SENT' | 'DELIVERED' | 'READ';
}

export interface MessagePage {
    content: Message[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
}

const chatService = {
    /**
     * Start or get conversation for a listing
     */
    async startConversationByListing(
        request: StartConversationByListingRequest
    ): Promise<string> {
        const response = await client.post<string>('/api/chat/start-by-listing', request);
        return response.data;
    },

    /**
     * Get all conversations for current user
     */
    async getMyConversations(): Promise<Conversation[]> {
        const response = await client.get<Conversation[]>('/api/chat/conversations/me');
        return response.data;
    },

    /**
     * Get message history for a conversation
     */
    async getMessageHistory(
        conversationId: string,
        page: number = 0,
        size: number = 50
    ): Promise<MessagePage> {
        const response = await client.get<MessagePage>(
            `/api/chat/history/${conversationId}`,
            {
                params: { page, size },
            }
        );
        return response.data;
    },

    /**
     * Mark conversation as read
     */
    async markAsRead(conversationId: string): Promise<void> {
        await client.post(`/api/chat/read/${conversationId}`);
    },

    /**
     * Send a simple message to a vendor (REST-based)
     */
    async sendMessage(
        receiverId: number,
        listingId: number,
        messageContent: string,
        senderNameSnapshot?: string,
        listingTitleSnapshot?: string
    ): Promise<void> {
        await client.post('/api/chat/send', {
            receiverId,
            listingId,
            messageContent,
            senderNameSnapshot,
            listingTitleSnapshot
        });
    },

    /**
     * Get all messages for the authenticated vendor (REST-based)
     */
    async getVendorMessages(): Promise<any[]> {
        const response = await client.get('/api/chat/vendor/me');
        return response.data;
    },

    /**
     * Delete a message by ID (REST-based)
     */
    async deleteMessage(messageId: string): Promise<void> {
        await client.delete(`/api/chat/message/${messageId}`);
    },
};

export default chatService;
