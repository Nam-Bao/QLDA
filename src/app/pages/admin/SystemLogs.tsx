import { useState } from 'react';
import {
  Activity,
  Filter,
  Download,
  Search,
  User,
  FileText,
  AlertCircle,
  CheckCircle,
  Info,
  Calendar,
} from 'lucide-react';
import { Button } from '../../components/Button';

type LogLevel = 'info' | 'warning' | 'error' | 'success';
type LogAction =
  | 'login'
  | 'logout'
  | 'create'
  | 'update'
  | 'delete'
  | 'view'
  | 'export';

interface Log {
  id: string;
  timestamp: string;
  user: string;
  userId: string;
  action: LogAction;
  module: string;
  description: string;
  ipAddress: string;
  level: LogLevel;
  details?: string;
}

const mockLogs: Log[] = [
  {
    id: '1',
    timestamp: '2026-03-11 14:35:22',
    user: 'Nguyễn Văn A',
    userId: 'user-001',
    action: 'login',
    module: 'Xác thực',
    description: 'Đăng nhập thành công',
    ipAddress: '192.168.1.100',
    level: 'success',
  },
  {
    id: '2',
    timestamp: '2026-03-11 14:30:15',
    user: 'Trần Thị B',
    userId: 'user-002',
    action: 'update',
    module: 'Dự án',
    description: 'Cập nhật thông tin dự án "Website bán hàng"',
    ipAddress: '192.168.1.101',
    level: 'info',
  },
  {
    id: '3',
    timestamp: '2026-03-11 14:25:48',
    user: 'Admin',
    userId: 'user-admin',
    action: 'create',
    module: 'Người dùng',
    description: 'Tạo tài khoản mới cho Lê Văn C',
    ipAddress: '192.168.1.1',
    level: 'info',
  },
  {
    id: '4',
    timestamp: '2026-03-11 14:20:33',
    user: 'Phạm Thị D',
    userId: 'user-004',
    action: 'delete',
    module: 'Công việc',
    description: 'Xóa task "Test module thanh toán"',
    ipAddress: '192.168.1.102',
    level: 'warning',
  },
  {
    id: '5',
    timestamp: '2026-03-11 14:15:07',
    user: 'System',
    userId: 'system',
    action: 'export',
    module: 'Backup',
    description: 'Sao lưu dữ liệu tự động',
    ipAddress: '127.0.0.1',
    level: 'success',
  },
  {
    id: '6',
    timestamp: '2026-03-11 14:10:44',
    user: 'Nguyễn Văn E',
    userId: 'user-005',
    action: 'login',
    module: 'Xác thực',
    description: 'Đăng nhập thất bại - Sai mật khẩu',
    ipAddress: '192.168.1.105',
    level: 'error',
    details: 'Số lần thử: 3/5',
  },
  {
    id: '7',
    timestamp: '2026-03-11 14:05:21',
    user: 'Trần Văn F',
    userId: 'user-006',
    action: 'view',
    module: 'Báo cáo',
    description: 'Xem báo cáo tài chính Q1',
    ipAddress: '192.168.1.106',
    level: 'info',
  },
  {
    id: '8',
    timestamp: '2026-03-11 14:00:18',
    user: 'Admin',
    userId: 'user-admin',
    action: 'update',
    module: 'Phân quyền',
    description: 'Cập nhật quyền cho vai trò "Quản lý dự án"',
    ipAddress: '192.168.1.1',
    level: 'warning',
  },
];

export default function SystemLogs() {
  const [logs, setLogs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<LogLevel | 'all'>('all');
  const [filterModule, setFilterModule] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const modules = Array.from(new Set(mockLogs.map((log) => log.module)));

  const filteredLogs = logs.filter((log) => {
    const matchSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);

    const matchLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchModule = filterModule === 'all' || log.module === filterModule;

    return matchSearch && matchLevel && matchModule;
  });

  const getIcon = (level: LogLevel) => {
    switch (level) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getLevelBadge = (level: LogLevel) => {
    const styles = {
      info: 'bg-blue-100 text-blue-700',
      warning: 'bg-amber-100 text-amber-700',
      error: 'bg-red-100 text-red-700',
      success: 'bg-green-100 text-green-700',
    };
    const labels = {
      info: 'Thông tin',
      warning: 'Cảnh báo',
      error: 'Lỗi',
      success: 'Thành công',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs ${styles[level]}`}>
        {labels[level]}
      </span>
    );
  };

  const exportLogs = () => {
    console.log('Exporting logs...');
    alert('Xuất nhật ký thành công!');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl mb-2">Giám sát hệ thống</h1>
            <p className="text-muted-foreground">
              Nhật ký truy cập và lịch sử thao tác của người dùng
            </p>
          </div>
          <Button onClick={exportLogs}>
            <Download className="w-5 h-5 mr-2" />
            Xuất nhật ký
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Tổng hoạt động
                </p>
                <p className="text-2xl">{logs.length}</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Thành công</p>
                <p className="text-2xl text-green-600">
                  {logs.filter((l) => l.level === 'success').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Cảnh báo</p>
                <p className="text-2xl text-amber-600">
                  {logs.filter((l) => l.level === 'warning').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Lỗi</p>
                <p className="text-2xl text-red-600">
                  {logs.filter((l) => l.level === 'error').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo người dùng, mô tả, IP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                />
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <select
                value={filterLevel}
                onChange={(e) =>
                  setFilterLevel(e.target.value as LogLevel | 'all')
                }
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
              >
                <option value="all">Tất cả mức độ</option>
                <option value="info">Thông tin</option>
                <option value="success">Thành công</option>
                <option value="warning">Cảnh báo</option>
                <option value="error">Lỗi</option>
              </select>
            </div>

            {/* Module Filter */}
            <div>
              <select
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
              >
                <option value="all">Tất cả module</option>
                {modules.map((module) => (
                  <option key={module} value={module}>
                    {module}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-medium">Thời gian</th>
                <th className="text-left px-6 py-3 font-medium">Người dùng</th>
                <th className="text-left px-6 py-3 font-medium">Thao tác</th>
                <th className="text-left px-6 py-3 font-medium">Module</th>
                <th className="text-left px-6 py-3 font-medium">Mô tả</th>
                <th className="text-left px-6 py-3 font-medium">IP</th>
                <th className="text-left px-6 py-3 font-medium">Mức độ</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-border hover:bg-muted/30"
                >
                  <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {log.timestamp}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{log.user}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.userId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      {log.module}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{log.description}</p>
                    {log.details && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {log.details}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {log.ipAddress}
                  </td>
                  <td className="px-6 py-4">{getLevelBadge(log.level)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl mb-2">Không tìm thấy nhật ký</h3>
            <p className="text-muted-foreground">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
