"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    providerName: string;
    serviceName: string;
}

export default function RatingModal({ isOpen, onClose, providerName, serviceName }: RatingModalProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [review, setReview] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        console.log({ rating, review, providerName, serviceName });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-sm shadow-xl">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-sm font-semibold text-gray-900">Rate Service</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
                </div>

                <div className="p-4">
                    <div className="text-center mb-4">
                        <p className="text-sm font-medium text-gray-900">{serviceName}</p>
                        <p className="text-xs text-gray-500">by {providerName}</p>
                    </div>

                    <div className="flex justify-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => setRating(star)}
                                className="p-1"
                            >
                                <Star className={`w-7 h-7 ${star <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Share your experience..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                <div className="flex gap-2 p-4 border-t">
                    <button onClick={onClose} className="flex-1 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSubmit} disabled={rating === 0} className="flex-1 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 disabled:opacity-50">Submit</button>
                </div>
            </div>
        </div>
    );
}
