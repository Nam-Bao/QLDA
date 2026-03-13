import { TEAM_MEMBERS } from '../lib/mockData';
import {
  FolderKanban,
  Clock,
  CheckCircle2,
  Users,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../components/Button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const statsCards = [
  {
    title: 'Tổng dự án',
    value: '24',
    change: '+12%',
    icon: FolderKanban,
    color: 'bg-blue-500',
  },
  {
    title: 'Đang thực hiện',
    value: '15',
    change: '+8%',
    icon: Clock,
    color: 'bg-yellow-500',
  },
  {
    title: 'Hoàn thành',
    value: '9',
    change: '+25%',
    icon: CheckCircle2,
    color: 'bg-green-500',
  },
  {
    title: 'Thành viên',
    value: TEAM_MEMBERS.length.toString(),
    change: '+4%',
    icon: Users,
    color: 'bg-purple-500',
  },
];

const projectData = [
  { name: 'T1', projects: 12 },
  { name: 'T2', projects: 15 },
  { name: 'T3', projects: 18 },
  { name: 'T4', projects: 20 },
  { name: 'T5', projects: 24 },
  { name: 'T6', projects: 22 },
];

const statusData = [
  { name: 'Đang thực hiện', value: 15, color: '#f59e0b' },
  { name: 'Hoàn thành', value: 9, color: '#10b981' },
  { name: 'Tạm dừng', value: 3, color: '#ef4444' },
];

const recentProjects = [
  {
    name: 'Website Thương mại điện tử',
    status: 'Đang thực hiện',
    progress: 75,
    team: 8,
    deadline: '15/04/2026',
  },
  {
    name: 'Ứng dụng Mobile Banking',
    status: 'Đang thực hiện',
    progress: 60,
    team: 12,
    deadline: '30/04/2026',
  },
  {
    name: 'Hệ thống ERP',
    status: 'Đang thực hiện',
    progress: 40,
    team: 15,
    deadline: '20/05/2026',
  },
  {
    name: 'Portal Nội bộ',
    status: 'Hoàn thành',
    progress: 100,
    team: 6,
    deadline: '01/03/2026',
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Tổng quan quản lý dự án CNTT
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <div
            key={`stat-${stat.title}-${index}`}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="mt-2">{stat.value}</h3>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-4">Xu hướng dự án</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectData} id="dashboard-bar-chart">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="projects" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-4">Trạng thái dự án</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart id="dashboard-pie-chart">
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`dashboard-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3>Dự án gần đây</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3">Tên dự án</th>
                <th className="text-left px-6 py-3">Trạng thái</th>
                <th className="text-left px-6 py-3">Tiến độ</th>
                <th className="text-left px-6 py-3">Nhóm</th>
                <th className="text-left px-6 py-3">Deadline</th>
                <th className="text-left px-6 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((project, index) => (
                <tr key={`project-${project.name}-${index}`} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4">{project.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs ${
                        project.status === 'Hoàn thành'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {project.status === 'Hoàn thành' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{project.team}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{project.deadline}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">
                      Chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-yellow-900">Cảnh báo deadline</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Có 3 dự án sắp đến deadline trong vòng 7 ngày tới. Vui lòng kiểm
              tra và cập nhật tiến độ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
