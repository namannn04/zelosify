import ContactForm from "./contact/ContactForm";

export default function ContactSection() {
  return (
    <div className="bg-gradient-to-b from-[#0F0720] to-[#0A051A] py-20 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Schedule Demo
            </span>
          </h2>
          <p className="text-purple-200/80 max-w-2xl mx-auto text-lg">
            To Maximize Contract Value - Book Your Zelosify Demo Now!
          </p>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </div>
  );
}
