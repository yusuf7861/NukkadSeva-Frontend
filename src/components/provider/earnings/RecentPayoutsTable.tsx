export default function RecentPayoutsTable() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-gray-900 text-lg font-bold">Recent Payouts</h3>
                <button className="text-primary-500 text-sm font-semibold hover:underline">Download CSV</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Job ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Service Type</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Gross</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Platform Fee</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Net Earnings</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-600">Oct 24, 2023</td>
                            <td className="px-6 py-4 text-sm font-medium text-primary-500">#JOB-8821</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Drain Unclogging</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    Paid
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">$150.00</td>
                            <td className="px-6 py-4 text-sm text-rose-500">-$35.00</td>
                            <td className="px-6 py-4 text-sm font-bold text-gray-900">$115.00</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-600">Oct 23, 2023</td>
                            <td className="px-6 py-4 text-sm font-medium text-primary-500">#JOB-8794</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Fan Installation</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    Paid
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">$80.00</td>
                            <td className="px-6 py-4 text-sm text-rose-500">-$18.00</td>
                            <td className="px-6 py-4 text-sm font-bold text-gray-900">$62.00</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-600">Oct 21, 2023</td>
                            <td className="px-6 py-4 text-sm font-medium text-primary-500">#JOB-8752</td>
                            <td className="px-6 py-4 text-sm text-gray-900">HVAC Repair</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Processing
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">$320.00</td>
                            <td className="px-6 py-4 text-sm text-rose-500">-$84.00</td>
                            <td className="px-6 py-4 text-sm font-bold text-gray-900">$236.00</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-600">Oct 19, 2023</td>
                            <td className="px-6 py-4 text-sm font-medium text-primary-500">#JOB-8610</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Tile Grouting</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    Paid
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">$200.00</td>
                            <td className="px-6 py-4 text-sm text-rose-500">-$52.00</td>
                            <td className="px-6 py-4 text-sm font-bold text-gray-900">$148.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">Showing 4 of 28 payouts</p>
                <div className="flex gap-2">
                    <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button className="p-2 border border-gray-200 rounded hover:bg-gray-50">
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
