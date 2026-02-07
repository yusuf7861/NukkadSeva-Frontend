"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Lock, Bell, Shield, Eye, EyeOff, Trash2, LogOut, ChevronRight, Save } from "lucide-react";

export default function SettingsPage() {
    const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
    const [notifications, setNotifications] = useState({ email: true, sms: true, push: false, marketing: false });

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-gray-900">Settings</h1>
                    <p className="text-sm text-gray-500">Manage your preferences</p>
                </div>

                <div className="space-y-4">
                    {/* Password */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                                <Lock className="w-4 h-4 text-primary-500" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">Change Password</h2>
                                <p className="text-xs text-gray-500">Update your password</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {["current", "new", "confirm"].map((field) => (
                                <div key={field}>
                                    <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{field === "confirm" ? "Confirm New" : field} Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword[field as keyof typeof showPassword] ? "text" : "password"}
                                            value={passwords[field as keyof typeof passwords]}
                                            onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
                                            placeholder="••••••••"
                                            className="w-full px-3 py-2 pr-9 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                                        />
                                        <button type="button" onClick={() => setShowPassword({ ...showPassword, [field]: !showPassword[field as keyof typeof showPassword] })} className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {showPassword[field as keyof typeof showPassword] ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-3 px-3 py-1.5 bg-primary-500 text-white rounded-lg text-xs font-medium hover:bg-primary-600 flex items-center">
                            <Save className="w-3 h-3 mr-1" />Update Password
                        </button>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <Bell className="w-4 h-4 text-blue-500" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
                                <p className="text-xs text-gray-500">Choose how to receive updates</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[
                                { key: "email" as const, label: "Email Notifications" },
                                { key: "sms" as const, label: "SMS Notifications" },
                                { key: "push" as const, label: "Push Notifications" },
                                { key: "marketing" as const, label: "Marketing Emails" },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                    <span className="text-sm text-gray-700">{item.label}</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={notifications[item.key]} onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })} className="sr-only peer" />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <Shield className="w-4 h-4 text-green-500" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">Security</h2>
                                <p className="text-xs text-gray-500">Manage account security</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between py-2.5 px-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                                <span className="text-gray-700">Two-Factor Authentication</span>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="w-full flex items-center justify-between py-2.5 px-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                                <span className="text-gray-700">Active Sessions</span>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-red-100">
                        <h2 className="text-sm font-semibold text-red-600 mb-3">Danger Zone</h2>
                        <div className="flex flex-wrap gap-3">
                            <button className="flex items-center text-xs text-gray-700 hover:text-red-600">
                                <LogOut className="w-4 h-4 mr-1" />Log out all devices
                            </button>
                            <button className="flex items-center text-xs text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4 mr-1" />Delete account
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
