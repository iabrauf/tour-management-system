"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const ToursList = ({ toursList }) => {
    const router = useRouter();
    return (
        <div className="overflow-x-auto mt-20">
            <table className="table mx-5 w-[95%]">
                {/* head */}
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
                    {
                        toursList.map((tour, index) => {
                            return (
                                <tr key={tour.id}>
                                    <th>{index + 1}</th>
                                    <td>{tour.tourName}</td>
                                    <td>{tour.departureFrom}</td>
                                    <td>{tour.startDate}</td>
                                    <td>{tour.endDate}</td>
                                    <td>{tour.price}</td>
                                    <td onClick={() => router.push(`/tours/${tour.id}`)}>
                                        <button className='text-white bg-gradient-to-r from-[#ff8d54] to-[#ff5400] hover:bg-gradient-to-r hover:from-[#ff5400] hover:to-[#ff8d54] border-none p-4 text-center rounded-full'>
                                            Book Now
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ToursList