"use client";

import SupportSidebar from "@/components/SupportSidebar";
import { Download, Printer, Lock, Database, EyeOff, ShieldCheck, CheckCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <>
            <SupportSidebar />
            <div className="flex-1 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 relative">
                {/* Content Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Privacy Policy</h1>
                        <div className="flex items-center gap-3 text-sm font-medium">
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Effective Date: January 1, 2024
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center px-4 py-2 text-sm font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                            <Download className="w-4 h-4 mr-2" /> Download PDF
                        </button>
                        <button onClick={() => window.print()} className="flex items-center px-4 py-2 text-sm font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                            <Printer className="w-4 h-4 mr-2" /> Print
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start relative">
                    {/* Sticky Table of Contents */}
                    <div className="hidden lg:block w-64 shrink-0 sticky top-24">
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Table of Contents</h4>
                            <ul className="space-y-3 relative text-sm border-l border-gray-200">
                                <li><a href="#intro" className="block pl-4 -ml-[1px] border-l-2 border-primary-600 text-primary-700 font-bold transition-all">1. Introduction & Laws</a></li>
                                <li><a href="#collection" className="block pl-4 -ml-[1px] border-l-2 border-transparent text-gray-600 hover:text-gray-900 transition-all">2. Data We Collect</a></li>
                                <li><a href="#usage" className="block pl-4 -ml-[1px] border-l-2 border-transparent text-gray-600 hover:text-gray-900 transition-all">3. Use of Personal Data</a></li>
                                <li><a href="#sharing" className="block pl-4 -ml-[1px] border-l-2 border-transparent text-gray-600 hover:text-gray-900 transition-all">4. Information Sharing</a></li>
                                <li><a href="#security" className="block pl-4 -ml-[1px] border-l-2 border-transparent text-gray-600 hover:text-gray-900 transition-all">5. Data Security (SPDI Rules)</a></li>
                                <li><a href="#rights" className="block pl-4 -ml-[1px] border-l-2 border-transparent text-gray-600 hover:text-gray-900 transition-all">6. Your Rights</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Document Content */}
                    <article className="flex-1 text-gray-700 leading-relaxed font-medium space-y-12">
                        <div className="bg-blue-50 p-6 rounded-2xl text-sm text-blue-900 italic flex items-start gap-4">
                            <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5 text-blue-600" />
                            <p>
                                NukkadSeva is committed to protecting your privacy. This policy outlines our practices aligned with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 and the impending provisions of the Digital Personal Data Protection (DPDP) Act, 2023 of India.
                            </p>
                        </div>

                        <section id="intro" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="text-gray-300 text-3xl font-light">01</span> Introduction & Laws
                            </h2>
                            <p>
                                By accessing our application, you consent to the collection, storage, and processing of your personal information as described here. We function as a Data Fiduciary regarding the information collected to connect you with local service providers in India.
                            </p>
                        </section>

                        <section id="collection" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="text-gray-300 text-3xl font-light">02</span> Data We Collect
                            </h2>
                            <p className="mb-6">
                                We gather "Personal Information" and "Sensitive Personal Data or Information" (SPDI) strictly on a need-to-know basis to fulfill the service requested.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                                    <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Lock className="w-5 h-5 text-indigo-500" /> Profile Information</h5>
                                    <p className="text-xs text-gray-500">Name, Phone Number, Email, and Location (GPS or address provided during booking).</p>
                                </div>
                                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                                    <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Database className="w-5 h-5 text-indigo-500" /> Sensitive Info (SPDI)</h5>
                                    <p className="text-xs text-gray-500">Financial instrument details securely passed to PCI-DSS compliant RBI-approved gateways. We do not store full card numbers.</p>
                                </div>
                            </div>
                        </section>

                        <section id="usage" className="scroll-mt-24">
                            <div className="bg-[#1a365d] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                                <div className="absolute right-0 bottom-0 w-40 h-40 bg-white opacity-5 rounded-tl-full pointer-events-none"></div>
                                <h2 className="text-2xl font-bold mb-4 relative z-10">03. Use of Personal Data</h2>
                                <p className="mb-6 text-blue-100 text-sm leading-relaxed relative z-10">
                                    We use your data solely for lawful purposes connected with the functions of the platform. Under no circumstances do we sell your personal info to third-party marketing firms without explicit consent.
                                </p>
                                <ul className="space-y-3 text-sm font-semibold relative z-10">
                                    <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> To verify user/provider identity.</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> To dispatch service providers to your address.</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> To comply with law enforcement requests under Section 69 of IT Act.</li>
                                </ul>
                            </div>
                        </section>

                        <section id="sharing" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="text-gray-300 text-3xl font-light">04</span> Information Sharing
                            </h2>
                            <p className="mb-6">
                                Information is shared with verified Service Providers strictly for the execution of the booked job. We impose strict confidentiality agreements on our Providers preventing secondary use of your data.
                            </p>
                            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                                <h5 className="text-sm font-bold text-orange-900 mb-1 flex items-center"><EyeOff className="w-4 h-4 mr-2" /> Data Masking</h5>
                                <p className="text-xs text-orange-800">Where possible, phone numbers are masked over our VoIP calling feature to protect your anonymity during pre-service coordination.</p>
                            </div>
                        </section>

                        <section id="security" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="text-gray-300 text-3xl font-light">05</span> Data Security
                            </h2>
                            <p>
                                Per Rule 8 of the SPDI Rules, 2011, NukkadSeva employs reasonable security practices (including HTTPS encryption, strong access control mechanisms, and regular audits) to protect your personal data from unauthorized access or disclosure.
                            </p>
                        </section>

                        <section id="rights" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="text-gray-300 text-3xl font-light">06</span> Your Rights
                            </h2>
                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                                <ul className="list-disc pl-5 space-y-2 text-sm text-indigo-900 font-medium tracking-wide">
                                    <li>Right to request access to your personal information.</li>
                                    <li>Right to correct or update inaccurate/deficient data.</li>
                                    <li>Right to withdraw consent at any time, leading to account termination.</li>
                                </ul>
                                <p className="text-xs mt-4 text-indigo-800 font-semibold">
                                    To exercise any of these rights, email the Grievance Officer at grievance@nukkadseva.yusufjamal.in.
                                </p>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        </>
    );
}
