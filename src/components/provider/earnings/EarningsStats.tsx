export default function EarningsStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Available Balance</p>
                    <span className="material-symbols-outlined text-primary-500">payments</span>
                </div>
                <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">$2,840.50</p>
                <div className="flex items-center gap-1.5 mt-2">
                    <span className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        12.5%
                    </span>
                    <span className="text-gray-400 text-xs">vs last month</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Earned (Oct)</p>
                    <span className="material-symbols-outlined text-gray-400">calendar_month</span>
                </div>
                <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">$6,120.00</p>
                <div className="flex items-center gap-1.5 mt-2">
                    <span className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        8.2%
                    </span>
                    <span className="text-gray-400 text-xs">vs last month</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Pending Payouts</p>
                    <span className="material-symbols-outlined text-amber-500">schedule</span>
                </div>
                <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">$450.00</p>
                <p className="text-gray-400 text-sm mt-2 font-medium">Next processing: Oct 31, 2023</p>
            </div>
        </div>
    );
}
