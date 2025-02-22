const transactions = [
  {
    id: 1,
    name: "Iphone 13 Pro MAX",
    company: "Apple Inc.",
    amount: 1199.0,
    date: "21 Jul 2022",
    logo: "/favicon1.ico",
  },
  {
    id: 2,
    name: "Netflix Subscription",
    company: "Netflix",
    amount: 99.0,
    date: "20 Jul 2022",
    logo: "/favicon1.ico",
  },
  {
    id: 3,
    name: "Figma Subscription",
    company: "Figma Inc.",
    amount: 244.2,
    date: "20 Jul 2022",
    logo: "/favicon1.ico",
  },
  {
    id: 4,
    name: "Youtube Subscription",
    company: "Youtube Inc.",
    amount: 159.2,
    date: "15 Jul 2022",
    logo: "/favicon1.ico",
  },
];

export default function Transactions() {
  return (
    <div className="py-6 pr-2 bg-background rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-foreground">
          Recent Transaction
        </h2>
        <button className="text-emerald-500 text-sm flex items-center gap-1">
          View All
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="min-w-full">
        <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 py-2 text-xs text-secondary uppercase tracking-wider">
          <div>NAME/BUSINESS</div>
          <div className="text-right">AMOUNT</div>
          <div className="text-right">DATE</div>
        </div>

        <div className="space-y-4 mt-2">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="grid grid-cols-[2fr,1fr,1fr] gap-4 items-center py-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-black flex items-center justify-center">
                  {transaction.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {transaction.name}
                  </p>
                  <p className="text-xs text-secondary">
                    {transaction.company}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  ${transaction.amount.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-secondary">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
