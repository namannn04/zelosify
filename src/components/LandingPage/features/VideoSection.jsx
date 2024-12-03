


export default function VideoSection() {
    return (
        <div className="min-h-screen  bg-[#0F0720] pt-24">
     

            <div className="w-full px-4 py-12 md:py-20 bg-[#1A1033]/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                        See AI Tool in Action
                    </h3>

                    <div className="relative aspect-video rounded-xl overflow-hidden bg-[#12071A]">
                        <video
                            className="w-full h-full object-cover"
                            controls
                            poster="/placeholder.svg?height=480&width=854"
                        >
                            <source src="/demo-video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Play Button Overlay */}
                        <button className="absolute inset-0 flex items-center justify-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-purple-600/90 group-hover:bg-purple-600 transition-colors duration-300">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    <p className="mt-6 text-purple-200">
                        Watch how AI Tool can transform your writing process and boost your productivity.
                    </p>
                </div>
            </div>
           
        </div>
    )
}

