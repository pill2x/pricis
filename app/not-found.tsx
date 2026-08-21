import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FBFBFD] flex flex-col items-center justify-center p-6 text-center font-body">
      <div className="mb-6">
        <Logo variant="dark" />
      </div>
      <h1 className="text-4xl font-extrabold font-display text-[#0F172A] mb-3">404 - Page Not Found</h1>
      <p className="text-slate-500 max-w-md mb-8 text-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-sm"
      >
        Return to Home
      </Link>
    </div>
  );
}
