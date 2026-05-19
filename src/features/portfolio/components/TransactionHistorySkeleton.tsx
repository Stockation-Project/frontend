import { Skeleton } from "@/components/ui/skeleton";

const TransactionHistorySkeleton = () => (
  <div className="bg-background-primary border border-border-primary rounded-lg p-4 transition-all">
    <div className="flex justify-between items-start mb-2">
      <div className="flex gap-3">
        <Skeleton className="h-6 w-12 rounded-lg" />
        <div>
          <Skeleton className="h-4 w-16 mb-1 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
      </div>
      <Skeleton className="h-6 w-16 rounded-lg" />
    </div>
    <div className="flex gap-4 justify-between py-2 border-b border-border-secondary">
      <div>
        <Skeleton className="h-3 w-14 mb-1 rounded" />
        <Skeleton className="h-4 w-10 rounded" />
      </div>
      <div>
        <Skeleton className="h-3 w-20 mb-1 rounded" />
        <Skeleton className="h-4 w-12 rounded" />
      </div>
      <div>
        <Skeleton className="h-3 w-24 mb-1 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>
    </div>
    <div className="flex flex-col pt-2">
      <Skeleton className="h-3 w-20 mb-1 rounded" />
      <Skeleton className="h-5 w-32 mb-1 rounded" />
      <Skeleton className="h-3 w-24 rounded" />
    </div>
  </div>
);

export default TransactionHistorySkeleton;