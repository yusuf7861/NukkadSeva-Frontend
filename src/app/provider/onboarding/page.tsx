"use client";

import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProviderRegistrationData } from "@/types/backend";
import { useRouter } from "next/navigation";

export default function ProviderOnboardingPage() {
    const { registerProvider } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<ProviderRegistrationData>({
        fullName: "",
        dob: "",
        mobileNumber: "",
        email: "",
        photograph: null,
        businessName: "",
        serviceCategory: "",
        serviceArea: "25",
        experience: 0,
        languages: "",
        fullAddress: "",
        state: "",
        city: "",
        pincode: "",
        govtId: null,
        gstin: "",
        qualification: null,
        policeVerification: null,
        bio: "",
        profilePicture: null,
        availability: "Monday-Friday, 9AM-5PM",
        agreeToS: false,
        agreeToBgCheck: false
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null) {
                    if (typeof value === 'boolean') {
                        data.append(key, String(value));
                    } else if (value instanceof File) {
                        data.append(key, value);
                    } else {
                        data.append(key, String(value));
                    }
                }
            });

            await registerProvider(data);
            router.push("/provider/verify-email?sent=true");

        } catch (err: any) {
            setError(err.message || "Failed to register. Please try again.");
            setIsLoading(false);
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans transition-colors duration-300">
            {/* Top Navigation Bar */}
            <header className="w-full border-b border-gray-200 bg-white px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-500 p-2 rounded-lg">
                            <span className="material-symbols-outlined text-white">build</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">ProFix Onboarding</h2>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-start pt-12 px-4 pb-12">
                <div className="w-full max-w-[800px]">
                    {/* Progress Tracker */}
                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Step {step} of 3</span>
                                <h3 className="text-lg font-bold text-gray-900">
                                    {step === 1 && "Personal & Contact Details"}
                                    {step === 2 && "Business Information"}
                                    {step === 3 && "Documents & Agreements"}
                                </h3>
                            </div>
                            <span className="text-gray-500 text-sm font-medium">{Math.round((step / 3) * 100)}% Complete</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                                style={{ width: `${(step / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* STEP 1: Personal Details */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                            <input name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                                            <input name="dob" type="date" value={formData.dob} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                                            <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" placeholder="+1234567890" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                            <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Residential Address</label>
                                        <textarea name="fullAddress" value={formData.fullAddress} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" placeholder="123 Main St, Apt 4B" rows={3} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                            <input name="city" value={formData.city} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" placeholder="New York" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                                            <input name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" placeholder="NY" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                                            <input name="pincode" value={formData.pincode} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" placeholder="10001" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture</label>
                                        <input name="profilePicture" type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Business Info */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                                        <input name="businessName" value={formData.businessName} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. John's Plumbing" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Category</label>
                                            <select name="serviceCategory" value={formData.serviceCategory} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500">
                                                <option value="">Select Category</option>
                                                <option value="PLUMBING">Plumbing</option>
                                                <option value="ELECTRICAL">Electrical</option>
                                                <option value="CLEANING">Cleaning</option>
                                                <option value="CARPENTRY">Carpentry</option>
                                                <option value="PAINTING">Painting</option>
                                                <option value="REPAIRS">Repairs</option>
                                                <option value="APPLIANCE_REPAIRS">Appliance Repairs</option>
                                                <option value="COOKING_SERVICES">Cooking Services</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                                            <input name="experience" type="number" min="0" value={formData.experience} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Languages (Comma separated)</label>
                                        <input name="languages" value={formData.languages} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" placeholder="English, Spanish" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bio / Description</label>
                                        <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" rows={4} placeholder="Describe your services..." />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">GSTIN (Optional)</label>
                                            <input name="gstin" value={formData.gstin} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
                                            <input name="availability" value={formData.availability} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. Mon-Fri 9-5" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Documents & Agreements */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg text-sm text-orange-800">
                                        Please upload clear images or PDFs for verification.
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Govt ID Proof (Aadhaar/PAN)</label>
                                            <input name="govtId" type="file" onChange={handleFileChange} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Qualification Certificate</label>
                                            <input name="qualification" type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Police Verification Document</label>
                                            <input name="policeVerification" type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Formal Photograph</label>
                                            <input name="photograph" type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                name="agreeToS"
                                                checked={formData.agreeToS}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                            />
                                            <label className="text-sm text-gray-600">
                                                I agree to the <Link href="/terms" className="text-primary-500 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary-500 hover:underline">Privacy Policy</Link>.
                                            </label>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                name="agreeToBgCheck"
                                                checked={formData.agreeToBgCheck}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                            />
                                            <label className="text-sm text-gray-600">
                                                I consent to a background check as part of the verification process.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="pt-6 flex justify-between">
                                {step > 1 ? (
                                    <button onClick={prevStep} type="button" className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                                        Back
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                {step < 3 ? (
                                    <button onClick={nextStep} type="button" className="px-8 py-2.5 rounded-lg bg-primary-500 text-white font-bold hover:bg-primary-600 transition-colors flex items-center gap-2">
                                        Next <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                ) : (
                                    <button disabled={isLoading} type="submit" className="px-8 py-2.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                        {isLoading ? "Submitting..." : "Submit Application"}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
