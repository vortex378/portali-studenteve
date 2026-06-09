import { cn } from "@/lib/utils";
import Card from "./Card";

interface TableWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function TableWrapper({ children, className }: TableWrapperProps) {
  return (
    <Card padding="none" className={cn("overflow-hidden", className)}>
      <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        {children}
      </div>
    </Card>
  );
}
