import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Message } from './chatService';

type MessageCallback = (message: Message) => void;

class WebSocketService {
    private client: Client | null = null;
    private subscriptions: Map<string, StompSubscription> = new Map();
    private messageCallbacks: MessageCallback[] = [];
    private isConnecting = false;
    private isConnected = false;

    /**
     * Connect to WebSocket server
     */
    connect(userId: number): Promise<void> {
        if (this.isConnected || this.isConnecting) {
            console.log('WebSocket already connected or connecting');
            return Promise.resolve();
        }

        this.isConnecting = true;

        return new Promise((resolve, reject) => {
            try {
                // Create SockJS connection
                const socket = new SockJS('http://localhost:8088/ws');

                // Create STOMP client
                this.client = new Client({
                    webSocketFactory: () => socket as any,
                    debug: (str) => {
                        console.log('[STOMP Debug]', str);
                    },
                    reconnectDelay: 5000,
                    heartbeatIncoming: 4000,
                    heartbeatOutgoing: 4000,
                });

                // Connection success
                this.client.onConnect = () => {
                    console.log('WebSocket connected');
                    this.isConnected = true;
                    this.isConnecting = false;

                    // Subscribe to user's personal message queue
                    this.subscribeToMessages(userId);

                    resolve();
                };

                // Connection error
                this.client.onStompError = (frame) => {
                    console.error('STOMP error:', frame);
                    this.isConnecting = false;
                    reject(new Error('WebSocket connection failed'));
                };

                // Connection closed
                this.client.onWebSocketClose = () => {
                    console.log('WebSocket connection closed');
                    this.isConnected = false;
                };

                // Activate connection
                this.client.activate();
            } catch (error) {
                console.error('WebSocket connection error:', error);
                this.isConnecting = false;
                reject(error);
            }
        });
    }

    /**
     * Subscribe to incoming messages
     */
    private subscribeToMessages(userId: number): void {
        if (!this.client || !this.isConnected) {
            console.error('Cannot subscribe: WebSocket not connected');
            return;
        }

        const destination = `/user/queue/messages`;

        const subscription = this.client.subscribe(destination, (message: IMessage) => {
            try {
                const receivedMessage: Message = JSON.parse(message.body);
                console.log('Received message:', receivedMessage);

                // Notify all registered callbacks
                this.messageCallbacks.forEach((callback) => callback(receivedMessage));
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });

        this.subscriptions.set('messages', subscription);
        console.log(`Subscribed to ${destination}`);
    }

    /**
     * Send a message
     */
    sendMessage(conversationId: string, content: string): void {
        if (!this.client || !this.isConnected) {
            console.error('Cannot send message: WebSocket not connected');
            throw new Error('WebSocket not connected');
        }

        const messagePayload = {
            conversationId,
            content,
        };

        this.client.publish({
            destination: '/app/chat.send',
            body: JSON.stringify(messagePayload),
        });

        console.log('Message sent:', messagePayload);
    }

    /**
     * Register callback for incoming messages
     */
    onMessage(callback: MessageCallback): () => void {
        this.messageCallbacks.push(callback);

        // Return unsubscribe function
        return () => {
            const index = this.messageCallbacks.indexOf(callback);
            if (index > -1) {
                this.messageCallbacks.splice(index, 1);
            }
        };
    }

    /**
     * Disconnect from WebSocket
     */
    disconnect(): void {
        if (this.client) {
            // Unsubscribe from all subscriptions
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
            this.subscriptions.clear();

            // Deactivate client
            this.client.deactivate();
            this.client = null;
            this.isConnected = false;
            this.isConnecting = false;

            console.log('WebSocket disconnected');
        }
    }

    /**
     * Check if connected
     */
    get connected(): boolean {
        return this.isConnected;
    }
}

// Export singleton instance
const websocketService = new WebSocketService();
export default websocketService;
