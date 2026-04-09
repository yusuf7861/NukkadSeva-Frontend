import SupportHeader from "@/components/SupportHeader";
import Footer from "@/components/Footer";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <SupportHeader />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row">
                {children}
            </main>
            <Footer />
        </div>
    );
}
