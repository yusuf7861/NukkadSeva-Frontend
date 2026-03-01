"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import Link from "next/link";
import { Search, MapPin, Star, Shield, Clock, ArrowRight, CheckCircle, Award, Wrench, Zap, Paintbrush, Sparkles, Hammer, Snowflake } from "lucide-react";
import { PublicCityResponse } from "@/types/backend";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const services = [
    { name: "Plumbing", icon: Wrench, color: "bg-blue-50 text-blue-600 border-blue-100" },
    { name: "Electrical", icon: Zap, color: "bg-yellow-50 text-yellow-600 border-yellow-100" },
    { name: "Painting", icon: Paintbrush, color: "bg-pink-50 text-pink-600 border-pink-100" },
    { name: "Cleaning", icon: Sparkles, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { name: "Carpentry", icon: Hammer, color: "bg-amber-50 text-amber-600 border-amber-100" },
    { name: "AC Repair", icon: Snowflake, color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
];

const features = [
    { icon: Shield, title: "Verified Professionals", desc: "Every provider undergoes a strict background check for your safety." },
    { icon: Clock, title: "Lightning Fast Response", desc: "Book instantly and get service delivered within hours." },
    { icon: Star, title: "Premium Quality", desc: "Top-rated professionals delivering exceptional workmanship." },
    { icon: Award, title: "Satisfaction Guarantee", desc: "We ensure you are 100% satisfied with the service provided." }
];

const topProviders = [
    { name: "Rajesh Kumar", service: "Master Plumber", rating: 4.8, reviews: 124, image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Amit Singh", service: "Electrical Expert", rating: 4.9, reviews: 89, image: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Priya Sharma", service: "Interior Painter", rating: 4.7, reviews: 67, image: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "Deepak Verma", service: "HVAC Specialist", rating: 4.8, reviews: 92, image: "https://randomuser.me/api/portraits/men/67.jpg" },
];

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const fadeUpItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function HomePage() {
    const router = useRouter();
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedPincode, setSelectedPincode] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [citiesData, setCitiesData] = useState<PublicCityResponse[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const { data } = await api.get<PublicCityResponse[]>("/public/providers/cities");
                setCitiesData(data);
            } catch (error) {
                console.error("Failed to fetch cities", error);
            }
        };
        fetchCities();
    }, []);

    const pincodes = useMemo(() => {
        if (!selectedCity) return [];
        const city = citiesData.find((c) => c.cityName === selectedCity);
        return city?.pincodes || [];
    }, [selectedCity, citiesData]);

    useEffect(() => {
        setSelectedPincode("");
    }, [selectedCity]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selectedCity) params.append("city", selectedCity);
        if (selectedPincode) params.append("pincode", selectedPincode);
        if (searchTerm) params.append("search", searchTerm);
        router.push(`/providers${params.toString() ? `?${params.toString()}` : ""}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 overflow-hidden font-sans">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-white pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-100/50 blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-cyan-100/30 blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6 border border-primary-100 shadow-sm">
                                🌟 #1 Local Services Platform in India
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                                Expert Local Services,<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-cyan-500">
                                    Delivered to Your Door.
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
                                Book verified professionals for plumbing, electrical, painting, and more. Experience quick, reliable, and premium service.
                            </p>
                        </motion.div>

                        {/* Search Bar - Glassmorphism */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/40 max-w-4xl mx-auto"
                        >
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="relative md:w-48 group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-primary-500 transition-colors" />
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        className="w-full pl-11 pr-8 py-3.5 rounded-xl border border-gray-200 text-gray-800 outline-none focus:ring-2 focus:ring-primary-500 transition appearance-none bg-gray-50/50 hover:bg-white cursor-pointer"
                                    >
                                        <option value="">Select City</option>
                                        {citiesData.map((city) => (
                                            <option key={city.cityName} value={city.cityName}>{city.cityName}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>

                                <div className="relative md:w-48 group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-primary-500 transition-colors" />
                                    <select
                                        value={selectedPincode}
                                        onChange={(e) => setSelectedPincode(e.target.value)}
                                        disabled={!selectedCity}
                                        className="w-full pl-11 pr-8 py-3.5 rounded-xl border border-gray-200 text-gray-800 outline-none focus:ring-2 focus:ring-primary-500 transition appearance-none bg-gray-50/50 hover:bg-white cursor-pointer disabled:opacity-50"
                                    >
                                        <option value="">{selectedCity ? "Select Area" : "Select City First"}</option>
                                        {pincodes.map((pin) => (
                                            <option key={pin.pincode} value={pin.pincode}>
                                                {pin.pincode}{pin.areaName ? ` - ${pin.areaName}` : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>

                                <div className="relative flex-1 group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-primary-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="What service do you need?"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-gray-800 outline-none focus:ring-2 focus:ring-primary-500 transition bg-gray-50/50 hover:bg-white"
                                    />
                                </div>

                                <button
                                    onClick={handleSearch}
                                    className="bg-primary-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 transition-all active:scale-95 whitespace-nowrap text-lg"
                                >
                                    Find Providers
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Popular Services Section */}
            <section className="py-16 md:py-24 bg-gray-50 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Most Requested Services</h2>
                        <p className="text-gray-500">Explore our most popular home service categories.</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
                    >
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <motion.div key={service.name} variants={fadeUpItem}>
                                    <Link
                                        href={`/providers?category=${service.name}`}
                                        className={`group flex flex-col items-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-2`}
                                    >
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${service.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                            <Icon className="w-8 h-8" strokeWidth={1.5} />
                                        </div>
                                        <span className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors">{service.name}</span>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Features */}
            <section className="py-16 md:py-24 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">The NukkadSeva Advantage</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">We provide premium end-to-end home service experiences securely and transparently.</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div key={feature.title} variants={fadeUpItem} className="text-center group">
                                    <div className="w-20 h-20 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-300 shadow-sm border border-primary-100">
                                        <Icon className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Top Providers Showcase */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Elite Professionals</h2>
                            <p className="text-gray-500">Meet our highest-rated service partners.</p>
                        </div>
                        <Link href="/providers" className="group inline-flex items-center text-primary-600 font-bold hover:text-primary-700 transition-colors">
                            View All Providers
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {topProviders.map((provider) => (
                            <motion.div key={provider.name} variants={fadeUpItem}>
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                    <div className="relative mb-6 inline-block w-full text-center">
                                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary-50 group-hover:border-primary-100 transition-colors relative">
                                            <Image src={provider.image} alt={provider.name} fill sizes="96px" className="object-cover" />
                                        </div>
                                        <div className="absolute bottom-0 right-1/2 translate-x-12 bg-white rounded-full p-1 shadow-sm">
                                            <CheckCircle className="w-6 h-6 text-primary-500 fill-primary-50" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{provider.name}</h3>
                                    <p className="text-sm font-medium text-gray-500 text-center mb-4">{provider.service}</p>

                                    <div className="flex items-center justify-center gap-1.5 bg-yellow-50 py-2 rounded-lg mb-4 text-yellow-700 font-bold">
                                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                        <span>{provider.rating}</span>
                                        <span className="text-yellow-600/60 font-medium">({provider.reviews} reviews)</span>
                                    </div>

                                    <Link href="/providers/1" className="block w-full text-center py-2.5 rounded-xl border-2 border-primary-50 text-primary-600 font-bold group-hover:bg-primary-50 transition-colors">
                                        View Profile
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Animated CTA Area */}
            <section className="relative py-20 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-600 via-gray-900 to-gray-900"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                            Elevate Your Local Service Experience
                        </h2>
                        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                            Join thousands connecting with trusted neighborhood professionals. Quick onboarding, immediate access.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary-500 text-white font-bold text-lg hover:bg-primary-400 transition-colors shadow-lg shadow-primary-500/30">
                                Create Free Account
                            </Link>
                            <Link href="/providers" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-800 text-white font-bold text-lg hover:bg-gray-700 transition-colors border border-gray-700">
                                Browse Services
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
