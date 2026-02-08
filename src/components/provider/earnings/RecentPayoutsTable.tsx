export default function RecentPayoutsTable() {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold">Recent Payouts</h3>
                <button className="text-primary-500 text-sm font-semibold hover:underline">Download CSV</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Job ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service Type</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Gross</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Platform Fee</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Net Earnings</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Oct 24, 2023</td>
                            <td className="px-6 py-4 text-sm font-medium text-primary-500">#JOB-8821</td>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">Main Drain Unclogging</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">Completed</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">$350.00</td>
                            <td className="px-6 py-4 text-sm text-rose-500">-$35.00</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$315.00</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Oct 23, 2023</td>
                            <td className="px-6 py-4 text-sm font-medium text-primary-500">#JOB-8794</td>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">Ceiling Fan Installation</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">Completed</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">$180.00</td>
                            <td className="px-6 py-4 text-sm text-rose-500">-$18.00</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$162.00</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Oct 21, 2023</td>
                            <td className="px-6 py-4 text-sm font-medium text-primary-500">#JOB-8752</td>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">Emergency HVAC Repair</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Processing</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">$840.00</td>
                            <td className="px-6 py-4 text-sm text-rose-500">-$84.00</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$756.00</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Oct 19, 2023</td>
                            <td className="px-6 py-4 text-sm font-medium text-primary-500">#JOB-8610</td>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">Kitchen Tile Grouting</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">Completed</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">$520.00</td>
                            <td className="px-6 py-4 text-sm text-rose-500">-$52.00</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$468.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <p className="text-sm text-slate-500">Showing 4 of 28 payouts</p>
                <div className="flex gap-2">
                    <button className="p-2 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button className="p-2 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
