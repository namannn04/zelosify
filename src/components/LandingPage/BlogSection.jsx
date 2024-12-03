import BlogImg1 from '../../assets/images/blog01.png'
import BlogImg2 from '../../assets/images/blog02.png'
import BlogImg3 from '../../assets/images/blog03.png'

export default function BlogSection() {
    const blogs = [
        {
            image: BlogImg1,
            categories: ["Design", "Engineering"],
            title: "Revolution in Content Creation and Communication",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipisic elit sed do eiusmod tempor incididunt ut labore et dolore magna oliumosd aliqua...",
            author: "Alex Demo",
            date: "25 Mar, 2025"
        },
        {
            image: BlogImg2,
            categories: ["Development", "Security"],
            title: "How AI Writing Tools Empower Writers to Speed up there Writing",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipisic elit sed do eiusmod tempor incididunt ut labore et dolore magna oliumosd aliqua...",
            author: "Hendary Jonson",
            date: "12 Feb, 2025"
        },
        {
            image: BlogImg3,
            categories: ["Products", "Blog and articles"],
            title: "Revolution in Content Creation and Communication",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipisic elit sed do eiusmod tempor incididunt ut labore et dolore magna oliumosd aliqua...",
            author: "Piter Mecraow",
            date: "10 Jan, 2025"
        }
    ]

    return (
        <div className="bg-[#0F0720] py-20 px-4 sm:px-32">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center bg-purple-900/30 px-4 py-2 rounded-full mb-8">
                        <span className="mr-2">✨</span>
                        <span className="text-purple-200">Read Our Latest Blogs</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Latest Blogs & News
                    </h2>

                    <p className="text-purple-200 max-w-3xl mx-auto text-lg">
                        Our AI writing tool is designed to empower you with exceptional writing capabilities, making
                        the writing process more efficient, accurate, and enjoyable.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <article
                            key={index}
                            className="group bg-[#0F071F]/50 rounded-3xl  hover:bg-[#0F071F] transition-colors duration-300"
                        >
                            <div className="relative h-44 overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000"
                                />
                            </div>

                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {blog.categories.map((category, catIndex) => (
                                        <span
                                            key={catIndex}
                                            className="px-3 py-1 bg-purple-900/30 rounded-full text-purple-200 text-sm"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>

                                {/* Title aligned to the left */}
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300 text-left">
                                    {blog.title}
                                </h3>

                                {/* Excerpt aligned to the left */}
                                <p className="text-purple-200 mb-6 text-left">
                                    {blog.excerpt}
                                </p>

                                <div className="flex text-sm text-purple-300">
                                    <div className="flex">
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        {blog.author}
                                    </div>
                                    <div className="flex items-center ml-4">
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        {blog.date}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Scroll to top button */}
            <button className="fixed bottom-8 right-8 bg-purple-600 p-3 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </div>
    )
}

