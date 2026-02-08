export default function ServicesPagination() {
    return (
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">4</span> of <span className="font-bold text-slate-900 dark:text-white">24</span> categories</p>
            <div className="flex items-center gap-1">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-500 text-white font-bold">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">3</button>
                <span className="px-2 text-slate-400">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">6</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
        </div>
    );
}
