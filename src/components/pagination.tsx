"use client";

import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/shared-components";
import { usePathname, useRouter } from "next/navigation";
import { TMeta } from "@/stores/states/meta.state";

// Base pagination wrapper
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

// Pagination content container
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-row items-center gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-sm sm:gap-2 sm:p-3",
        className,
      )}
      {...props}
    />
  );
}

// Individual pagination item
function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      className={cn("flex", className)}
      {...props}
    />
  );
}

// Base pagination link/button
type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost";
} & React.ComponentProps<"button">;

function PaginationLink({
  className,
  isActive,
  disabled,
  variant = "default",
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      disabled={disabled}
      className={cn(
        // Base styles
        "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
        // Size variants
        "h-9 w-9 sm:h-10 sm:w-10",
        // Default variant
        variant === "default" && [
          "border border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900",
          isActive &&
            "border-blue-600 bg-blue-600 text-white shadow-md hover:bg-blue-700",
        ],
        // Outline variant
        variant === "outline" && [
          "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          isActive && "border-blue-600 bg-blue-50 text-blue-600",
        ],
        // Ghost variant
        variant === "ghost" && [
          "border-0 bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700",
          isActive && "bg-blue-100 text-blue-600",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Previous button with icon and text
function PaginationPrevious({
  className,
  disabled,
  showText = false,
  ...props
}: Omit<PaginationLinkProps, "children"> & { showText?: boolean }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      disabled={disabled}
      variant="outline"
      className={cn(
        "w-auto min-w-[2.25rem] gap-1 px-2 sm:min-w-[2.5rem] sm:px-3",
        className,
      )}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      {showText && <span className="hidden sm:inline">Previous</span>}
    </PaginationLink>
  );
}

// Next button with icon and text
function PaginationNext({
  className,
  disabled,
  showText = false,
  ...props
}: Omit<PaginationLinkProps, "children"> & { showText?: boolean }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      disabled={disabled}
      variant="outline"
      className={cn(
        "w-auto min-w-[2.25rem] gap-1 px-2 sm:min-w-[2.5rem] sm:px-3",
        className,
      )}
      {...props}
    >
      {showText && <span className="hidden sm:inline">Next</span>}
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
}

// First page button
function PaginationFirst({
  className,
  disabled,
  ...props
}: Omit<PaginationLinkProps, "children">) {
  return (
    <PaginationLink
      aria-label="Go to first page"
      disabled={disabled}
      variant="ghost"
      className={cn("w-auto px-2 sm:px-3", className)}
      {...props}
    >
      <ChevronsLeftIcon className="h-4 w-4" />
      <span className="ml-1 hidden lg:inline">First</span>
    </PaginationLink>
  );
}

// Last page button
function PaginationLast({
  className,
  disabled,
  ...props
}: Omit<PaginationLinkProps, "children">) {
  return (
    <PaginationLink
      aria-label="Go to last page"
      disabled={disabled}
      variant="ghost"
      className={cn("w-auto px-2 sm:px-3", className)}
      {...props}
    >
      <span className="mr-1 hidden lg:inline">Last</span>
      <ChevronsRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
}

// Ellipsis component
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex h-9 w-9 items-center justify-center text-gray-400 sm:h-10 sm:w-10",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

// Page info component for mobile
function PaginationInfo({
  currentPage,
  totalPages,
  className,
  ...props
}: {
  currentPage: number;
  totalPages: number;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-600",
        className,
      )}
      {...props}
    >
      <span className="font-medium">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}

// Helper function to generate page numbers with ellipsis
function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 10,
): (number | "ellipsis")[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];
  const sidePages = Math.floor((maxVisible - 3) / 2); // Reserve space for first, last, and ellipsis

  if (currentPage <= sidePages + 2) {
    // Near the beginning
    for (let i = 1; i <= maxVisible - 2; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
    pages.push(totalPages);
  } else if (currentPage >= totalPages - sidePages - 1) {
    // Near the end
    pages.push(1);
    pages.push("ellipsis");
    for (let i = totalPages - (maxVisible - 3); i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // In the middle
    pages.push(1);
    pages.push("ellipsis");
    for (let i = currentPage - sidePages; i <= currentPage + sidePages; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
    pages.push(totalPages);
  }

  return pages;
}

// Main pagination component
function PaginationComponent({ meta }: { meta?: TMeta }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = React.useState(false);

  // Check if mobile on mount and resize
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Default state when no meta
  if (!meta) {
    return (
      <Pagination className="mb-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious disabled />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={true}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext disabled />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  const handlePagination = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`${pathname}?page=${page}`);
    }
  };

  const totalPages = Math.max(meta.totalPage || 1, 1);
  const currentPage = Math.max(Math.min(meta.page || 1, totalPages), 1);

  // Determine max visible pages based on screen size
  const maxVisiblePages = isMobile ? 5 : 10;
  const pageNumbers = generatePageNumbers(
    currentPage,
    totalPages,
    maxVisiblePages,
  );

  // Show simplified mobile view for very small screens or many pages
  const showSimplified = isMobile && totalPages > 7;

  if (showSimplified) {
    return (
      <Pagination className="mb-10">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage <= 1}
              onClick={() => handlePagination(currentPage - 1)}
              showText={false}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationInfo currentPage={currentPage} totalPages={totalPages} />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              disabled={currentPage >= totalPages}
              onClick={() => handlePagination(currentPage + 1)}
              showText={false}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  return (
    <Pagination className="mb-10">
      <PaginationContent>
        {/* First page button (desktop only) */}
        {!isMobile && totalPages > 10 && (
          <PaginationItem>
            <PaginationFirst
              disabled={currentPage <= 1}
              onClick={() => handlePagination(1)}
            />
          </PaginationItem>
        )}

        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage <= 1}
            onClick={() => handlePagination(currentPage - 1)}
          />
        </PaginationItem>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <PaginationItem key={`page-${index}`}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => handlePagination(page as number)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            disabled={currentPage >= totalPages}
            onClick={() => handlePagination(currentPage + 1)}
          />
        </PaginationItem>

        {/* Last page button (desktop only) */}
        {!isMobile && totalPages > 10 && (
          <PaginationItem>
            <PaginationLast
              disabled={currentPage >= totalPages}
              onClick={() => handlePagination(totalPages)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
  PaginationInfo,
  PaginationComponent,
};
