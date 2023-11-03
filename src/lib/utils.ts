import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  const parsedDate = new Date(date);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - parsedDate.getTime();

  if (timeDifference < 60 * 1000) {
    return "Just now";
  } else if (timeDifference < 1000 * 60 * 60) {
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));

    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference < 1000 * 60 * 60 * 60) {
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference < 1000 * 60 * 60 * 60 * 24) {
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 60));

    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference < 1000 * 60 * 60 * 60 * 24 * 7) {
    const weeksAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 60 * 24));

    return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference > 1000 * 60 * 60 * 60 * 24 * 30) {
    const monthsAgo = Math.floor(
      timeDifference / (1000 * 60 * 60 * 60 * 24 * 7)
    );

    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else {
    return "year ago";
  }
}
