import ProfileImage from "../../UI/ProfileImage";

export default function DetailedProfile() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
        My Profile
      </h2>

      {/* Profile Picture Section */}
      <div className="mb-8">
        <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Profile picture
        </h3>
        <div className="flex items-center gap-6">
          <ProfileImage className={"h-20 w-20"} />
          <div className="flex gap-3">
            <button className="text-sm px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-300 transition-colors">
              Change
            </button>
            <button className="text-sm px-2 py-1 text-red-600 dark:text-red-400 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Profile Name Section */}
      <div className="mb-6">
        <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Profile name
        </h3>
        <input
          type="text"
          defaultValue="John Doe"
          className="cursor-not-allowed w-full p-3 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          disabled
        />
      </div>

      {/* Username Section */}
      <div className="mb-6">
        <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Username
        </h3>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">@</span>
          </div>
          <input
            type="text"
            defaultValue="johndoe1234"
            className="cursor-not-allowed w-full pl-8 p-3 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            disabled
          />
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Available change in 25/04/2024
        </p>
      </div>

      {/* Status Section */}
      <div className="mb-6">
        <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Status recently
        </h3>
        <input
          type="text"
          defaultValue="On duty"
          className="w-full p-3 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
        />
      </div>

      {/* About Me Section */}
      {/* <div className="mb-8">
        <h3 className="text-sm text-gray-600 mb-2">About me</h3>
        <textarea
          defaultValue="Discuss only on work hour, unless you wanna discuss about music 🤟"
          rows={4}
          className="w-full p-3 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
        />
      </div> */}

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="text-sm px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-300 transition-colors">
          Save changes
        </button>
      </div>
    </div>
  );
}
