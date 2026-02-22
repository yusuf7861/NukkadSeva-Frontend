"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export interface CustomerBookingNotification {
    bookingId: string;
    customerName: string; // Actually is the Provider's Name
    serviceType: string;
    bookingDateTime: string;
    priceEstimate: number | null;
    note: string;
    status: string;
    createdAt: string;
    completionOtp?: string;
    rejectionReason?: string;
}

interface UseCustomerSocketResult {
    /** Whether the WebSocket is currently connected */
    isConnected: boolean;
    /** New booking history/status updates received in real-time */
    bookingUpdates: CustomerBookingNotification[];
    /** Clear a specific update from the notification list */
    removeUpdate: (bookingId: string) => void;
}

/**
 * Custom hook to connect to the STOMP WebSocket broker and receive
 * real-time booking status updates for the authenticated customer.
 */
export function useCustomerSocket(token: string | null): UseCustomerSocketResult {
    const [isConnected, setIsConnected] = useState(false);
    const [bookingUpdates, setBookingUpdates] = useState<CustomerBookingNotification[]>([]);
    const clientRef = useRef<Client | null>(null);

    const removeUpdate = useCallback((bookingId: string) => {
        setBookingUpdates((prev) => prev.filter((b) => b.bookingId !== bookingId));
    }, []);

    useEffect(() => {
        if (!token) return;

        const client = new Client({
            // SockJS factory for the WebSocket transport
            webSocketFactory: () => new SockJS("http://10.38.28.45:8080/ws"),

            // STOMP headers sent on CONNECT frame
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },

            // Reconnect after 5 seconds on disconnect
            reconnectDelay: 5000,

            // Heartbeat: send every 10s, expect every 10s
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,

            debug: (str) => {
                if (process.env.NODE_ENV === "development") {
                    console.log("[STOMP Customer]", str);
                }
            },

            onConnect: () => {
                setIsConnected(true);
                console.log("[WebSocket] Connected to customer booking updates");

                // Subscribe to the customer-specific booking queue
                client.subscribe("/user/queue/customer-bookings", (message: IMessage) => {
                    try {
                        const update: CustomerBookingNotification = JSON.parse(message.body);
                        setBookingUpdates((prev) => [update, ...prev]);
                    } catch (err) {
                        console.error("[WebSocket] Failed to parse customer booking update:", err);
                    }
                });
            },

            onDisconnect: () => {
                setIsConnected(false);
                console.log("[WebSocket] Disconnected from customer updates");
            },

            onStompError: (frame) => {
                console.error("[WebSocket] STOMP customer error:", frame.headers["message"]);
                setIsConnected(false);
            },
        });

        clientRef.current = client;
        client.activate();

        return () => {
            if (clientRef.current?.connected) {
                clientRef.current.deactivate();
            }
        };
    }, [token]);

    return { isConnected, bookingUpdates, removeUpdate };
}
