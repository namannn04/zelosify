import Image from "next/image"

export default function WorkflowCard({ src, alt }) {
  return (
    <div className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl sm:rounded-2xl border border-gray-100">
      <Image 
        src={src || "/placeholder.svg"} 
        alt={alt} 
        width={36} 
        height={36} 
        className="object-contain sm:w-11 sm:h-11" 
      />
    </div>
  )
}