export default function ServicesStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Categories</span>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                        <span className="material-symbols-outlined">grid_view</span>
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">24</span>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">+2 this month</span>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Commission</span>
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                        <span className="material-symbols-outlined">percent</span>
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">12.5%</span>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-1.5 py-0.5 rounded">Target: 15%</span>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Professionals</span>
                    <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg">
                        <span className="material-symbols-outlined">group</span>
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">1,142</span>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">+5.2%</span>
                </div>
            </div>
        </div>
    );
}
