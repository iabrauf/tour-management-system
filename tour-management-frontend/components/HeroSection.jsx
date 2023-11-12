import React from 'react'
import HeroSectionCard from './HeroSectionCard'

const HeroSection = () => {
    return (
        <div className="md:px-24 px-5 pt-28 pb-16 bg-gray-100">
            <div className="hero h-full rounded-2xl flex justify-start items-start md:p-12" style={{ backgroundImage: 'url(https://cdn.tourradar.com/s3/content-pages/391/1320x350/T50mbt.jpg)' }}>
                <div className="hero-content text-center text-neutral-content flex flex-col justify-start items-start">
                    <button className="rounded-lg p-1 text-white bg-gradient-to-r from-[#ff5400] to-[#ff8d54] border-none">Book With Us!</button>
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-semibold text-left">Find Next Place
                            To <span className="text-[#ff7f00]">Visit</span></h1>
                        <p className="mb-5 text-left">Discover amzaing places at exclusive deals.
                            Eat, Shop, Visit interesting places around the world.</p>
                    </div>
                </div>
            </div>
            <div className="relative px-4 -mt-14 md:block hidden">
                <div className="flex item-center justify-between">
                    <HeroSectionCard imageUrl='https://cdn.tourradar.com/s3/content-pages/391/438x292/XIIFl3.jpg'
                        text="Hiking & Trekking" />
                    <HeroSectionCard imageUrl='https://cdn.tourradar.com/s3/content-pages/391/438x292/hUH1Mm.jpg'
                        text="Breakfats & Bbq" />
                    <HeroSectionCard imageUrl='https://cdn.tourradar.com/s3/content-pages/391/438x292/GvuRB6.jpg'
                        text="Lake Cruise" />
                    <HeroSectionCard imageUrl='https://cdn.tourradar.com/s3/content-pages/391/438x292/mLUEbJ.jpg'
                        text="Cultural" />
                    <HeroSectionCard imageUrl='https://plus.unsplash.com/premium_photo-1695396321790-17de69145a39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        text="Bonfire" />
                </div>
            </div>
        </div >
    )
}

export default HeroSection