"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export interface BookingNotification {
    bookingId: string;
    customerName: string;
    serviceType: string;
    bookingDateTime: string;
    priceEstimate: number;
    note: string;
    status: string;
    createdAt: string;
}

interface UseBookingSocketResult {
    /** Whether the WebSocket is currently connected */
    isConnected: boolean;
    /** New booking notifications received in real-time */
    newBookings: BookingNotification[];
    /** Clear a specific booking from the list (e.g. after accepting/declining) */
    removeBooking: (bookingId: string) => void;
}

/**
 * Custom hook to connect to the STOMP WebSocket broker and receive
 * real-time booking notifications for the authenticated provider.
 */
export function useBookingSocket(token: string | null): UseBookingSocketResult {
    const [isConnected, setIsConnected] = useState(false);
    const [newBookings, setNewBookings] = useState<BookingNotification[]>([]);
    const clientRef = useRef<Client | null>(null);

    const removeBooking = useCallback((bookingId: string) => {
        setNewBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
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
                    console.log("[STOMP]", str);
                }
            },

            onConnect: () => {
                setIsConnected(true);
                console.log("[WebSocket] Connected to booking notifications");

                // Subscribe to the user-specific booking queue
                client.subscribe("/user/queue/bookings", (message: IMessage) => {
                    try {
                        const booking: BookingNotification = JSON.parse(message.body);
                        setNewBookings((prev) => [booking, ...prev]);
                    } catch (err) {
                        console.error("[WebSocket] Failed to parse booking:", err);
                    }
                });
            },

            onDisconnect: () => {
                setIsConnected(false);
                console.log("[WebSocket] Disconnected");
            },

            onStompError: (frame) => {
                console.error("[WebSocket] STOMP error:", frame.headers["message"]);
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

    return { isConnected, newBookings, removeBooking };
}
