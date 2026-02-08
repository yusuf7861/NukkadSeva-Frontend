"use client";

import Link from "next/link";

export default function ProviderOnboardingPage() {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col font-sans transition-colors duration-300">
            {/* Top Navigation Bar */}
            <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-500 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">HomeFix Marketplace</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500 dark:text-slate-400">Support</span>
                        <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-400">person</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-start pt-12 px-4">
                <div className="w-full max-w-[640px]">
                    {/* Progress Tracker */}
                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Step 1 of 3</span>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Business Information</h3>
                            </div>
                            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">33% Complete</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-500 w-1/3 rounded-full transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-8">
                        <div className="mb-8 text-center">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome to the Marketplace</h1>
                            <p className="text-slate-500 dark:text-slate-400">Let's start with your business details to help customers find you.</p>
                        </div>
                        <form className="space-y-6">
                            {/* Business Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    Legal Business Name <span className="text-slate-400 font-normal italic">(or Individual Name)</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">store</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-slate-900 dark:text-white outline-none transition-all"
                                        placeholder="e.g. Smith & Sons Repairs"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Service Category */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Service Category</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">build</span>
                                        <select className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-slate-900 dark:text-white outline-none appearance-none transition-all">
                                            <option disabled defaultValue="">Select category</option>
                                            <option value="electrician">Electrician</option>
                                            <option value="plumber">Plumber</option>
                                            <option value="carpenter">Carpenter</option>
                                            <option value="hvac">HVAC Technician</option>
                                            <option value="painter">Painter</option>
                                            <option value="other">General Maintenance</option>
                                        </select>
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                                {/* Years of Experience */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Years of Experience</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">history_edu</span>
                                        <input
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-slate-900 dark:text-white outline-none transition-all"
                                            min="0"
                                            placeholder="e.g. 5"
                                            type="number"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Service Radius */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Service Radius</label>
                                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                        <button className="px-3 py-1 text-xs font-bold rounded-md bg-white dark:bg-slate-700 shadow-sm text-primary-500" type="button">KM</button>
                                        <button className="px-3 py-1 text-xs font-bold rounded-md text-slate-500 dark:text-slate-400" type="button">MILES</button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <input
                                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                        max="100"
                                        min="1"
                                        type="range"
                                        defaultValue="25"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                                        <span>1 km</span>
                                        <span className="text-primary-500 font-bold text-sm">Targeting: 25 km around your location</span>
                                        <span>100 km</span>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">This helps us match you with local customers in your preferred working zone.</p>
                            </div>

                            {/* Action Button */}
                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]" type="button">
                                    <span>Next: Professional Credentials</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer micro-copy */}
                    <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        Already have an account? <Link href="/login" className="text-primary-500 font-semibold hover:underline">Log in here</Link>
                    </p>
                </div>
            </main>

            {/* Background Decoration Elements */}
            <div className="fixed top-20 left-10 opacity-10 dark:opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-[120px] text-primary-500 rotate-12">handyman</span>
            </div>
            <div className="fixed bottom-20 right-10 opacity-10 dark:opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-[120px] text-primary-500 -rotate-12">electric_bolt</span>
            </div>
        </div>
    );
}
