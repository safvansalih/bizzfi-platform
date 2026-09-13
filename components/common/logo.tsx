import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/bizzfi-logo.png"
        alt="BizzFi"
        width={150}
        height={50}
        priority
        className="h-auto w-[150px]"
      />
    </Link>
  );
}