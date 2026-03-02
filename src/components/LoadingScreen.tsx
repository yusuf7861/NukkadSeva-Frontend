import Image from "next/image";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div className="text-center">
                <div className="mx-auto mb-2 animate-pulse flex justify-center">
                    <Image src="/brand-logo.png" alt="NukkadSeva" width={64} height={64} className="object-contain" />
                </div>
                <div className="flex justify-center mb-1">
                    <Image src="/brand-text.png" alt="NukkadSeva" width={140} height={36} className="h-7 w-auto object-contain" />
                </div>
                <p className="text-gray-500">Loading...</p>
                <div className="mt-6 flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
            </div>
        </div>
    );
}
