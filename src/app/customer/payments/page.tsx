"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { CreditCard, Download, Plus, Trash2, DollarSign, Calendar, Wallet } from "lucide-react";
import api from "@/lib/api";

type PaymentMethodType = {
    id: string;
    type: string;
    brand: string;
    last4: string;
    expiry: string;
    upiId: string;
    isDefault: boolean;
};

type TransactionType = {
    id: string;
    service: string;
    provider: string;
    date: string;
    amount: number;
    status: string;
    invoiceId: string;
};

export default function PaymentsPage() {
    const [activeTab, setActiveTab] = useState<"transactions" | "methods">("transactions");
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [txRes, methodsRes] = await Promise.all([
                    api.get("/payments/customer/transactions"),
                    api.get("/payments/customer/methods")
                ]);
                setTransactions(txRes.data);
                setPaymentMethods(methodsRes.data);
            } catch (error) {
                console.error("Failed to fetch payments data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Derived stats
    const totalSpent = transactions.filter(t => t.status !== "Refunded").reduce((sum, t) => sum + t.amount, 0);
    const pendingAmount = transactions.filter(t => t.status === "PENDING").reduce((sum, t) => sum + t.amount, 0);


    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 w-full pb-12">
                {/* Header / Hero Section */}
                <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 pb-24 pt-8 px-4 md:px-8 shadow-inner relative z-0">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="text-white">
                            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">Payments & Billing</h1>
                            <p className="text-primary-100 text-sm md:text-base font-medium">Manage your transactions, wallets, and payment methods securely.</p>
                        </div>
                    </div>

                    {/* Tabs overlapping within hero */}
                    <div className="max-w-7xl mx-auto mt-8 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                        <button
                            onClick={() => setActiveTab("transactions")}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm ${activeTab === "transactions"
                                    ? "bg-white text-primary-700 shadow-md transform -translate-y-0.5"
                                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm"
                                }`}
                        >
                            Transactions
                        </button>
                        <button
                            onClick={() => setActiveTab("methods")}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm ${activeTab === "methods"
                                    ? "bg-white text-primary-700 shadow-md transform -translate-y-0.5"
                                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm"
                                }`}
                        >
                            Payment Methods
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-10">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3 border border-emerald-200">
                                <DollarSign className="w-6 h-6 text-emerald-600" />
                            </div>
                            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">₹{totalSpent.toLocaleString("en-IN")}</p>
                            <p className="text-sm font-semibold text-gray-500 mt-1">Total Spent</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3 border border-amber-200">
                                <Calendar className="w-6 h-6 text-amber-600" />
                            </div>
                            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">₹{pendingAmount.toLocaleString("en-IN")}</p>
                            <p className="text-sm font-semibold text-gray-500 mt-1">Pending Dues</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3 border border-primary-200">
                                    <Wallet className="w-6 h-6 text-primary-600" />
                                </div>
                                <p className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">₹500</p>
                                <p className="text-sm font-semibold text-gray-500 mt-1">Wallet Balance</p>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
                        </div>
                    ) : activeTab === "transactions" ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="text-left px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice</th>
                                            <th className="text-left px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                                            <th className="text-left px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                                            <th className="text-left px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="text-left px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="text-right px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {transactions.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-5 py-4 text-sm font-medium text-gray-600 font-mono">{tx.invoiceId}</td>
                                                <td className="px-5 py-4">
                                                    <p className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{tx.service}</p>
                                                    <p className="text-xs font-medium text-gray-500 mt-0.5">{tx.provider}</p>
                                                </td>
                                                <td className="px-5 py-4 text-sm font-medium text-gray-500 hidden sm:table-cell">{tx.date}</td>
                                                <td className="px-5 py-4 text-sm font-bold text-gray-900">₹{tx.amount.toLocaleString("en-IN")}</td>
                                                <td className="px-5 py-4">
                                                    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${tx.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : tx.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-gray-50 text-gray-700 border-gray-200"}`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 hidden md:table-cell text-right">
                                                    <button className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-bold bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors border border-primary-100">
                                                        <Download className="w-4 h-4 mr-1.5" />Receipt
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {transactions.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-5 py-12 text-center">
                                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-100">
                                                        <DollarSign className="w-8 h-8 text-gray-400" />
                                                    </div>
                                                    <p className="text-gray-500 font-medium">No transactions found.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {paymentMethods.map((method) => (
                                <div key={method.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gray-50 group-hover:bg-primary-50 transition-colors border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            {method.type === "card" ? <CreditCard className="w-6 h-6 text-gray-500 group-hover:text-primary-600 transition-colors" /> : <span className="text-xs font-extrabold text-gray-500 group-hover:text-primary-600 transition-colors">UPI</span>}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-bold text-gray-900 uppercase">
                                                    {method.type === "card" ? `${method.brand} •••• ${method.last4}` : "UPI Account"}
                                                </p>
                                                {method.isDefault && <span className="bg-primary-100 text-primary-700 border border-primary-200 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">Default</span>}
                                            </div>
                                            {method.type === "card" ? (
                                                <p className="text-sm font-medium text-gray-500">Expires {method.expiry}</p>
                                            ) : (
                                                <p className="text-sm font-medium text-gray-500">{method.upiId}</p>
                                            )}
                                        </div>
                                    </div>
                                    <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"><Trash2 className="w-5 h-5" /></button>
                                </div>
                            ))}
                            {paymentMethods.length === 0 && (
                                <div className="md:col-span-2 bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm text-sm font-medium text-gray-500">
                                    No saved payment methods found. Add one for faster checkout.
                                </div>
                            )}
                            <button className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-sm font-bold text-gray-500 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all group">
                                <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Plus className="w-5 h-5" />
                                </div>
                                Add Payment Method
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
