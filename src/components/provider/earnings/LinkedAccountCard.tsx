export default function LinkedAccountCard() {
    return (
        <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/20 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                    <span className="material-symbols-outlined text-primary-500">account_balance</span>
                </div>
                <div>
                    <h4 className="text-slate-900 dark:text-white font-bold">Linked Bank Account</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Chase Bank •••• 9901 (Primary)</p>
                </div>
            </div>
            <button className="text-primary-500 text-sm font-bold border border-primary-500 px-4 py-2 rounded-lg hover:bg-primary-500 hover:text-white transition-all">Manage Bank Details</button>
        </div>
    );
}
