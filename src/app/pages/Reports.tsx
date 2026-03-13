import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';
import { Button } from '../components/Button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const performanceData = [
  { month: 'T1', completed: 8, inProgress: 12, planned: 5 },
  { month: 'T2', completed: 10, inProgress: 15, planned: 6 },
  { month: 'T3', completed: 12, inProgress: 18, planned: 8 },
  { month: 'T4', completed: 15, inProgress: 20, planned: 10 },
  { month: 'T5', completed: 18, inProgress: 24, planned: 12 },
  { month: 'T6', completed: 20, inProgress: 22, planned: 15 },
];

const productivityData = [
  { week: 'Tuần 1', productivity: 85 },
  { week: 'Tuần 2', productivity: 88 },
  { week: 'Tuần 3', productivity: 82 },
  { week: 'Tuần 4', productivity: 90 },
  { week: 'Tuần 5', productivity: 87 },
  { week: 'Tuần 6', productivity: 92 },
];

const budgetData = [
  { project: 'E-commerce', budget: 500, spent: 375 },
  { project: 'Mobile Banking', budget: 800, spent: 480 },
  { project: 'ERP System', budget: 1200, spent: 480 },
  { project: 'CRM', budget: 450, spent: 45 },
  { project: 'Analytics', budget: 700, spent: 385 },
];

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Báo cáo & Phân tích</h1>
          <p className="text-muted-foreground mt-1">
            Thống kê và phân tích hiệu suất dự án
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4" />
            Chọn khoảng thời gian
          </Button>
          <Button>
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Hiệu suất trung bình</p>
              <h3 className="mt-2">87.5%</h3>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+5.2% so với tháng trước</span>
              </div>
            </div>
            <BarChart3 className="w-12 h-12 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Dự án hoàn thành</p>
              <h3 className="mt-2">93 dự án</h3>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+12 dự án</span>
              </div>
            </div>
            <BarChart3 className="w-12 h-12 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Ngân sách sử dụng</p>
              <h3 className="mt-2">1.76B/3.65B</h3>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <span>48.2% tổng ngân sách</span>
              </div>
            </div>
            <BarChart3 className="w-12 h-12 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Thời gian trung bình</p>
              <h3 className="mt-2">3.2 tháng</h3>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <span>Mỗi dự án</span>
              </div>
            </div>
            <BarChart3 className="w-12 h-12 opacity-50" />
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-4">Xu hướng hiệu suất dự án</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData} id="reports-area-chart">
              <defs>
                <linearGradient id="reports-completed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="reports-inProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="reports-planned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#reports-completed)"
                name="Hoàn thành"
              />
              <Area
                type="monotone"
                dataKey="inProgress"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#reports-inProgress)"
                name="Đang thực hiện"
              />
              <Area
                type="monotone"
                dataKey="planned"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#reports-planned)"
                name="Lập kế hoạch"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Productivity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-4">Năng suất làm việc</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivityData} id="reports-line-chart">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="productivity"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 6 }}
                name="Năng suất (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="mb-4">Phân tích ngân sách dự án</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={budgetData} id="reports-bar-chart">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="project" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#3b82f6" name="Ngân sách (triệu)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="spent" fill="#10b981" name="Đã sử dụng (triệu)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Table */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3>Báo cáo chi tiết theo dự án</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3">Dự án</th>
                <th className="text-left px-6 py-3">Trạng thái</th>
                <th className="text-left px-6 py-3">Tiến độ</th>
                <th className="text-left px-6 py-3">Ngân sách</th>
                <th className="text-left px-6 py-3">Đã chi</th>
                <th className="text-left px-6 py-3">Hiệu suất</th>
                <th className="text-left px-6 py-3">Đánh giá</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((project, index) => (
                <tr key={`project-${project.project}-${index}`} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4">{project.project}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      Đang thực hiện
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 w-24">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${(project.spent / project.budget) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm">
                        {Math.round((project.spent / project.budget) * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{project.budget}M</td>
                  <td className="px-6 py-4">{project.spent}M</td>
                  <td className="px-6 py-4">
                    <span className="text-green-600">Tốt</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={`star-${project.project}-${i}`}
                          className={`text-lg ${
                            i < 4 ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
