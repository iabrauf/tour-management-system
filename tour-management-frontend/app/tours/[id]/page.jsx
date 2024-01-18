"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


function BookingPage({ params }) {
    const { id } = params;
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {
        setLoading(true);

        // Simulate API call or backend processing
        try {
            // Simulate a delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('Booking successful!');
            router.push('/tours');
        } catch (error) {
            alert('Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-28 mb-40">
            <h1 className="text-4xl font-bold mb-6">Book Your Trip</h1>
            <p className="text-gray-600 mb-6">
                You are booking a trip with ID: <span className="font-semibold">{id}</span>
            </p>
            <div className="flex items-center justify-center">
                <button
                    onClick={handleBooking}
                    disabled={loading}
                    className={`text-white bg-gradient-to-r from-[#ff8d54] to-[#ff5400] hover:bg-gradient-to-r hover:from-[#ff5400] hover:to-[#ff8d54] border-none p-4 text-center rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Booking in progress...' : 'Confirm Booking'}
                </button>
            </div>
        </div>
    );
}

export default BookingPage;
