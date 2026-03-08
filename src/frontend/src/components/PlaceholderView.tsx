import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";

interface PlaceholderViewProps {
  pageName: string;
  onDashboard: () => void;
}

function formatPageName(page: string): string {
  return page
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function PlaceholderView({
  pageName,
  onDashboard,
}: PlaceholderViewProps) {
  const title = formatPageName(pageName);

  return (
    <div
      data-ocid="placeholder.section"
      className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-8 animate-fade-in"
    >
      {/* Decorative circle */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(242,170,76,0.12), rgba(245,188,110,0.08))",
          border: "2px dashed #F2AA4C",
        }}
      >
        <Construction className="w-10 h-10 text-[#F2AA4C]" />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-[#101820] mb-2 text-center">
        {title}
      </h1>

      {/* Breadcrumb-style path */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-xs text-[#6B7280] bg-gray-100 px-2 py-0.5 rounded-full font-medium">
          Dashboard
        </span>
        <span className="text-[#6B7280] text-xs">›</span>
        <span
          className="text-xs text-[#D4892A] px-2 py-0.5 rounded-full font-medium"
          style={{ background: "rgba(242,170,76,0.10)" }}
        >
          {title}
        </span>
      </div>

      <p className="text-[#6B7280] text-center max-w-sm text-sm mb-8 leading-relaxed">
        This section is under development. Our team is actively building this
        feature. Please check back later or contact support for more
        information.
      </p>

      {/* Progress indicator */}
      <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden mb-8">
        <div
          className="h-full rounded-full"
          style={{
            width: "60%",
            background: "linear-gradient(90deg, #F2AA4C, #F5BC6E)",
          }}
        />
      </div>

      <Button
        data-ocid="placeholder.dashboard_button"
        onClick={onDashboard}
        className="flex items-center gap-2 h-9 px-5 text-sm font-semibold text-white rounded-lg transition-all hover:shadow-md"
        style={{ background: "linear-gradient(135deg, #F2AA4C, #D4892A)" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Go to Dashboard
      </Button>
    </div>
  );
}

export default PlaceholderView;
