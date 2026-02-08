export default function ServicesHeader() {
    return (
        <header className="px-8 py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                        <span className="hover:text-primary-500 transition-colors cursor-pointer">Dashboard</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-slate-900 dark:text-white font-medium">Service Categories</span>
                    </nav>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Category Management</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Configure service types, commission rates, and availability.</p>
                </div>
                <div>
                    <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary-500/20">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Add New Category
                    </button>
                </div>
            </div>
        </header>
    );
}
