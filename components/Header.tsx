import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header id="header" className="bg-slate-900">
      <div className="container">
        <div className="logo_area">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={80} height={53} />
          </Link>
        </div>
      </div>
    </header>
  );
}
