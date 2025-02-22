import LineGraph from "./Graph/LineGraph";
import MetricCards from "./MetricCards/MetricCards";
import Transactions from "./Transactions/Transactions";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { title: "Total balance", amount: "$5045.21" },
          { title: "Total spending", amount: "$299.00" },
          { title: "Total saved", amount: "$459.25" },
        ].map((metric) => (
          <div
            key={metric.title}
            className="p-6 rounded-xl bg-background border border-border"
          >
            <p className="text-secondary mb-2">{metric.title}</p>
            <p className="text-2xl font-semibold text-foreground">
              {metric.amount}
            </p>
          </div>
        ))}
      </div> */}
      <MetricCards />

      {/* Line Graph */}
      <LineGraph />

      {/* Transactions */}
      <Transactions />
    </div>
  );
}
