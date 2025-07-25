import React from "react"
import { useEffect, useState } from "react"

const DemoForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyEmail: "",
    phone: "",
    companyName: "",
    bringsYou: "",
    heardAbout: "",
  })

  const [errors, setErrors] = useState({})
  const [progress, setProgress] = useState(0)

  // Calculate form completion progress
  useEffect(() => {
    const fields = Object.values(formData)
    const filledFields = fields.filter((field) => field.trim() !== "").length
    const newProgress = (filledFields / fields.length) * 100
    setProgress(newProgress)
  }, [formData])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Remove error message when user starts typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    })
  }

  const validateForm = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9]{10}$/

    if (!formData.name.trim()) newErrors.name = "Name is required."
    if (!formData.companyEmail.trim()) newErrors.companyEmail = "Company Email is required."
    else if (!emailRegex.test(formData.companyEmail)) newErrors.companyEmail = "Invalid email address."
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required."
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone Number must be 10 digits."
    if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required."
    if (!formData.bringsYou.trim()) newErrors.bringsYou = "What brings you to Zelosify is required."
    if (!formData.heardAbout.trim()) newErrors.heardAbout = "Please select how you heard about us."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form Submitted:", formData)
      alert("Form submitted successfully!")
    } else {
      console.log("Form has errors:", errors)
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 relative shadow-2xl border border-gray-200/50">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 rounded-t-3xl">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 transition-all duration-500 rounded-tl-3xl"
          style={{ width: `${progress}%` }}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="peer w-full px-4 py-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Name*"
          />
          <label
            htmlFor="name"
            className="absolute left-4 -top-6 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Name*
          </label>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="relative group">
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleInputChange}
            className="peer w-full px-4 py-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Company Email*"
          />
          <label
            htmlFor="companyEmail"
            className="absolute left-4 -top-6 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Company Email*
          </label>
          {errors.companyEmail && <p className="text-red-500 text-sm mt-1">{errors.companyEmail}</p>}
        </div>

        <div className="relative group">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="peer w-full px-4 py-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Phone Number*"
          />
          <label
            htmlFor="phone"
            className="absolute left-4 -top-6 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Phone Number*
          </label>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="relative group">
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="peer w-full px-4 py-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Company Name*"
          />
          <label
            htmlFor="companyName"
            className="absolute left-4 -top-6 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Company Name*
          </label>
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
        </div>

        <div className="relative group">
          <input
            type="text"
            name="bringsYou"
            value={formData.bringsYou}
            onChange={handleInputChange}
            className="peer w-full px-4 py-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="What brings you to Zelosify*"
          />
          <label
            htmlFor="bringsYou"
            className="absolute left-4 -top-6 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600"
          >
            What brings you to Zelosify*
          </label>
          {errors.bringsYou && <p className="text-red-500 text-sm mt-1">{errors.bringsYou}</p>}
        </div>

        <div className="relative group">
          <select
            name="heardAbout"
            value={formData.heardAbout}
            onChange={handleInputChange}
            className="peer w-full px-4 py-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="" disabled>
              How did you hear about us?*
            </option>
            <option value="Word of Mouth">Word of Mouth</option>
            <option value="Search Engine">Search Engine</option>
            <option value="News">News</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
          {errors.heardAbout && <p className="text-red-500 text-sm mt-1">{errors.heardAbout}</p>}
        </div>

        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold ${
            progress === 100 ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={progress !== 100}
        >
          Get Started
        </button>
      </form>
    </div>
  )
}

export default DemoForm
