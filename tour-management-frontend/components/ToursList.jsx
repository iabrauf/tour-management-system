import { Eye } from 'lucide-react';
import React from 'react'

const ToursList = () => {
    return (
        <div className="overflow-x-auto mt-20">
            <table className="table mx-5 w-[95%]">
                {/* head */}
                <thead>
                    <tr className='text-xl'>
                        <th>Sno.</th>
                        <th>Place Name</th>
                        <th>Departure from</th>
                        <th>Price Per person</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-base'>
                    {/* row 1 */}
                    <tr>
                        <th>1</th>
                        <td>Naran Kagan</td>
                        <td>Lahore</td>
                        <td>13000</td>
                        <td>
                            <p className='text-white bg-gradient-to-r from-[#ff8d54] to-[#ff5400] hover:bg-gradient-to-r hover:from-[#ff5400] hover:to-[#ff8d54] border-none py-4 text-center rounded-full'>Book Now</p>
                        </td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th>2</th>
                        <td>Naran Kagan</td>
                        <td>Lahore</td>
                        <td>13000</td>
                        <td>
                            <p className='text-white bg-gradient-to-r from-[#ff8d54] to-[#ff5400] hover:bg-gradient-to-r hover:from-[#ff5400] hover:to-[#ff8d54] border-none py-4 text-center rounded-full'>Book Now</p>
                        </td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <th>3</th>
                        <td>Naran Kagan</td>
                        <td>Lahore</td>
                        <td>13000</td>
                        <td>
                            <p className='text-white bg-gradient-to-r from-[#ff8d54] to-[#ff5400] hover:bg-gradient-to-r hover:from-[#ff5400] hover:to-[#ff8d54] border-none py-4 text-center rounded-full'>Book Now</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ToursList