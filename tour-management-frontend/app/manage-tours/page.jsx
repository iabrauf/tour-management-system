'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash } from "lucide-react";
import AddTourModal from "../../components/AddTourModal";
import EditTourModal from "../../components/EditTourModal";
import { useRouter } from "next/navigation";
import { isAdmin } from "../utils/Auth";

function Page() {
    const [toursList, setToursList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);  // Separate state for AddTourModal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);  // Separate state for EditTourModal
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const [selectedTourForEdit, setSelectedTourForEdit] = useState(null);

    const handleEditTourModalOpen = (tour) => {
        setSelectedTourForEdit(tour);
        setIsEditModalOpen(true);
    };

    const router = useRouter();
    const fetchTours = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/tour`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setToursList(response.data);
        } catch (error) {
            setError(error.response ? error.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Redirect to login if user is not admin
        if (!isAdmin()) {
            router.push('/tours');
        }
        fetchTours();
    }, []);

    const addTour = async (newTour) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_URL}/api/Tour/addTour`,
                newTour,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setToursList((prevToursList) => [...prevToursList, response.data]);
            fetchTours();
        } catch (error) {
            setError(error.response ? error.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const deleteTour = async (tourId) => {
        try {
            setLoading(true);
            await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/Tour/deleteTour/${tourId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setToursList((prevToursList) => prevToursList.filter((tour) => tour.id !== tourId));
            fetchTours();
        } catch (error) {
            console.error("Delete Tour Error:", error);
            setError(error.response ? error.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const updateTour = async (updatedTour) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/Tour/updateTour/${updatedTour.id}`, updatedTour, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setToursList((prevToursList) => prevToursList.map((tour) => (tour.id === updatedTour.id ? response.data : tour)));
            fetchTours();
        } catch (error) {
            setError(error.response ? error.response.data : "An error occurred");
        }
    };

    return (
        <div className="mt-24 z-10">
            <AddTourModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddTour={addTour}
            />
            <EditTourModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedTourForEdit(null); // Clear the selected tour when the modal is closed
                }}
                onUpdateTour={updateTour}
                currentTour={selectedTourForEdit}
            />
            <button
                className="float-right p-2 bg-blue-500 text-white rounded-lg mr-5"
                onClick={() => setIsAddModalOpen(true)}
            >
                Add New Tour
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="ml-2">{error}</p>
            ) : (
                <div className="mt-5">
                    <div className="overflow-x-auto mt-20">
                        <table className="table mx-5 w-[95%]">
                            <thead>
                                <tr className='text-xl'>
                                    <th>Sno.</th>
                                    <th>Place Name</th>
                                    <th>Departure from</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Price Per person</th>
                                    <th className='pl-5'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='text-base'>
                                {toursList.map((tour, index) => (
                                    <tr key={tour.id}>
                                        <th>{index + 1}</th>
                                        <td>{tour.tourName}</td>
                                        <td>{tour.departureFrom}</td>
                                        <td>{tour.startDate}</td>
                                        <td>{tour.endDate}</td>
                                        <td>{tour.price}</td>
                                        <td className="flex items-center gap-2">
                                            <div className="p-1 bg-green-200 cursor-pointer rounded-md" onClick={() => handleEditTourModalOpen(tour)}>
                                                <Edit color='green' />
                                            </div>
                                            <div className="p-1 bg-red-200 cursor-pointer rounded-md" onClick={() => deleteTour(tour.id)}>
                                                <Trash color='red' />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
