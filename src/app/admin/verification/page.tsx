"use client";

export default function AdminVerification() {
    return (
        <div className="flex h-full bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans text-slate-900 dark:text-slate-100">
            <aside className="w-1/3 min-w-[400px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Pending Applications</h1>
                        <p className="text-xs text-slate-500 font-medium">12 applications waiting for review</p>
                    </div>
                    <button className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-primary-500 transition-colors">
                        <span className="material-symbols-outlined">filter_list</span>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="p-2 space-y-1">
                        <div className="p-4 rounded-xl bg-primary-500/5 border border-primary-500/20 flex items-start gap-4 cursor-pointer">
                            <div className="h-10 w-10 rounded-lg bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">plumbing</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">John Doe Plumbing Services</h3>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded">Pending</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">Category: Residential Plumbing</p>
                                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">calendar_today</span> Oct 14, 2023</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">location_on</span> Austin, TX</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent transition-all flex items-start gap-4 cursor-pointer group">
                            <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-primary-500 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">electrical_services</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">Sparky Electric Co.</h3>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded">Pending</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">Category: Commercial Electrical</p>
                                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">calendar_today</span> Oct 13, 2023</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">location_on</span> Dallas, TX</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent transition-all flex items-start gap-4 cursor-pointer group">
                            <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-primary-500 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">hvac</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">Climate Control Pros</h3>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">In Review</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">Category: HVAC Maintenance</p>
                                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                                    <span className="flex items-center gap-1"><span class="material-symbols-outlined text-xs">calendar_today</span> Oct 12, 2023</span>
                                    <span className="flex items-center gap-1"><span class="material-symbols-outlined text-xs">location_on</span> Houston, TX</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <section className="flex-1 bg-slate-50 dark:bg-slate-950 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-5">
                            <div className="size-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary-500">
                                <span className="material-symbols-outlined text-4xl">plumbing</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">John Doe Plumbing Services</h2>
                                    <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full">Pending Verification</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Application ID: #APP-99210-JD</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
                                <span className="material-symbols-outlined text-lg">mail</span>
                                Contact
                            </button>
                            <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
                                <span className="material-symbols-outlined text-lg">history</span>
                                History
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Business Details</p>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[10px] text-slate-500">Tax ID / EIN</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">12-3456789</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500">Years in Business</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">8 Years</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Contact Info</p>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[10px] text-slate-500">Phone</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">+1 (512) 555-0123</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500">Email</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">john@doepumbing.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Address</p>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[10px] text-slate-500">Street</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">123 Industrial Way</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500">City, State</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Austin, TX 78701</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary-500">description</span>
                            Compliance Documents
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group relative bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Government Issued ID</p>
                                        <p className="text-[11px] text-slate-500">Uploaded on Oct 14, 2023</p>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-primary-500 transition-colors">
                                        <span className="material-symbols-outlined">zoom_in</span>
                                    </button>
                                </div>
                                <div className="aspect-[4/3] rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative border border-slate-200 dark:border-slate-700">
                                    <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 flex items-center justify-center opacity-50">
                                        <span className="material-symbols-outlined text-slate-400 text-4xl">badge</span>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all cursor-pointer">
                                        <span className="bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">Preview Document</span>
                                    </div>
                                </div>
                            </div>
                            <div className="group relative bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Professional Plumber License</p>
                                        <p className="text-[11px] text-slate-500">Exp: Dec 2025</p>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-primary-500 transition-colors">
                                        <span className="material-symbols-outlined">zoom_in</span>
                                    </button>
                                </div>
                                <div className="aspect-[4/3] rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative border border-slate-200 dark:border-slate-700">
                                    <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 flex items-center justify-center opacity-50">
                                        <span className="material-symbols-outlined text-slate-400 text-4xl">contact_page</span>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all cursor-pointer">
                                        <span className="bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">Preview Document</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Verification Decision</h3>
                            <p className="text-sm text-slate-500 mt-1">Review the documentation above before making a final decision.</p>
                        </div>
                        <div className="p-6">
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Rejection Reason (Internal & Provider Facing)</label>
                                <textarea className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary-500 focus:border-primary-500 text-sm min-h-[100px] outline-none p-3" placeholder="Explain why the application is being rejected or needs more info..."></textarea>
                            </div>
                            <div className="flex items-center justify-end gap-3">
                                <button className="flex items-center justify-center gap-2 h-12 px-8 rounded-lg border-2 border-red-500 text-red-600 dark:text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                                    <span className="material-symbols-outlined">block</span>
                                    Reject Provider
                                </button>
                                <button className="flex items-center justify-center gap-2 h-12 px-10 rounded-lg bg-primary-500 text-white font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25">
                                    <span className="material-symbols-outlined">verified</span>
                                    Approve & Verify
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
