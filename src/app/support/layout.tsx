import SupportHeader from "@/components/SupportHeader";
import Footer from "@/components/Footer";

export default function SupportLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <SupportHeader />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
            <Footer />
        </div>
    );
}
