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
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-gray-900">Payments</h1>
                    <p className="text-sm text-gray-500">Manage payments and view history</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
                    <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">₹{totalSpent}</p>
                        <p className="text-xs text-gray-500">Total Spent</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">₹{pendingAmount}</p>
                        <p className="text-xs text-gray-500">Pending</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <Wallet className="w-4 h-4 text-purple-600" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">₹500</p>
                        <p className="text-xs text-gray-500">Wallet</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 mb-4">
                    <button onClick={() => setActiveTab("transactions")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === "transactions" ? "bg-primary-500 text-white" : "bg-white text-gray-600"}`}>
                        Transactions
                    </button>
                    <button onClick={() => setActiveTab("methods")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === "methods" ? "bg-primary-500 text-white" : "bg-white text-gray-600"}`}>
                        Payment Methods
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                ) : activeTab === "transactions" ? (
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500">Invoice</th>
                                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500">Service</th>
                                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 hidden sm:table-cell">Date</th>
                                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500">Amount</th>
                                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500">Status</th>
                                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 hidden md:table-cell">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-gray-50">
                                            <td className="px-3 py-2.5 text-xs text-gray-900">{tx.invoiceId}</td>
                                            <td className="px-3 py-2.5">
                                                <p className="text-xs font-medium text-gray-900">{tx.service}</p>
                                                <p className="text-xs text-gray-500">{tx.provider}</p>
                                            </td>
                                            <td className="px-3 py-2.5 text-xs text-gray-500 hidden sm:table-cell">{tx.date}</td>
                                            <td className="px-3 py-2.5 text-xs font-medium text-gray-900">₹{tx.amount}</td>
                                            <td className="px-3 py-2.5">
                                                <span className={`px-1.5 py-0.5 rounded-full text-xs ${tx.status === "Completed" ? "bg-green-100 text-green-600" : tx.status === "Pending" ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-600"}`}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2.5 hidden md:table-cell">
                                                <button className="flex items-center text-primary-500 hover:text-primary-600 text-xs">
                                                    <Download className="w-3 h-3 mr-1" />Download
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {transactions.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-3 py-6 text-center text-gray-500 text-sm">
                                                No transactions found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="bg-white rounded-lg p-3 md:p-4 shadow-sm flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        {method.type === "card" ? <CreditCard className="w-5 h-5 text-gray-600" /> : <span className="text-xs font-bold text-gray-600">UPI</span>}
                                    </div>
                                    <div>
                                        {method.type === "card" ? (
                                            <>
                                                <p className="text-sm font-medium text-gray-900">{method.brand} •••• {method.last4}</p>
                                                <p className="text-xs text-gray-500">Expires {method.expiry}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-sm font-medium text-gray-900">UPI</p>
                                                <p className="text-xs text-gray-500">{method.upiId}</p>
                                            </>
                                        )}
                                    </div>
                                    {method.isDefault && <span className="bg-primary-100 text-primary-600 text-xs px-1.5 py-0.5 rounded-full">Default</span>}
                                </div>
                                <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                        {paymentMethods.length === 0 && (
                            <div className="bg-white rounded-lg p-8 text-center text-sm text-gray-500">
                                No saved payment methods found.
                            </div>
                        )}
                        <button className="w-full bg-white rounded-lg p-4 border-2 border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-600 hover:border-primary-500 hover:text-primary-500">
                            <Plus className="w-4 h-4 mr-2" />Add Payment Method
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
