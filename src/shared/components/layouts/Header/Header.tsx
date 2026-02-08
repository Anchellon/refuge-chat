// src/components/shared/Header.tsx
interface HeaderProps {
  appName?: string;
}

export default function Header({ appName = "MyApp" }: HeaderProps) {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left: Logo/Brand */}
        <div className="flex items-center gap-6">
          <div className="font-bold text-xl text-blue-600">{appName}</div>

          {/* Placeholder for navigation links */}
          <nav className="hidden md:flex items-center gap-4">
            {/* Nav items will go here */}
          </nav>
        </div>

        {/* Right: User actions placeholder */}
        <div className="flex items-center gap-3">
          {/* User menu, notifications, etc. will go here */}
        </div>
      </div>
    </header>
  );
}
