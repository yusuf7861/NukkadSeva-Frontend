"use client";

import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
    const { user } = useAuth();

    return (
        <>
            {/* Header */}
            <header className="h-16 flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
                <div className="flex items-center gap-4 flex-1">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Dashboard Overview</h2>
                    <div className="max-w-md w-full ml-4">
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">search</span>
                            <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-500/20 transition-all outline-none" placeholder="Search users, providers, or tickets..." type="text" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative w-10 h-10 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined">help</span>
                    </button>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                    <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-sm">add</span>
                        <span>New Report</span>
                    </button>
                </div>
            </header>
            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-950 font-sans">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Stat Card 1 */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <span className="text-xs font-bold text-green-500 flex items-center bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">
                                <span className="material-symbols-outlined text-xs mr-1">trending_up</span>+5.2%
                            </span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Active Users</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">12,450</p>
                    </div>
                    {/* Stat Card 2 */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined">engineering</span>
                            </div>
                            <span className="text-xs font-bold text-green-500 flex items-center bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">
                                <span className="material-symbols-outlined text-xs mr-1">trending_up</span>+2.1%
                            </span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Service Providers</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1,840</p>
                    </div>
                    {/* Stat Card 3 */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <span className="text-xs font-bold text-green-500 flex items-center bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">
                                <span className="material-symbols-outlined text-xs mr-1">trending_up</span>+12.4%
                            </span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Daily Revenue</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">₹4,200.00</p>
                    </div>
                    {/* Stat Card 4 */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined">rule</span>
                            </div>
                            <span className="text-xs font-bold text-red-500 flex items-center bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full">
                                <span className="material-symbols-outlined text-xs mr-1">trending_down</span>-8%
                            </span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Verifications</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">24</p>
                    </div>
                </div>
                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Chart Section */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Booking Growth</h3>
                                <p className="text-sm text-slate-500">Platform performance in the last 30 days</p>
                            </div>
                            <select className="text-sm border-slate-200 dark:border-slate-700 bg-transparent rounded-lg focus:ring-primary-500 focus:border-primary-500 text-black">
                                <option>Last 30 days</option>
                                <option>Last 3 months</option>
                                <option>Year to date</option>
                            </select>
                        </div>
                        <div className="flex-1 min-h-[300px] relative">
                            {/* Simple SVG Line Chart Mockup */}
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 300">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#137fec" stopOpacity="0.2"></stop>
                                        <stop offset="100%" stopColor="#137fec" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0 250 Q 80 230, 160 210 T 320 150 T 480 180 T 640 80 T 800 60 L 800 300 L 0 300 Z" fill="url(#chartGradient)"></path>
                                <path d="M0 250 Q 80 230, 160 210 T 320 150 T 480 180 T 640 80 T 800 60" fill="none" stroke="#137fec" strokeWidth="3"></path>
                                {/* Chart Dots */}
                                <circle cx="160" cy="210" fill="#137fec" r="4"></circle>
                                <circle cx="320" cy="150" fill="#137fec" r="4"></circle>
                                <circle cx="480" cy="180" fill="#137fec" r="4"></circle>
                                <circle cx="640" cy="80" fill="#137fec" r="4"></circle>
                                <circle cx="800" cy="60" fill="#137fec" r="4"></circle>
                            </svg>
                            {/* Legend */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400 font-medium px-2">
                                <span>May 01</span>
                                <span>May 08</span>
                                <span>May 15</span>
                                <span>May 22</span>
                                <span>May 29</span>
                            </div>
                        </div>
                    </div>
                    {/* Recent Activity Section */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                            <button className="text-sm text-primary-500 font-medium hover:underline">View all</button>
                        </div>
                        <div className="space-y-6">
                            {/* Activity Item */}
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">New Provider Registered</p>
                                    <p className="text-xs text-slate-500">Mike's Plumbing & Heating Co. submitted documents for verification.</p>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">2 mins ago</p>
                                </div>
                            </div>
                            {/* Activity Item */}
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">New Dispute Opened</p>
                                    <p className="text-xs text-slate-500">Order #HF-8821: Customer reported incomplete floor tiling service.</p>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">1 hour ago</p>
                                </div>
                            </div>
                            {/* Activity Item */}
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Revenue Milestone</p>
                                    <p className="text-xs text-slate-500">Platform hit the ₹4,000 daily revenue goal. +15% from average.</p>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">4 hours ago</p>
                                </div>
                            </div>
                            {/* Activity Item */}
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Verification Expiring</p>
                                    <p className="text-xs text-slate-500">"Electrical Pros Inc." insurance license will expire in 3 days.</p>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">6 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Table Section */}
                <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pending Provider Verifications</h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded hover:bg-slate-200 transition-colors">Filter</button>
                            <button className="px-3 py-1.5 text-xs font-semibold bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">Export CSV</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Provider Name</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Service Category</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Applied Date</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Documents</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center font-bold text-xs">RJ</div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">Rapid Jet Plumbing</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Plumbing & HVAC</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">May 28, 2024</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-1">
                                            <span className="material-symbols-outlined text-slate-400 text-sm">description</span>
                                            <span className="material-symbols-outlined text-slate-400 text-sm">badge</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide rounded bg-amber-100 dark:bg-amber-900/30 text-amber-600">Pending Review</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary-500 hover:text-primary-600 font-medium text-sm">Review</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center font-bold text-xs">GH</div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">Golden Hammer Carpentry</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Remodeling</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">May 27, 2024</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-1">
                                            <span className="material-symbols-outlined text-slate-400 text-sm">description</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600">In Progress</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary-500 hover:text-primary-600 font-medium text-sm">Resume</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center font-bold text-xs">EL</div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">Elite Lighting Experts</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Electrical</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">May 26, 2024</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-1">
                                            <span className="material-symbols-outlined text-slate-400 text-sm">description</span>
                                            <span className="material-symbols-outlined text-slate-400 text-sm">badge</span>
                                            <span className="material-symbols-outlined text-slate-400 text-sm">account_balance</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide rounded bg-red-100 dark:bg-red-900/30 text-red-600">Action Required</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary-500 hover:text-primary-600 font-medium text-sm">View Details</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
