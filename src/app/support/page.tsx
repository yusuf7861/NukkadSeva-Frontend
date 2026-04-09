"use client";

import { Search, Calendar, CreditCard, Shield, Wrench, FileText, ChevronRight, MessageSquare } from "lucide-react";

export default function SupportCenterPage() {
    return (
        <div className="w-full flex-1">
            {/* Hero Section */}
            <section className="bg-primary-600 w-full py-16 md:py-24 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">How can we help?</h1>
                <div className="max-w-2xl mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search for articles, topics, or issues..."
                        className="w-full pl-6 pr-16 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary-500/50 shadow-xl"
                    />
                    <button className="absolute right-2 top-2 p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors">
                        <Search className="w-6 h-6" />
                    </button>
                </div>
                <div className="mt-4 text-primary-100 text-sm font-medium space-x-3 w-full flex justify-center flex-wrap gap-y-2">
                    <span>Popular:</span>
                    <a href="#" className="hover:text-white underline decoration-primary-400 underline-offset-4">Refund status</a>
                    <a href="#" className="hover:text-white underline decoration-primary-400 underline-offset-4">Changing a booking</a>
                    <a href="#" className="hover:text-white underline decoration-primary-400 underline-offset-4">Identity verification</a>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Categories */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 relative z-10 mb-16">
                    {/* Main highlight category */}
                    <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
                                <Calendar className="w-6 h-6 text-primary-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Bookings</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Manage your schedules, reschedule appointments, and learn about our cancellation policies for both users and providers.
                            </p>
                        </div>
                        <a href="#" className="text-primary-600 font-bold flex items-center group hover:text-primary-700 transition-colors">
                            View All Articles <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                            <CreditCard className="w-5 h-5 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Payments</h3>
                        <p className="text-sm text-gray-600">Invoices, refunds, and secure transactions.</p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                            <Shield className="w-5 h-5 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Safety</h3>
                        <p className="text-sm text-gray-600">Trust and safety standards for the community.</p>
                    </div>

                    {/* Wider Provider Help card */}
                    <div className="md:col-span-2 lg:col-start-3 lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-6">
                        <div className="w-16 h-16 shrink-0 bg-blue-50 rounded-2xl flex items-center justify-center">
                            <Wrench className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Provider Help</h3>
                            <p className="text-sm text-gray-600">Resources specifically for service providers and business owners on the marketplace.</p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Popular Articles */}
                    <section className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Popular Articles</h2>
                            <a href="#" className="text-primary-600 font-bold text-sm hover:underline">View All</a>
                        </div>
                        <div className="space-y-4">
                            <a href="#" className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 hover:border-primary-100 hover:bg-primary-50/50 transition-colors group">
                                <FileText className="w-5 h-5 text-gray-400 group-hover:text-primary-500 shrink-0" />
                                <span className="font-semibold text-gray-700 group-hover:text-gray-900">How to request a refund for a cancelled service</span>
                            </a>
                            <a href="#" className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 hover:border-primary-100 hover:bg-primary-50/50 transition-colors group">
                                <FileText className="w-5 h-5 text-gray-400 group-hover:text-primary-500 shrink-0" />
                                <span className="font-semibold text-gray-700 group-hover:text-gray-900">Verifying your professional credentials</span>
                            </a>
                            <a href="#" className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 hover:border-primary-100 hover:bg-primary-50/50 transition-colors group">
                                <FileText className="w-5 h-5 text-gray-400 group-hover:text-primary-500 shrink-0" />
                                <span className="font-semibold text-gray-700 group-hover:text-gray-900">Setting up automated weekly payouts</span>
                            </a>
                            <a href="#" className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 hover:border-primary-100 hover:bg-primary-50/50 transition-colors group">
                                <FileText className="w-5 h-5 text-gray-400 group-hover:text-primary-500 shrink-0" />
                                <span className="font-semibold text-gray-700 group-hover:text-gray-900">Protecting your account with 2FA</span>
                            </a>
                        </div>
                    </section>

                    <aside className="space-y-8">
                        {/* System Status */}
                        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-900 flex items-center mb-5"><Wrench className="w-4 h-4 mr-2 text-orange-600" /> System Status</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Payment Gateway</span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold tracking-widest flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span> OPERATIONAL</span>
                                </li>
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Booking Engine</span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold tracking-widest flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span> OPERATIONAL</span>
                                </li>
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Messaging API</span>
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold tracking-widest flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span> INVESTIGATING</span>
                                </li>
                            </ul>
                        </div>

                        {/* Still need help */}
                        <div className="bg-primary-700 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-3">Still need help?</h3>
                                <p className="text-primary-100 text-sm mb-6 leading-relaxed">Our support specialists are available 24/7 to assist with your specific case.</p>
                                <button className="w-full bg-white text-primary-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
                                    <MessageSquare className="w-5 h-5 mr-2" /> Contact Support
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Feedback Banner */}
                <div className="bg-gray-100 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Was this center helpful?</h4>
                        <p className="text-sm text-gray-600">We are constantly improving our documentation to provide the best service experience.</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none bg-white text-gray-700 font-bold py-2.5 px-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                            No, it wasn't
                        </button>
                        <button className="flex-1 sm:flex-none bg-[#9B4819] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-[#803B14] transition-colors">
                            Yes, thanks!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
