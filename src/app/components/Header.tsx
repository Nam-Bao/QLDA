import { Bell, Search, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
import { ROLE_LABELS } from '../lib/auth';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

          {/* User Info */}
          <Link
            to="/profile"
            className="flex items-center gap-3 ml-2 pl-3 border-l border-border hover:opacity-80 transition-opacity"
          >
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name ?? 'Người dùng'}</p>
              <p className="text-xs text-muted-foreground">
                {user ? ROLE_LABELS[user.role] : ''}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">
                {user?.avatar ?? '??'}
              </span>
            </div>
          </Link>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Đăng xuất"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
