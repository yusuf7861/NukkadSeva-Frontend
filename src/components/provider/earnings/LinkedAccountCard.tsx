export default function LinkedAccountCard() {
    return (
        <div className="mt-8 p-6 bg-primary-50 border border-primary-100 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-primary-100 p-3 rounded-full">
                    <span className="material-symbols-outlined text-primary-500">account_balance</span>
                </div>
                <div>
                    <h4 className="text-gray-900 font-bold">Linked Bank Account</h4>
                    <p className="text-gray-600 text-sm">Chase Bank •••• 9901 (Primary)</p>
                </div>
            </div>
            <button className="text-primary-500 text-sm font-bold border border-primary-500 px-4 py-2 rounded-lg hover:bg-primary-500 hover:text-white transition-all">Manage Bank Details</button>
        </div>
    );
}
