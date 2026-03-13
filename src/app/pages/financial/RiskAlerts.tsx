import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  Filter,
  Search,
  AlertCircle,
  TrendingUp,
  Calendar,
  Building2,
} from 'lucide-react';
import { Button } from '../../components/Button';
import { RISK_ALERTS, PROJECTS, getProjectById } from '../../lib/mockData';
import { toast } from 'sonner';

const severityConfig = {
  high: {
    label: 'Cao',
    color: 'bg-red-100 text-red-800',
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
  },
  medium: {
    label: 'Trung bình',
    color: 'bg-yellow-100 text-yellow-800',
    icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  },
  low: {
    label: 'Thấp',
    color: 'bg-gray-100 text-gray-800',
    icon: <Clock className="w-5 h-5 text-gray-500" />,
  },
};

const riskTypeConfig = {
  budget_overrun: {
    label: 'Vượt ngân sách',
    icon: <TrendingUp className="w-4 h-4" />,
  },
  delay: {
    label: 'Trễ tiến độ',
    icon: <Clock className="w-4 h-4" />,
  },
};

export default function RiskAlerts() {
  const [riskAlerts, setRiskAlerts] = useState(RISK_ALERTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showResolved, setShowResolved] = useState(false);

  const filteredAlerts = riskAlerts.filter(alert => {
    const project = getProjectById(alert.projectId);
    const matchesSearch = project?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = !selectedSeverity || alert.severity === selectedSeverity;
    const matchesType = !selectedType || alert.type === selectedType;
    const matchesResolved = showResolved || !alert.resolved;
    return matchesSearch && matchesSeverity && matchesType && matchesResolved;
  });

  const handleResolve = (alertId: string) => {
    setRiskAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId
          ? { ...alert, resolved: true }
          : alert
      )
    );
    toast.success('Cảnh báo đã được đánh dấu là đã xử lý!');
  };

  const activeAlerts = riskAlerts.filter(a => !a.resolved);
  const resolvedToday = riskAlerts.filter(a => a.resolved && a.createdAt === '18/03/2026').length; // Mock

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cảnh báo rủi ro</h1>
          <p className="text-gray-600 mt-1">
            Danh sách các cảnh báo hệ thống về dự án vượt ngân sách, trễ tiến độ
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowResolved(!showResolved)}>
          <Filter className="w-4 h-4 mr-2" />
          {showResolved ? 'Ẩn đã xử lý' : 'Hiển thị tất cả'}
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cảnh báo cao</p>
              <p className="text-2xl font-bold text-gray-900">
                {activeAlerts.filter(a => a.severity === 'high').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cảnh báo trung bình</p>
              <p className="text-2xl font-bold text-gray-900">
                {activeAlerts.filter(a => a.severity === 'medium').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đã xử lý hôm nay</p>
              <p className="text-2xl font-bold text-gray-900">{resolvedToday}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng cảnh báo</p>
              <p className="text-2xl font-bold text-gray-900">{RISK_ALERTS.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo dự án hoặc nội dung cảnh báo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Tất cả mức độ</option>
          <option value="high">Cao</option>
          <option value="medium">Trung bình</option>
          <option value="low">Thấp</option>
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Tất cả loại</option>
          <option value="budget_overrun">Vượt ngân sách</option>
          <option value="delay">Trễ tiến độ</option>
        </select>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const project = getProjectById(alert.projectId);
          return (
            <div
              key={alert.id}
              className={`border rounded-lg p-6 ${
                alert.resolved
                  ? 'bg-gray-50 border-gray-200'
                  : alert.severity === 'high'
                  ? 'bg-red-50 border-red-200'
                  : alert.severity === 'medium'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {severityConfig[alert.severity].icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {alert.message}
                      </h3>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        severityConfig[alert.severity].color
                      }`}>
                        {severityConfig[alert.severity].label}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        {riskTypeConfig[alert.type].icon}
                        <span className="ml-1">{riskTypeConfig[alert.type].label}</span>
                      </div>
                      {alert.resolved && (
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Đã xử lý
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Building2 className="w-4 h-4 mr-2" />
                        Dự án: {project?.name}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Ngày phát hiện: {alert.createdAt}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">
                      Cần sự chú ý kịp thời từ ban quản lý để tránh ảnh hưởng đến tiến độ và ngân sách dự án.
                    </p>
                  </div>
                </div>

                {!alert.resolved && (
                  <div className="flex space-x-3 ml-6">
                    <Button
                      size="sm"
                      onClick={() => handleResolve(alert.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Đánh dấu đã xử lý
                    </Button>
                    <Button size="sm" variant="outline">
                      Xem chi tiết
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {showResolved ? 'Không có cảnh báo nào' : 'Không có cảnh báo đang hoạt động'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {showResolved
              ? 'Tất cả cảnh báo đã được xử lý.'
              : 'Tất cả rủi ro đã được kiểm soát. Hiển thị cảnh báo đã xử lý để xem lịch sử.'
            }
          </p>
        </div>
      )}
    </div>
  );
}