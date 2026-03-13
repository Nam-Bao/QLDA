import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CheckSquare,
  BarChart3,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
  Shield,
  UserCog,
  FolderTree,
  Activity,
  Database,
  Cpu,
  Award,
  ChevronDown,
  ChevronUp,
  DollarSign,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

type MenuItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

const mainMenuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FolderKanban, label: 'Dự án', path: '/projects' },
  { icon: CheckSquare, label: 'Công việc', path: '/tasks' },
  { icon: Users, label: 'Nhóm', path: '/team' },
  { icon: BarChart3, label: 'Báo cáo', path: '/reports' },
  { icon: FileText, label: 'Tài liệu', path: '/documents' },
  { icon: Settings, label: 'Cài đặt', path: '/settings' },
];

const pmMenuItems: MenuItem[] = [
  { icon: Cpu, label: 'Nguồn lực', path: '/resources' },
  // NOTE: Acceptance is per-project; default to the first sample project for quick access
  { icon: Award, label: 'Nghiệm thu', path: '/projects/p1/acceptance' },
];

const adminMenuItems: MenuItem[] = [
  { icon: UserCog, label: 'Người dùng', path: '/admin/users' },
  { icon: Shield, label: 'Phân quyền', path: '/admin/roles' },
  { icon: FolderTree, label: 'Danh mục', path: '/admin/categories' },
  { icon: Activity, label: 'Nhật ký', path: '/admin/logs' },
  { icon: Database, label: 'Sao lưu', path: '/admin/backup' },
];

const financialMenuItems: MenuItem[] = [
  { icon: BarChart3, label: 'Tổng quan', path: '/financial' },
  { icon: DollarSign, label: 'Ngân sách', path: '/financial/budget' },
  { icon: FileText, label: 'Hóa đơn', path: '/financial/invoices' },
  { icon: CheckSquare, label: 'Phê duyệt', path: '/financial/approvals' },
  { icon: Shield, label: 'Cảnh báo', path: '/financial/risks' },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPmExpanded, setIsPmExpanded] = useState(true);
  const [isAdminExpanded, setIsAdminExpanded] = useState(true);
  const [isFinancialExpanded, setIsFinancialExpanded] = useState(true);

  const renderNavItem = (item: MenuItem) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.path === '/'}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          isActive && 'bg-sidebar-primary text-sidebar-primary-foreground',
          isCollapsed && 'justify-center'
        )
      }
      title={isCollapsed ? item.label : undefined}
    >
      <item.icon className="w-5 h-5 flex-shrink-0" />
      {!isCollapsed && <span className="text-sm">{item.label}</span>}
    </NavLink>
  );

  return (
    <aside
      className={cn(
        'bg-sidebar text-sidebar-foreground h-screen sticky top-0 transition-all duration-300 flex flex-col border-r border-sidebar-border',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between flex-shrink-0">
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <span className="text-sm font-semibold block">IT Project</span>
              <span className="text-xs text-sidebar-foreground/60">Manager</span>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center mx-auto">
            <FolderKanban className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {/* Main Menu */}
        {mainMenuItems.map(renderNavItem)}

        {/* PM Module Section */}
        <div className="pt-2">
          {!isCollapsed ? (
            <button
              onClick={() => setIsPmExpanded(!isPmExpanded)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs uppercase text-sidebar-foreground/50 font-semibold hover:text-sidebar-foreground/80 transition-colors"
            >
              <span>Quản lý dự án</span>
              {isPmExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          ) : (
            <div className="border-t border-sidebar-border my-2" />
          )}

          {(isCollapsed || isPmExpanded) && (
            <div className="space-y-1">
              {pmMenuItems.map(renderNavItem)}
            </div>
          )}
        </div>

        {/* Admin Section */}
        <div className="pt-2">
          {!isCollapsed ? (
            <button
              onClick={() => setIsAdminExpanded(!isAdminExpanded)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs uppercase text-sidebar-foreground/50 font-semibold hover:text-sidebar-foreground/80 transition-colors"
            >
              <span>Quản trị</span>
              {isAdminExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          ) : (
            <div className="border-t border-sidebar-border my-2" />
          )}

          {(isCollapsed || isAdminExpanded) && (
            <div className="space-y-1">
              {adminMenuItems.map(renderNavItem)}
            </div>
          )}
        </div>

        {/* Financial Section */}
        <div className="pt-2">
          {!isCollapsed ? (
            <button
              onClick={() => setIsFinancialExpanded(!isFinancialExpanded)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs uppercase text-sidebar-foreground/50 font-semibold hover:text-sidebar-foreground/80 transition-colors"
            >
              <span>Tài chính</span>
              {isFinancialExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          ) : (
            <div className="border-t border-sidebar-border my-2" />
          )}

          {(isCollapsed || isFinancialExpanded) && (
            <div className="space-y-1">
              {financialMenuItems.map(renderNavItem)}
            </div>
          )}
        </div>
      </nav>

      {/* Toggle Button */}
      <div className="p-2 border-t border-sidebar-border flex-shrink-0">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sm"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Thu gọn</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
