import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <Image src="/logo.svg" alt="NukkadSeva Logo" width={24} height={24} className="object-contain" />
                            <h3 className="text-lg font-bold text-white">NukkadSeva</h3>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                            Your trusted platform for local home services. Connect with verified professionals.
                        </p>
                        <div className="flex space-x-3">
                            <a href="https://instagram.com/siddique.raaj" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-primary-500 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://www.linkedin.com/in/yusuf-jamal-449142173" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-primary-500 transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm hover:text-primary-400 transition-colors">Home</Link></li>
                            <li><Link href="/providers" className="text-sm hover:text-primary-400 transition-colors">Services</Link></li>
                            <li><Link href="/providers" className="text-sm hover:text-primary-400 transition-colors">Providers</Link></li>
                            <li><Link href="/login" className="text-sm hover:text-primary-400 transition-colors">Login</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Services</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">Plumbing</a></li>
                            <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">Electrical</a></li>
                            <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">Painting</a></li>
                            <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">Cleaning</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center text-sm">
                                <Mail className="w-4 h-4 mr-2 text-primary-400" />
                                <a href="mailto:yjamal710@gmail.com" className="hover:text-primary-400 transition-colors">yjamal710@gmail.com</a>
                            </li>
                            <li className="flex items-center text-sm">
                                <Phone className="w-4 h-4 mr-2 text-primary-400" />
                                <a href="tel:+916200697127" className="hover:text-primary-400 transition-colors">+91 6200697127</a>
                            </li>
                            <li className="flex items-start text-sm">
                                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                                Lucknow, India
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-6 border-gray-800" />

                <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} NukkadSeva. All rights reserved.</p>
                    <div className="flex space-x-4 mt-3 md:mt-0">
                        <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
