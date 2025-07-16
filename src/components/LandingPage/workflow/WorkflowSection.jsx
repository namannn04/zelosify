import WorkflowIntegration from "./WorkflowIntegration"

export default function WorkflowSection() {
  const firstRowIcons = [
    { src: "/assets/images/workflow/hubSpot.png", alt: "HubSpot" },
    { src: "/assets/images/workflow/slack.png", alt: "Slack" },
    { src: "/assets/images/workflow/salesforce.png", alt: "Salesforce" },
    { src: "/assets/images/workflow/googleSheets.png", alt: "Google Sheets" },
  ]

  const secondRowIcons = [
    { src: "/assets/images/workflow/clay.png", alt: "Clay" },
    { src: "/assets/images/workflow/outreach.png", alt: "Outreach" },
    { src: "/assets/images/workflow/unknown.png", alt: "unknown" }, //this is unknown
    { src: "/assets/images/workflow/gmail.png", alt: "Gmail" },
  ]

  return (
    <div className=" bg-slate-50">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[400px_1fr] gap-36 items-center">
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                We integrate directly into your existing workflow.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Seamlessly connect with the tools you already use and love. Our platform works with your favorite
                applications to streamline your workflow.
              </p>
            </div>

            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              {/* First Row */}
              <div className="flex justify-center lg:justify-start overflow-x-auto">
                <WorkflowIntegration icons={firstRowIcons} />
              </div>

              {/* Second Row */}
              <div className="flex justify-center lg:justify-start overflow-x-auto">
                <WorkflowIntegration icons={secondRowIcons} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}