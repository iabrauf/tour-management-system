import React from 'react'

const HeroSectionCard = ({ imageUrl, text }) => {
    return (
        <div className="bg-gray-100 p-2 rounded-lg hover:shadow-lg">
            <img
                className="h-32 w-40 object-cover mb-2 rounded-md"
                src={imageUrl}
                alt="card image"
            />
            <h2 className="text-md  text-center">{text}</h2>
        </div>
    )
}

export default HeroSectionCard