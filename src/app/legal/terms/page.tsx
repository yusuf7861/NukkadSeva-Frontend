"use client";

import SupportSidebar from "@/components/SupportSidebar";
import { Download, Printer, CheckCircle, ShieldCheck, AlertCircle, ShieldAlert, Scale, UserCheck } from "lucide-react";

export default function TermsOfServicePage() {
    return (
        <>
            <SupportSidebar />
            <div className="flex-1 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 relative">
                {/* Content Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Terms of Service</h1>
                        <div className="flex items-center gap-3 text-sm font-medium">
                            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                Last Updated: October 24, 2024
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
                                <li><a href="#acceptance" className="block pl-4 -ml-[1px] border-l-2 border-primary-600 text-primary-700 font-bold transition-all">1. Acceptance of Terms</a></li>
                                <li><a href="#description" className="block pl-4 -ml-[1px] border-l-2 border-transparent text-gray-600 hover:text-gray-900 transition-all">2. Services & Platform Role</a></li>
                                <li><a href="#compliance" className="block pl-4 -ml-[1px] border-l-2 border-transparent text-gray-600 hover:text-gray-900 transition-all">3. Indian Legal Compliance</a></li>
                                <li><a href="#registration" className="block pl-4 -ml-[1px] border-l-2 border-transparent text-gray-600 hover:text-gray-900 transition-all">4. User Registration</a></li>
                                <li><a href="#fees" className="block pl-4 -ml-[1px] border-l-2 border-transparent text-gray-600 hover:text-gray-900 transition-all">5. Payments & Refunds</a></li>
                                <li><a href="#prohibited" className="block pl-4 -ml-[1px] border-l-2 border-transparent text-gray-600 hover:text-gray-900 transition-all">6. Prohibited Conduct</a></li>
                                <li><a href="#grievance" className="block pl-4 -ml-[1px] border-l-2 border-transparent text-gray-600 hover:text-gray-900 transition-all">7. Grievance Redressal</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Document Content */}
                    <article className="flex-1 text-gray-700 leading-relaxed font-medium space-y-12">
                        <div className="bg-gray-50 p-6 rounded-2xl text-sm text-gray-600 italic">
                            Please read these Terms of Service ("Terms") carefully before using the NukkadSeva platform. By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy, drafted in accordance with the laws of the Republic of India.
                        </div>

                        <section id="acceptance" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="text-gray-300 text-3xl font-light">01</span> Acceptance of Terms
                            </h2>
                            <p>
                                These Terms constitute a legally binding agreement between you (User or Service Provider) and NukkadSeva (operating as an internet marketplace). By using our website or mobile application, you represent that you are at least 18 years of age and competent to enter into a contract under the Indian Contract Act, 1872.
                            </p>
                        </section>

                        <section id="description" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="text-gray-300 text-3xl font-light">02</span> Services & Platform Role
                            </h2>
                            <p className="mb-6">
                                NukkadSeva acts strictly as an 'Intermediary' under Section 2(1)(w) of the Information Technology Act, 2000. We provide an online marketplace connecting independent local service professionals ("Pros") with consumers. We do not directly provide home services and are not liable for the individual actions of the Pros.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                    <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><UserCheck className="w-5 h-5 text-primary-600" /> Verification</h5>
                                    <p className="text-xs text-gray-500">We request Aadhaar/PAN validation for identity, but do not guarantee professional licensing status.</p>
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                    <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary-600" /> Secure Escrow</h5>
                                    <p className="text-xs text-gray-500">Payments are facilitated securely following RBI guidelines on payment settlement.</p>
                                </div>
                            </div>
                        </section>

                        <section id="compliance" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="text-gray-300 text-3xl font-light">03</span> Indian Legal Compliance
                            </h2>
                            <p>
                                NukkadSeva complies with the <strong>Consumer Protection (E-Commerce) Rules, 2020</strong>. As a marketplace entity, we mandate that our Service Providers maintain pricing transparency, do not engage in unfair trade practices, and clearly display cancellation/refund rules on their profiles.
                            </p>
                        </section>

                        <section id="registration" className="scroll-mt-24">
                            <div className="bg-[#112F5A] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                                <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-bl-full pointer-events-none"></div>
                                <h2 className="text-2xl font-bold mb-4 relative z-10">04. User Registration</h2>
                                <p className="mb-6 text-blue-100 text-sm leading-relaxed relative z-10">
                                    You must create an account via OTP verification to book or offer services. You are required to provide accurate information under the IT Act. Impersonation or creating fake accounts is a punishable offense under Section 66D of the IT Act, 2000.
                                </p>
                                <ul className="space-y-3 text-sm font-semibold relative z-10">
                                    <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /> Secure your login credentials & OTPs.</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /> Only one account permitted per mobile number.</li>
                                </ul>
                            </div>
                        </section>

                        <section id="fees" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="text-gray-300 text-3xl font-light">05</span> Payments & Refunds
                            </h2>
                            <p className="mb-6">
                                All payments inclusive of GST (where applicable) are processed securely. In accordance with consumer laws, refunds for unfulfilled services or provider no-shows will be processed back to the original source within 5-7 working days.
                            </p>
                            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                                <h5 className="text-sm font-bold text-green-900 mb-1 flex items-center"><Scale className="w-4 h-4 mr-2" /> Dispute Resolution</h5>
                                <p className="text-xs text-green-800">If a service significantly differs from what was agreed upon, raise a ticket within 48 hours for immediate mediation and potential refund.</p>
                            </div>
                        </section>

                        <section id="prohibited" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="text-gray-300 text-3xl font-light">06</span> Prohibited Conduct
                            </h2>
                            <div className="space-y-4">
                                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex gap-4 items-start">
                                    <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-sm">Circumvention & Cash Dealing</h5>
                                        <p className="text-xs text-gray-500 mt-1">Engaging in off-platform cash transactions with a Pro assigned through NukkadSeva voids all warranties and safety guarantees.</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex gap-4 items-start">
                                    <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-sm">Harassment & Discrimination</h5>
                                        <p className="text-xs text-gray-500 mt-1">Strict zero-tolerance policy against caste, religion, or gender-based discrimination or harassment of our service professionals.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="grievance" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="text-gray-300 text-3xl font-light">07</span> Grievance Redressal Mechanism
                            </h2>
                            <p className="mb-4">
                                In accordance with the Information Technology Act, 2000 and Consumer Protection (E-Commerce) Rules, 2020, NukkadSeva has appointed a Grievance Officer to address concerns.
                            </p>
                            <div className="bg-white border-l-4 border-primary-600 pl-4 py-2">
                                <p className="font-bold text-gray-900">Name: <span className="font-medium text-gray-600">Yusuf Jamal</span></p>
                                <p className="font-bold text-gray-900">Email: <span className="font-medium text-gray-600">grievance@nukkadseva.yusufjamal.in</span></p>
                                <p className="font-bold text-gray-900">Timeframe: <span className="font-medium text-gray-600">Acknowledgment within 48 hours, resolution within 1 month.</span></p>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        </>
    );
}
