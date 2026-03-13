import { NavLink, useNavigate } from 'react-router';
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
  TrendingUp,
  Receipt,
  AlertTriangle,
  LogOut,
  Building2,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { UserRole, ROLE_LABELS } from '../lib/auth';

// ─── Types ───────────────────────────────────────────────────────────────────

type MenuItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

// ─── Menu definitions per role ───────────────────────────────────────────────

const ROLE_MENUS: Record<UserRole, MenuSection[]> = {
  // Ban Giám Đốc: tổng quan chiến lược, tài chính cấp cao, báo cáo
  director: [
    {
      title: 'Tổng Quan',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: FolderKanban, label: 'Dự án', path: '/projects' },
        { icon: BarChart3, label: 'Báo cáo', path: '/reports' },
      ],
    },
    {
      title: 'Tài Chính',
      items: [
        { icon: TrendingUp, label: 'Tổng quan TC', path: '/financial' },
        { icon: DollarSign, label: 'Ngân sách', path: '/financial/budget' },
        { icon: AlertTriangle, label: 'Cảnh báo rủi ro', path: '/financial/risks' },
      ],
    },
  ],

  // PM: quản lý dự án đầy đủ
  pm: [
    {
      title: 'Quản Lý',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: FolderKanban, label: 'Dự án', path: '/projects' },
        { icon: CheckSquare, label: 'Công việc', path: '/tasks' },
        { icon: Users, label: 'Nhóm', path: '/team' },
        { icon: BarChart3, label: 'Báo cáo', path: '/reports' },
        { icon: FileText, label: 'Tài liệu', path: '/documents' },
      ],
    },
    {
      title: 'Dự Án Nâng Cao',
      items: [
        { icon: Cpu, label: 'Nguồn lực', path: '/resources' },
        { icon: Award, label: 'Nghiệm thu', path: '/projects/p1/acceptance' },
      ],
    },
    {
      title: 'Tài Chính',
      items: [
        { icon: TrendingUp, label: 'Tổng quan TC', path: '/financial' },
        { icon: DollarSign, label: 'Ngân sách', path: '/financial/budget' },
        { icon: AlertTriangle, label: 'Cảnh báo rủi ro', path: '/financial/risks' },
      ],
    },
    {
      title: 'Hệ Thống',
      items: [
        { icon: Settings, label: 'Cài đặt', path: '/settings' },
      ],
    },
  ],

  // Trưởng nhóm: quản lý nhóm và công việc
  team_lead: [
    {
      title: 'Quản Lý',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: FolderKanban, label: 'Dự án', path: '/projects' },
        { icon: CheckSquare, label: 'Công việc', path: '/tasks' },
        { icon: Users, label: 'Nhóm', path: '/team' },
        { icon: BarChart3, label: 'Báo cáo', path: '/reports' },
        { icon: FileText, label: 'Tài liệu', path: '/documents' },
      ],
    },
  ],

  // Thành viên: chỉ xem task của mình và tài liệu
  member: [
    {
      title: 'Công Việc',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: CheckSquare, label: 'Công việc', path: '/tasks' },
        { icon: FileText, label: 'Tài liệu', path: '/documents' },
      ],
    },
  ],

  // Khách hàng: theo dõi tiến độ và nghiệm thu
  customer: [
    {
      title: 'Theo Dõi Dự Án',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: FolderKanban, label: 'Tiến độ dự án', path: '/projects' },
        { icon: Award, label: 'Nghiệm thu', path: '/projects/p1/acceptance' },
        { icon: FileText, label: 'Tài liệu', path: '/documents' },
      ],
    },
  ],

  // Kế toán: toàn bộ module tài chính
  accountant: [
    {
      title: 'Tổng Quan',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
      ],
    },
    {
      title: 'Tài Chính',
      items: [
        { icon: TrendingUp, label: 'Tổng quan TC', path: '/financial' },
        { icon: DollarSign, label: 'Ngân sách', path: '/financial/budget' },
        { icon: Receipt, label: 'Hóa đơn', path: '/financial/invoices' },
        { icon: CheckSquare, label: 'Phê duyệt chi phí', path: '/financial/approvals' },
        { icon: AlertTriangle, label: 'Cảnh báo rủi ro', path: '/financial/risks' },
      ],
    },
  ],

  // Admin: toàn bộ quản trị hệ thống
  admin: [
    {
      title: 'Tổng Quan',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
      ],
    },
    {
      title: 'Quản Trị Hệ Thống',
      items: [
        { icon: UserCog, label: 'Người dùng', path: '/admin/users' },
        { icon: Shield, label: 'Phân quyền', path: '/admin/roles' },
        { icon: FolderTree, label: 'Danh mục', path: '/admin/categories' },
        { icon: Activity, label: 'Nhật ký hệ thống', path: '/admin/logs' },
        { icon: Database, label: 'Sao lưu & Khôi phục', path: '/admin/backup' },
      ],
    },
    {
      title: 'Quản Lý Dự Án',
      items: [
        { icon: FolderKanban, label: 'Dự án', path: '/projects' },
        { icon: Users, label: 'Nhóm', path: '/team' },
        { icon: BarChart3, label: 'Báo cáo', path: '/reports' },
      ],
    },
    {
      title: 'Tài Chính',
      items: [
        { icon: TrendingUp, label: 'Tổng quan TC', path: '/financial' },
        { icon: Receipt, label: 'Hóa đơn', path: '/financial/invoices' },
        { icon: AlertTriangle, label: 'Cảnh báo rủi ro', path: '/financial/risks' },
      ],
    },
  ],
};

