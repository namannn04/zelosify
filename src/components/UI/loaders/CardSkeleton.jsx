export default function CardSkeleton() {
  return (
    <div className="flex flex-col items-stretch bg-background p-2 rounded-lg border border-border h-[157px] animate-pulse">
      <div className="bg-border w-10 h-10 rounded-lg mb-4"></div>
      <div className="bg-border w-16 h-6 rounded mb-3"></div>
      <div className="bg-border w-40 h-4 rounded mb-3"></div>
      <div className="bg-border w-48 h-4 rounded"></div>
    </div>
  );
}
