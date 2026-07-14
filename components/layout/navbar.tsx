import { Logo } from "@/components/common/logo";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />

        <nav>
          Navigation
        </nav>
      </div>
    </header>
  );
}