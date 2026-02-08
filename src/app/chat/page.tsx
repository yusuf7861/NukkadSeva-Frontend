"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ChatPage() {
    const { user } = useAuth();
    const [message, setMessage] = useState("");

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100">
            {/* Sidebar Navigation & Chats */}
            <aside className="w-80 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary-500 rounded-lg p-1.5 text-white">
                            <span className="material-symbols-outlined text-2xl">home_repair_service</span>
                        </div>
                        <div>
                            <h1 className="text-sm font-bold tracking-tight">HomeFix</h1>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Customer Portal</p>
                        </div>
                    </div>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                        <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-500/50 placeholder:text-slate-500 outline-none transition-all" placeholder="Search conversations..." type="text" />
                    </div>
                </div>
                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    {/* Active Conversation Item */}
                    <div className="flex items-center gap-3 px-4 py-4 bg-primary-500/10 border-l-4 border-primary-500 cursor-pointer transition-colors">
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-slate-200 bg-cover bg-center flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className="text-sm font-semibold truncate">John's Plumbing</h3>
                                <span className="text-[10px] text-slate-500 whitespace-nowrap">10:25 AM</span>
                            </div>
                            <p className="text-xs text-primary-500 font-medium mb-1">Emergency Repair</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Can you come by at 2pm?</p>
                        </div>
                    </div>
                    {/* Chat Item */}
                    <div className="flex items-center gap-3 px-4 py-4 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors border-l-4 border-transparent">
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-slate-200 bg-cover bg-center flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-900 rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className="text-sm font-semibold truncate">Elite Electricians</h3>
                                <span className="text-[10px] text-slate-500 whitespace-nowrap">Yesterday</span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium mb-1">Wiring Update</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">The quote is attached below.</p>
                        </div>
                    </div>
                    {/* Chat Item */}
                    <div className="flex items-center gap-3 px-4 py-4 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors border-l-4 border-transparent">
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-slate-200 bg-cover bg-center flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className="text-sm font-semibold truncate">Green Thumb Gardening</h3>
                                <span className="text-[10px] text-slate-500 whitespace-nowrap">Monday</span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium mb-1">Landscaping</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">See you on Wednesday!</p>
                        </div>
                    </div>
                </div>
                {/* Profile Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="material-symbols-outlined text-slate-500">person</span>
                            )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate">{user?.name || "My Account"}</p>
                            <p className="text-[10px] text-slate-500">Premium Customer</p>
                        </div>
                        <button className="text-slate-400 hover:text-primary-500 transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                </div>
            </aside>
            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative bg-slate-50 dark:bg-slate-950">
                {/* Chat Header */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-slate-200 bg-cover bg-center flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-sm font-bold text-slate-900 dark:text-white">John's Plumbing</h2>
                                <span className="text-[10px] bg-primary-500/20 text-primary-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Verified</span>
                            </div>
                            <p className="text-[10px] text-green-500 font-medium">Online</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-medium transition-colors text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-outlined text-lg">calendar_today</span>
                            Book Service
                        </button>
                        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </header>
                {/* Chat Message Feed */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    {/* Date Separator */}
                    <div className="flex justify-center">
                        <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] rounded-full font-bold uppercase tracking-widest">Today</span>
                    </div>
                    {/* Received Message */}
                    <div className="flex items-end gap-3 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-slate-200 bg-cover bg-center flex items-center justify-center text-slate-400 shrink-0">
                            <span className="material-symbols-outlined text-sm">person</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl rounded-bl-none shadow-sm text-sm border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                                Hi there! I've reviewed the photos of your kitchen sink leak. It looks like a standard washer replacement.
                            </div>
                            <span className="text-[10px] text-slate-500 px-1">10:12 AM</span>
                        </div>
                    </div>
                    {/* Sent Message */}
                    <div className="flex flex-col items-end gap-1 ml-auto max-w-[80%]">
                        <div className="bg-primary-500 text-white p-3 rounded-xl rounded-br-none shadow-md shadow-primary-500/20 text-sm">
                            Great to hear. Do you have availability today to fix it? I'll be home after 1:00 PM.
                        </div>
                        <div className="flex items-center gap-1.5 px-1">
                            <span className="text-[10px] text-slate-500">10:14 AM</span>
                            <span className="material-symbols-outlined text-[14px] text-primary-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        </div>
                    </div>
                    {/* Image Message Received */}
                    <div className="flex items-end gap-3 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-slate-200 bg-cover bg-center flex items-center justify-center text-slate-400 shrink-0">
                            <span className="material-symbols-outlined text-sm">person</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="bg-white dark:bg-slate-800 p-2 rounded-xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="w-64 h-48 rounded-lg bg-slate-200 mb-2 flex items-center justify-center text-slate-400">
                                    <span className="material-symbols-outlined text-4xl">image</span>
                                </div>
                                <p className="text-sm px-1 text-slate-700 dark:text-slate-200">I have all the parts ready in my truck. I can stop by around 2:00 PM if that works for you.</p>
                            </div>
                            <span className="text-[10px] text-slate-500 px-1">10:25 AM</span>
                        </div>
                    </div>
                    {/* Status Text */}
                    <div className="flex justify-center">
                        <p className="text-[11px] text-slate-500 italic">John's Plumbing is typing...</p>
                    </div>
                </div>
                {/* Message Input Area */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-2">
                        <div className="flex gap-1 px-1">
                            <button className="p-2 text-slate-500 hover:text-primary-500 transition-colors">
                                <span className="material-symbols-outlined">add_circle</span>
                            </button>
                            <button className="p-2 text-slate-500 hover:text-primary-500 transition-colors">
                                <span className="material-symbols-outlined">image</span>
                            </button>
                            <button className="p-2 text-slate-500 hover:text-primary-500 transition-colors">
                                <span className="material-symbols-outlined">attach_file</span>
                            </button>
                        </div>
                        <div className="flex-1 relative">
                            <input
                                className="w-full bg-transparent border-none focus:ring-0 text-sm py-2 px-0 placeholder:text-slate-500 outline-none text-slate-900 dark:text-slate-100"
                                placeholder="Type a message..."
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <button className="w-10 h-10 flex items-center justify-center bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20">
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                    <div className="flex justify-between items-center mt-2 px-2">
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">Enter to send • Shift + Enter for new line</p>
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] text-slate-500">Secure connection</span>
                        </div>
                    </div>
                </div>
                {/* Context Widget Floating (Optional enhancement) */}
                <div className="absolute top-20 right-6 w-64 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-4 hidden xl:block">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Request</h4>
                        <span className="material-symbols-outlined text-slate-400 text-sm cursor-pointer hover:text-slate-600">close</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-primary-500/10 flex items-center justify-center text-primary-500">
                                <span className="material-symbols-outlined text-xl">water_drop</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">Sink Maintenance</p>
                                <p className="text-[10px] text-slate-500">Service ID: #82910</p>
                            </div>
                        </div>
                        <div className="py-2 border-y border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-500">Estimated Quote</span>
                                <span className="font-bold text-slate-900 dark:text-white">$85.00</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Distance</span>
                                <span className="font-bold text-green-500">2.4 mi away</span>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-primary-500 text-white text-xs font-bold rounded-lg hover:brightness-110 transition-all">
                            View Estimate Details
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
