import HeroSection from "./HeroSection"
import Tour from "./Tour"

const Home = () => {
    return (
        <section className="h-auto">
            <HeroSection />
            <div className="p-10 ">
                <div classNamxe="py-12">
                    <h2 className="text-5xl font-bold text-center space-x-3 mb-3">Popular <span className="text-green-700">Pakistan</span>
                        <span className="text-orange-600">Tours</span></h2>
                    <p className="text-center">Best Northern Areas of Pakistan Trips</p>
                </div>
                <div className="flex flex-wrap">
                    <Tour type='popular' title='8 Days Tour To Skardu' location="Karachi" price="45,000" />
                    <Tour type='popular' title='8 Days Tour To Skardu' location="Karachi" price="45,000" />
                    <Tour type='popular' title='8 Days Tour To Skardu' location="Karachi" price="45,000" />
                    <Tour type='popular' title='8 Days Tour To Skardu' location="Karachi" price="45,000" />
                </div>
                <div className="flex items-center justify-center mt-5">
                    <button className="btn text-white bg-gradient-to-r from-[#ff8d54] to-[#ff5400] hover:bg-gradient-to-r hover:from-[#ff5400] hover:to-[#ff8d54] border-none">View All Tours</button>
                </div>
            </div>



        </section>
    )
}

export default Home