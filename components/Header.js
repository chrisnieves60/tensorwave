import Link from "next/link";

export default function Header() {
  return (
    <nav className="bg-blue-500 p-6">
      <div className="container mx-auto">
        <Link href="/">
          <div className="text-white font-bold text-xl">
            Stockify
          </div>
        </Link>
      </div>
    </nav>
  );
}
