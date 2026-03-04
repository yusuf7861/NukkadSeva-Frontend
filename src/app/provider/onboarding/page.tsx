"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProviderRegistrationData } from "@/types/backend";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

const INDIAN_STATES_CITIES: Record<string, string[]> = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kakinada"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang"],
    "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Silchar"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
    "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Mandi"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belgaum"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur"],
    "Meghalaya": ["Shillong", "Tura", "Jowai"],
    "Mizoram": ["Aizawl", "Lunglei"],
    "Nagaland": ["Kohima", "Dimapur"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    "Sikkim": ["Gangtok", "Namchi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    "Tripura": ["Agartala", "Udaipur"],
    "Uttar Pradesh": ["Lucknow", "Noida", "Varanasi", "Agra", "Kanpur", "Prayagraj"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
};

const AVAILABILITY_OPTIONS = [
    "Monday-Friday, 9AM-5PM",
    "Monday-Friday, 9AM-9PM",
    "Monday-Saturday, 9AM-6PM",
    "Monday-Saturday, 8AM-8PM",
    "All Days, 9AM-5PM",
    "All Days, 8AM-10PM",
    "Weekends Only",
    "24/7 Available",
    "Flexible / On-Call",
];

const LANGUAGES = [
    "English",
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Urdu",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Odia",
    "Punjabi",
    "Assamese",
];

export default function ProviderOnboardingPage() {
    const { registerProvider } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

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
        availability: "",
        agreeToS: false,
        agreeToBgCheck: false
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => {
            const updated = { ...prev, [name]: type === 'checkbox' ? checked : value };
            // Reset city when state changes
            if (name === 'state') {
                updated.city = '';
            }
            return updated;
        });
    };

    const toggleLanguage = (lang: string) => {
        setFormData(prev => {
            const current = prev.languages ? prev.languages.split(", ").filter(Boolean) : [];
            const updated = current.includes(lang)
                ? current.filter(l => l !== lang)
                : [...current, lang];
            return { ...prev, languages: updated.join(", ") };
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];

            if (!file.type.startsWith("image/")) {
                toast.error("Only image files are allowed.");
                e.target.value = "";
                return;
            }
            if (file.size > 204800) {
                toast.error("File size must be less than 200KB.");
                e.target.value = "";
                return;
            }

            setFormData(prev => ({
                ...prev,
                [name]: file
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        const loadingToast = toast.loading("Submitting application...");

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
            toast.success("Application submitted successfully!", { id: loadingToast });
            router.push("/provider/verify-email?sent=true");

        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to register. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage, { id: loadingToast });
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
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary-50 p-2 rounded-xl group-hover:bg-primary-100 transition-colors">
                            <Image src="/brand-logo.png" alt="NukkadSeva" width={28} height={28} className="object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <Image src="/brand-text.png" alt="NukkadSeva" width={110} height={26} className="h-5 w-auto object-contain" />
                            <span className="text-[10px] font-semibold text-primary-500 uppercase tracking-wider">Provider Onboarding</span>
                        </div>
                    </Link>
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
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                                            <select name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 appearance-none">
                                                <option value="">Select State</option>
                                                {Object.keys(INDIAN_STATES_CITIES).map(state => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                            <select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.state} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 appearance-none disabled:opacity-50 disabled:cursor-not-allowed">
                                                <option value="">{formData.state ? "Select City" : "Select state first"}</option>
                                                {formData.state && INDIAN_STATES_CITIES[formData.state]?.map(city => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                                            <input name="pincode" value={formData.pincode} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500" placeholder="110001" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture</label>
                                        <input name="profilePicture" type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
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
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Languages Spoken</label>
                                        <button
                                            type="button"
                                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-left outline-none focus:ring-2 focus:ring-primary-500 flex items-center justify-between"
                                        >
                                            <span className="flex flex-wrap gap-1.5">
                                                {formData.languages ? (
                                                    formData.languages.split(", ").filter(Boolean).map(lang => (
                                                        <span key={lang} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary-100 text-primary-700">
                                                            {lang}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400">Select languages...</span>
                                                )}
                                            </span>
                                            <svg className={`w-4 h-4 text-gray-500 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {langDropdownOpen && (
                                            <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                                {LANGUAGES.map(lang => {
                                                    const selected = formData.languages.split(", ").filter(Boolean).includes(lang);
                                                    return (
                                                        <label
                                                            key={lang}
                                                            className="flex items-center px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={selected}
                                                                onChange={() => toggleLanguage(lang)}
                                                                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                                                            />
                                                            <span className="ml-3 text-sm text-gray-700">{lang}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        <input type="hidden" name="languages" value={formData.languages} required />
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
                                            <select name="availability" value={formData.availability} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 appearance-none">
                                                <option value="">Select Availability</option>
                                                {AVAILABILITY_OPTIONS.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
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
                                            <input name="govtId" type="file" accept="image/*" onChange={handleFileChange} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Qualification Certificate</label>
                                            <input name="qualification" type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Police Verification Document</label>
                                            <input name="policeVerification" type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Formal Photograph</label>
                                            <input name="photograph" type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
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
