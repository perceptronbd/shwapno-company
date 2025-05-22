import { cn } from "@/shared-components";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: string;
  animated?: boolean;
}

export const Progress = ({
  value,
  max = 100,
  className,
  color = "bg-primary",
  animated = true,
  ...props
}: ProgressProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn(
        "h-2.5 w-full overflow-hidden rounded-full bg-gray-200",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full", 
          animated ? "transition-all duration-700 ease-out" : "",
          color
        )}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
};