// ─── Role badge colors ────────────────────────────────────────────────────────

const ROLE_BADGE_COLORS: Record<UserRole, string> = {
  director: 'bg-purple-500/20 text-purple-400',
  pm: 'bg-blue-500/20 text-blue-400',
  team_lead: 'bg-cyan-500/20 text-cyan-400',
  member: 'bg-green-500/20 text-green-400',
  customer: 'bg-orange-500/20 text-orange-400',
  accountant: 'bg-yellow-500/20 text-yellow-400',
  admin: 'bg-red-500/20 text-red-400',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const role = (user?.role ?? 'member') as UserRole;
  const sections = ROLE_MENUS[role] ?? [];

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isSectionExpanded = (title: string) => expandedSections[title] !== false; // default open

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderNavItem = (item: MenuItem) => (
    <NavLink
      key={item.path + item.label}
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

      {/* User Info (when expanded) */}
      {!isCollapsed && user && (
        <div className="px-4 py-3 border-b border-sidebar-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-sidebar-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{user.name}</p>
              <span
                className={cn(
                  'inline-block text-[10px] px-1.5 py-0.5 rounded-full font-semibold mt-0.5',
                  ROLE_BADGE_COLORS[role]
                )}
              >
                {ROLE_LABELS[role]}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="pt-2">
            {/* Section Header */}
            {!isCollapsed ? (
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs uppercase text-sidebar-foreground/50 font-semibold hover:text-sidebar-foreground/80 transition-colors"
              >
                <span>{section.title}</span>
                {isSectionExpanded(section.title) ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
            ) : (
              <div className="border-t border-sidebar-border my-1" />
            )}

            {/* Section Items */}
            {(isCollapsed || isSectionExpanded(section.title)) && (
              <div className="space-y-0.5">
                {section.items.map(renderNavItem)}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom: Logout + Collapse */}
      <div className="p-2 border-t border-sidebar-border flex-shrink-0 space-y-1">
        {/* Logout */}
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm',
            'hover:bg-red-500/10 hover:text-red-400',
            isCollapsed && 'justify-center'
          )}
          title={isCollapsed ? 'Đăng xuất' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>

        {/* Collapse Toggle */}
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
