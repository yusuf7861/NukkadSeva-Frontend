"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import toast from "react-hot-toast";

export default function SignupPage() {
    const { signup } = useAuth();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 2) {
            setStep(step + 1);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        setIsLoading(true);
        const loadingToast = toast.loading("Creating account...");
        try {
            await signup(formData.fullName, formData.email, formData.password, formData.phone);
            toast.success("Account created successfully!", { id: loadingToast });
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || "Signup failed. Please try again.";
            toast.error(errorMessage, { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    const formAnimation: Variants = {
        hidden: { opacity: 0, x: 20 },
        show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
    };

    return (
        <div className="min-h-screen flex font-sans overflow-hidden bg-white">
            {/* Left Panel - Form Container */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-8 md:px-12 lg:px-16 overflow-y-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto w-full"
                >
                    <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
                        <div className="bg-primary-50 p-2 rounded-xl group-hover:bg-primary-100 transition-colors">
                            <Image src="/logo.svg" alt="NukkadSeva Logo" width={32} height={32} className="object-contain" />
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-primary-600 transition-colors">NukkadSeva</span>
                    </Link>

                    {/* Progress Steps */}
                    <div className="flex items-center mb-8">
                        {[1, 2].map((s) => (
                            <div key={s} className="flex items-center">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        backgroundColor: step >= s ? "#137fec" : "#f3f4f6",
                                        color: step >= s ? "#ffffff" : "#9ca3af",
                                        scale: step === s ? 1.1 : 1
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm border border-transparent ${step === s ? "ring-4 ring-primary-50" : ""}`}
                                >
                                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                                </motion.div>
                                {s < 2 && (
                                    <div className="w-16 h-1 mx-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: step > s ? "100%" : "0%" }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="h-full bg-primary-500"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        <span className="ml-4 text-sm font-semibold text-primary-600">
                            {step === 1 ? "Personal Details" : "Security Check"}
                        </span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                            {step === 1 ? "Start your journey" : "Secure your account"}
                        </h1>
                        <p className="text-base text-gray-500">
                            {step === 1 ? "Join thousands connecting with trusted neighborhood professionals." : "Create a strong password to protect your bookings."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    variants={formAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                placeholder="e.g. John Doe"
                                                required
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="you@email.com"
                                                required
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+91 98765 43210"
                                                required
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    variants={formAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Create Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                placeholder="Min. 8 characters"
                                                required
                                                minLength={8}
                                                className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                                        <div className="relative group">
                                            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                placeholder="Repeat password"
                                                required
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <label className="flex items-start cursor-pointer group">
                                            <div className="relative flex items-center justify-center mt-1 mr-3">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.agreeTerms}
                                                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                                                    required
                                                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-white checked:bg-primary-500 checked:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all cursor-pointer"
                                                />
                                                <CheckCircle className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                                            </div>
                                            <span className="text-sm text-gray-600 leading-relaxed font-medium select-none">
                                                I confirm that I have read and agree to NukkadSeva's <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.
                                            </span>
                                        </label>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="pt-4 flex gap-3">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="px-6 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center active:scale-[0.98]"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-1" /> Back
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-primary-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Processing...
                                    </span>
                                ) : (
                                    <>
                                        {step < 2 ? "Continue to Security" : "Create Account"}
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="text-sm text-center text-gray-500 mt-8 font-medium">
                        Already have an account? <Link href="/login" className="text-primary-600 hover:text-primary-700 underline underline-offset-4 decoration-2 decoration-primary-200 hover:decoration-primary-600 transition-all">Log in here</Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Panel - Decorative Branding Cover */}
            <div className="hidden lg:flex w-1/2 relative bg-gray-900 items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2670&auto=format&fit=crop"
                        alt="Background Tools"
                        fill
                        className="object-cover opacity-30 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-primary-900/80 to-primary-600/60"></div>
                </div>

                <div className="relative z-10 w-full max-w-lg p-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl">
                            <div className="w-20 h-20 bg-primary-500 rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-white/30">
                                <ShieldCheck className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                                Your trusted neighborhood <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">service network.</span>
                            </h2>
                            <p className="text-lg text-primary-100/90 leading-relaxed font-medium">
                                Join our rapidly growing platform today to seamlessly connect with verified, high-quality professionals tailored for all your home improvement needs.
                            </p>

                            <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-8">
                                <div className="flex -space-x-3">
                                    <img className="w-10 h-10 rounded-full border-2 border-primary-800 object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                                    <img className="w-10 h-10 rounded-full border-2 border-primary-800 object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                                    <img className="w-10 h-10 rounded-full border-2 border-primary-800 object-cover" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
                                    <div className="w-10 h-10 rounded-full border-2 border-primary-800 bg-white flex items-center justify-center text-xs font-bold text-gray-900 z-10">4.8★</div>
                                </div>
                                <div className="text-sm font-medium text-white max-w-[150px]">
                                    Trust by over <span className="text-cyan-300 font-bold">10,000+</span> users globally
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
