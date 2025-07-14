import ContactForm from "./contact-form"

export default function ContactSection() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-200/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
            Get Started Today
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-900">
            Schedule Your{' '}
            <span className="font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent"
                  style={{ 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: 'inherit',
                    lineHeight: 'inherit'
                  }}>
              Demo
            </span>
          </h2>
          
          <p className="text-gray-600 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed font-medium">
            Maximize Contract Value - Discover How Zelosify Can Transform Your Business
          </p>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </div>
  )
}
