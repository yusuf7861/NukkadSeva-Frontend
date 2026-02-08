export default function ServicesTable() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-b-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Icon & Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Pros</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Commission</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Last Update</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {/* Category Row 1 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined">ac_unit</span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">AC Repair & Service</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Heating & Cooling</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">184 Professionals</div>
                        </td>
                        <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-sm font-bold">15%</span>
                        </td>
                        <td className="px-6 py-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox" />
                                <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                <span className="ml-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">ACTIVE</span>
                            </label>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Oct 12, 2023</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-slate-400 hover:text-primary-500 transition-colors">
                                    <span className="material-symbols-outlined text-xl">edit</span>
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                    {/* Category Row 2 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <span className="material-symbols-outlined">cleaning_services</span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">Full Home Cleaning</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Janitorial Services</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">342 Professionals</div>
                        </td>
                        <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-sm font-bold">12%</span>
                        </td>
                        <td className="px-6 py-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox" />
                                <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                <span className="ml-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">ACTIVE</span>
                            </label>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Oct 08, 2023</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-slate-400 hover:text-primary-500 transition-colors">
                                    <span className="material-symbols-outlined text-xl">edit</span>
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                    {/* Category Row 3 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                    <span className="material-symbols-outlined">construction</span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">Plumbing Services</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Kitchen & Bathroom</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">122 Professionals</div>
                        </td>
                        <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-sm font-bold">18%</span>
                        </td>
                        <td className="px-6 py-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox" />
                                <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                <span className="ml-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">ACTIVE</span>
                            </label>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Sep 24, 2023</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-slate-400 hover:text-primary-500 transition-colors">
                                    <span className="material-symbols-outlined text-xl">edit</span>
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                    {/* Category Row 4 (Inactive) */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors opacity-70">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined">brush</span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">Wall Painting</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Interior/Exterior</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">0 Professionals</div>
                        </td>
                        <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-sm font-bold">10%</span>
                        </td>
                        <td className="px-6 py-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input className="sr-only peer" type="checkbox" />
                                <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                <span className="ml-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Inactive</span>
                            </label>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Sep 15, 2023</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-slate-400 hover:text-primary-500 transition-colors">
                                    <span className="material-symbols-outlined text-xl">edit</span>
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
