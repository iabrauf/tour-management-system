import Link from 'next/link'
import React from 'react'

const Tour = ({ id, type, title, location, price }) => {
    return (
        <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
            <Link href={`/tours/${id}`}
                className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
            >
                <div className="relative pb-48 overflow-hidden">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        alt=""
                    />
                </div>
                <div className="p-4">
                    <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                        {type}
                    </span>
                    <h2 className="mt-2 mb-2  font-bold">
                        {title}
                    </h2>
                    <p className="text-sm">
                        Location: {location}
                    </p>
                    <h2 className="mt-2 mb-2 text-orange-600 font-bold">
                        PKR: {price}
                    </h2>
                </div>
            </Link>
        </div>
    )
}

export default Tour