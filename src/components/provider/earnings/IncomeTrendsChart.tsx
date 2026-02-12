export default function IncomeTrendsChart() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-gray-900 text-lg font-bold">Income Trends</h3>
                    <p className="text-gray-500 text-sm">Monthly performance visualization</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button className="px-4 py-1.5 text-xs font-bold bg-white text-primary-500 rounded shadow-sm">Month</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-gray-500">Year</button>
                </div>
            </div>
            <div className="w-full h-[280px] relative overflow-hidden">
                {/* Simplified Chart Representation for React */}
                <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
                    {[40, 60, 45, 70, 55, 80, 65, 90, 75, 60, 85, 95].map((h, i) => (
                        <div key={i} className="w-4 bg-primary-200 rounded-t-sm relative group">
                            <div
                                className="absolute bottom-0 w-full bg-primary-500 rounded-t-sm transition-all duration-500 group-hover:bg-primary-400"
                                style={{ height: `${h}%` }}
                            ></div>
                            {/* Tooltip */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                ${h * 10}0
                            </div>
                        </div>
                    ))}
                </div>
                {/* Horizontal Grid Lines */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-8">
                    <div className="border-t border-gray-100 w-full h-px"></div>
                    <div className="border-t border-gray-100 w-full h-px"></div>
                    <div className="border-t border-gray-100 w-full h-px"></div>
                    <div className="border-t border-gray-100 w-full h-px"></div>
                </div>
            </div>
            <div className="flex justify-between mt-4 px-2">
                <span className="text-gray-400 text-[11px] font-bold">OCT 01</span>
                <span className="text-gray-400 text-[11px] font-bold">OCT 07</span>
                <span className="text-gray-400 text-[11px] font-bold">OCT 14</span>
                <span className="text-gray-400 text-[11px] font-bold">OCT 21</span>
                <span className="text-gray-400 text-[11px] font-bold">OCT 28</span>
            </div>
        </div>
    );
}
