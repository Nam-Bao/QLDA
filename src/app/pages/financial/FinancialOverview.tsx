import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Users,
  Target,
  BarChart3,
  PieChart,
} from 'lucide-react';
import { Button } from '../../components/Button';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  PROJECTS,
  TEAM_MEMBERS,
  COST_CATEGORIES,
  EXPENSE_ENTRIES,
  RISK_ALERTS,
  formatCurrency,
  getTotalBudgetVsActual,
} from '../../lib/mockData';

const TASK_PIE_COLORS = ['#94a3b8', '#3b82f6', '#10b981', '#f59e0b'];

const financialStats = [
  {
    title: 'Tổng ngân sách',
    value: formatCurrency(PROJECTS.reduce((sum, p) => sum + p.budgetTotal, 0)),
    change: '+15%',
    icon: DollarSign,
    color: 'bg-green-500',
  },
  {
    title: 'Chi phí thực tế',
    value: formatCurrency(EXPENSE_ENTRIES.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0)),
    change: '+8%',
    icon: TrendingUp,
    color: 'bg-blue-500',
  },
  {
    title: 'Cảnh báo rủi ro',
    value: RISK_ALERTS.filter(r => !r.resolved).length.toString(),
    change: '-2',
    icon: AlertTriangle,
    color: 'bg-red-500',
  },
  {
    title: 'Hiệu suất nhân sự',
    value: `${Math.round(TEAM_MEMBERS.reduce((sum, m) => sum + m.workloadPercent, 0) / TEAM_MEMBERS.length)}%`,
    change: '+5%',
    icon: Users,
    color: 'bg-purple-500',
  },
];

const cashFlowData = [
  { month: 'T1', thu: 500000000, chi: 400000000 },
  { month: 'T2', thu: 600000000, chi: 550000000 },
  { month: 'T3', thu: 700000000, chi: 650000000 },
  { month: 'T4', thu: 800000000, chi: 700000000 },
  { month: 'T5', thu: 750000000, chi: 720000000 },
  { month: 'T6', thu: 900000000, chi: 850000000 },
];

const projectHealthData = PROJECTS.map(p => {
  const { budget, actual } = getTotalBudgetVsActual(p.id);
  const health = budget > 0 ? Math.min((actual / budget) * 100, 100) : 0;
  return {
    name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
    health: Math.round(health),
    budget: budget,
    actual: actual,
  };
});

const baselineComparisonData = [
  { category: 'Ngân sách', baseline: 100, actual: 115 },
  { category: 'Thời gian', baseline: 100, actual: 95 },
  { category: 'Chất lượng', baseline: 100, actual: 105 },
  { category: 'Nhân sự', baseline: 100, actual: 98 },
];

export default function FinancialOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Tài chính</h1>
          <p className="text-gray-600 mt-1">
            Tổng quan real-time về sức khỏe dự án và dòng tiền
          </p>
        </div>
        <Button>
          <BarChart3 className="w-4 h-4 mr-2" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialStats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} so với tháng trước
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Dòng tiền thu chi</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Area
                type="monotone"
                dataKey="thu"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="chi"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Project Health Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Sức khỏe dự án</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectHealthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="health" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Baseline Comparison */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">So sánh với Baseline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={baselineComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="baseline" fill="#94a3b8" name="Baseline" />
              <Bar dataKey="actual" fill="#10b981" name="Thực tế" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Categories Pie */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Phân bổ chi phí</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={COST_CATEGORIES.slice(0, 4)}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="amount"
                nameKey="name"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {COST_CATEGORIES.slice(0, 4).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={TASK_PIE_COLORS[index % TASK_PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
        <div className="space-y-4">
          {RISK_ALERTS.slice(0, 3).map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className={`w-5 h-5 ${alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-600">{alert.createdAt}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {alert.severity === 'high' ? 'Cao' : alert.severity === 'medium' ? 'Trung bình' : 'Thấp'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}