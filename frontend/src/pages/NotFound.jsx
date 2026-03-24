import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-8 flex flex-col items-start gap-6">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="text-xl">This page doesn't exist.</p>
      <Link to="/" className="cursor-pointer font-semibold px-6 py-1.5 bg-black text-white rounded-3xl">Go back to Home Page</Link>
    </div>
  );
}
