'use client';

import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import Tour from "./Tour";
import { useRouter } from 'next/navigation';
import axios from "axios";

const Home = () => {
    const [toursList, setToursList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/Tour`);
                setToursList(response.data);
            } catch (error) {
                setError(error.response ? error.response.data : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    const router = useRouter();

    return (
        <section className="h-auto">
            <HeroSection />
            <div className="p-10 ">
                <div className="py-12">
                    <h2 className="text-5xl font-bold text-center space-x-3 mb-3">Popular <span className="text-green-700">Pakistan</span>
                        <span className="text-orange-600">Tours</span></h2>
                    <p className="text-center">Best Northern Areas of Pakistan Trips</p>
                </div>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <>
                        <div className="flex flex-wrap">
                            {toursList.map((tour, index) => (
                                <Tour key={tour.id} id={tour.id} type='popular' title={tour.tourName} location={tour.departureFrom} price={tour.price} />
                            ))}
                        </div>
                        <div className="flex items-center justify-center mt-5">
                            <button
                                className="btn text-white bg-gradient-to-r from-[#ff8d54] to-[#ff5400] hover:bg-gradient-to-r hover:from-[#ff5400] hover:to-[#ff8d54] border-none"
                                onClick={() => router.push('/tours')}
                            >
                                View All Tours
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Home;
