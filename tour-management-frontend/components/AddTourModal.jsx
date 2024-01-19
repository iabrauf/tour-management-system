'use client';

// components/AddTourModal.js
import React, { useState } from "react";

const AddTourModal = ({ isOpen, onClose, onAddTour }) => {
    const [newTour, setNewTour] = useState({
        tourName: "",
        departureFrom: "",
        startDate: "",
        endDate: "",
        price: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTour((prevTour) => ({
            ...prevTour,
            [name]: value,
        }));
    };

    const handleAddTour = () => {
        // Perform any validation before adding the tour
        if (newTour.tourName && newTour.departureFrom && newTour.startDate && newTour.endDate && newTour.price >= 0) {
            onAddTour(newTour);
            setNewTour({
                tourName: "",
                departureFrom: "",
                startDate: "",
                endDate: "",
                price: "",
            });
            onClose();
        } else {
            // Handle validation error (e.g., show an error message)
            alert("Validation failed: Please fill in all fields");
        }
    };

    return (
        <div className={`z-10 fixed top-10 left-0 w-full h-full bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}>
            <div className="w-1/2 mx-auto mt-10 bg-white p-8 rounded-md z-50">
                <h2 className="text-2xl font-bold mb-4">Add New Tour</h2>

                <div className="mb-4">
                    <label htmlFor="tourName" className="block text-sm font-medium text-gray-600">
                        Tour Name
                    </label>
                    <input
                        type="text"
                        id="tourName"
                        name="tourName"
                        value={newTour.tourName}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="departureFrom" className="block text-sm font-medium text-gray-600">
                        Departure From
                    </label>
                    <input
                        type="text"
                        id="departureFrom"
                        name="departureFrom"
                        value={newTour.departureFrom}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={newTour.startDate}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={newTour.endDate}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={newTour.price}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleAddTour}
                    >
                        Add Tour
                    </button>
                    <button
                        className="ml-2 text-gray-600 hover:text-gray-800"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTourModal;
