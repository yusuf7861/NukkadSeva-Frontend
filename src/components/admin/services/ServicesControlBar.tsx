interface ServicesControlBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export default function ServicesControlBar({ searchTerm, setSearchTerm }: ServicesControlBarProps) {
    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-t-xl border border-slate-200 dark:border-slate-800 border-b-0 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                    placeholder="Search categories by name..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                <select className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm focus:ring-primary-500 focus:border-primary-500 outline-none">
                    <option>All Statuses</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
                <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">filter_list</span>
                </button>
                <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">download</span>
                </button>
            </div>
        </div>
    );
}
