const VideoDelivery = () => {
  return (
    <div className="flex justify-center bg-white overflow-hidden pt-16 px-4 sm:px-8">
      <div className="max-w-5xl w-full">
        <video className="w-full rounded-xl shadow-2xl border border-gray-200" loop autoPlay muted>
          <source src="/assets/video/text.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default VideoDelivery
