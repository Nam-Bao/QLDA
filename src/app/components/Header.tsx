import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './Button';

export function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm dự án, công việc..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 ml-4">
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
          </Link>

          <Link to="/profile" className="flex items-center gap-3 ml-2 pl-3 border-l border-border hover:opacity-80 transition-opacity">
            <div className="text-right">
              <p className="text-sm">Nguyễn Văn A</p>
              <p className="text-xs text-muted-foreground">Project Manager</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
