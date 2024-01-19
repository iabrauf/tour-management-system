"use client"

import React, { useState, useEffect } from "react";

const EditTourModal = ({ isOpen, onClose, onUpdateTour, currentTour }) => {
    const [editedTour, setEditedTour] = useState({
        tourName: "",
        departureFrom: "",
        startDate: "",
        endDate: "",
        price: "",
    });

    useEffect(() => {
        // Update the editedTour state when the currentTour changes
        setEditedTour({
            tourName: currentTour?.tourName,
            departureFrom: currentTour?.departureFrom,
            startDate: currentTour?.startDate,
            endDate: currentTour?.endDate,
            price: currentTour?.price,
        });
    }, [currentTour]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTour((prevTour) => ({
            ...prevTour,
            [name]: value,
        }));
    };

    const handleUpdateTour = () => {
        if (
            editedTour.tourName &&
            editedTour.departureFrom &&
            editedTour.startDate &&
            editedTour.endDate &&
            editedTour.price >= 0
        ) {
            onUpdateTour({ ...currentTour, ...editedTour });
            onClose();
        } else {
            // Handle validation error (e.g., show an error message)
            alert("Validation failed: Please fill in all fields");
        }
    };

    return (
        <div
            className={`z-10 fixed top-10 left-0 w-full h-full bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}
        >
            <div className="w-1/2 mx-auto mt-10 bg-white p-8 rounded-md z-50">
                <h2 className="text-2xl font-bold mb-4">Edit Tour</h2>

                {/* Tour Name Input */}
                <div className="mb-4">
                    <label htmlFor="tourName" className="block text-sm font-medium text-gray-600">
                        Tour Name
                    </label>
                    <input
                        type="text"
                        id="tourName"
                        name="tourName"
                        value={editedTour.tourName}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                {/* Departure From Input */}
                <div className="mb-4">
                    <label htmlFor="departureFrom" className="block text-sm font-medium text-gray-600">
                        Departure From
                    </label>
                    <input
                        type="text"
                        id="departureFrom"
                        name="departureFrom"
                        value={editedTour.departureFrom}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                {/* Start Date Input */}
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={editedTour.startDate}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                {/* End Date Input */}
                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={editedTour.endDate}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                {/* Price Input */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={editedTour.price}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>


                {/* Action Buttons */}
                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleUpdateTour}
                    >
                        Update Tour
                    </button>
                    <button className="ml-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTourModal;
