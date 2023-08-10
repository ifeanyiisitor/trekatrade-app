import { Skeleton } from '@/app/components/ui/skeleton'

export function NoAccountsPaneSkeleton() {
  return (
    <div className="flex flex-col gap-3 items-center mx-auto mt-36">
      <Skeleton className="h-6 w-[150px]" />
      <div className="flex flex-col justify-center items-center gap-2 mt-1">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <Skeleton className="h-10 w-[120px] mt-3" />
    </div>
  )
}
