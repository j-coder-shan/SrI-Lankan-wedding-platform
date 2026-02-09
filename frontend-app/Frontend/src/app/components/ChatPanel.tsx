import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import chatService, { Message } from '../services/chatService';
import websocketService from '../services/websocketService';
import { toast } from 'sonner';

interface ChatPanelProps {
    conversationId: string;
    listingTitle?: string;
    listingImage?: string;
    vendorName?: string;
    onClose: () => void;
}

export function ChatPanel({
    conversationId,
    listingTitle,
    listingImage,
    vendorName,
    onClose,
}: ChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const currentUserId = Number(localStorage.getItem('userId'));

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Load message history
    useEffect(() => {
        const loadMessages = async () => {
            try {
                setIsLoading(true);
                const response = await chatService.getMessageHistory(conversationId);
                // Reverse to show oldest first
                setMessages(response.content.reverse());

                // Mark as read
                await chatService.markAsRead(conversationId);
            } catch (error) {
                console.error('Error loading messages:', error);
                toast.error('Failed to load messages');
            } finally {
                setIsLoading(false);
            }
        };

        loadMessages();
    }, [conversationId]);

    // Subscribe to real-time messages
    useEffect(() => {
        const unsubscribe = websocketService.onMessage((message: Message) => {
            if (message.conversationId === conversationId) {
                setMessages((prev) => [...prev, message]);
                scrollToBottom();

                // Mark as read if panel is open
                chatService.markAsRead(conversationId).catch(console.error);
            }
        });

        return () => unsubscribe();
    }, [conversationId]);

    // Auto-scroll on new messages
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Send message
    const handleSend = async () => {
        if (!newMessage.trim() || isSending) return;

        try {
            setIsSending(true);

            // Send via WebSocket
            websocketService.sendMessage(conversationId, newMessage.trim());

            // Add optimistic message to UI
            const optimisticMessage: Message = {
                id: `temp-${Date.now()}`,
                conversationId,
                senderId: currentUserId,
                content: newMessage.trim(),
                timestamp: new Date().toISOString(),
                status: 'SENT',
            };

            setMessages((prev) => [...prev, optimisticMessage]);
            setNewMessage('');
            scrollToBottom();
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message');
        } finally {
            setIsSending(false);
        }
    };

    // Handle Enter key
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold">{vendorName || 'Chat'}</h3>
                    {listingTitle && (
                        <p className="text-xs text-rose-100 truncate">{listingTitle}</p>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white hover:bg-white/20"
                >
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Listing Preview (if available) */}
            {listingImage && listingTitle && (
                <div className="bg-gray-50 p-3 border-b flex items-center gap-3">
                    <img
                        src={listingImage}
                        alt={listingTitle}
                        className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {listingTitle}
                        </p>
                        <p className="text-xs text-gray-500">About this listing</p>
                    </div>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-gray-400">Loading messages...</div>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                            <p>No messages yet</p>
                            <p className="text-sm">Start the conversation!</p>
                        </div>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isOwn = message.senderId === currentUserId;
                        return (
                            <div
                                key={message.id}
                                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[75%] rounded-lg px-4 py-2 ${isOwn
                                            ? 'bg-rose-500 text-white'
                                            : 'bg-white text-gray-900 border border-gray-200'
                                        }`}
                                >
                                    <p className="text-sm break-words">{message.content}</p>
                                    <p
                                        className={`text-xs mt-1 ${isOwn ? 'text-rose-100' : 'text-gray-400'
                                            }`}
                                    >
                                        {new Date(message.timestamp).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1"
                        disabled={isSending}
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!newMessage.trim() || isSending}
                        className="bg-rose-500 hover:bg-rose-600"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                    Press Enter to send
                </p>
            </div>
        </div>
    );
}
