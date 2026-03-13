import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import {
  ArrowLeft,
  FolderKanban,
  Users,
  Calendar,
  TrendingUp,
  CheckSquare,
  Clock,
  Plus,
  Edit2,
  Target,
  BarChart2,
  AlertCircle,
  ChevronRight,
  DollarSign,
  PlayCircle,
  FileText,
  Settings2,
  GitBranch,
  Award,
  MoreVertical,
} from 'lucide-react';
import { Button } from '../../components/Button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  PROJECTS,
  TEAM_MEMBERS,
  getProjectById,
  getMemberById,
  formatCurrency,
  type Project,
} from '../../lib/mockData';
import { cn } from '../../lib/utils';

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  planning: { label: 'Lập kế hoạch', color: 'text-gray-700', bg: 'bg-gray-100' },
  'in-progress': { label: 'Đang thực hiện', color: 'text-blue-700', bg: 'bg-blue-100' },
  completed: { label: 'Hoàn thành', color: 'text-green-700', bg: 'bg-green-100' },
  paused: { label: 'Tạm dừng', color: 'text-red-700', bg: 'bg-red-100' },
};

const priorityConfig: Record<string, { label: string; color: string; dot: string }> = {
  critical: { label: 'Nghiêm trọng', color: 'text-red-700', dot: 'bg-red-500' },
  high: { label: 'Cao', color: 'text-orange-600', dot: 'bg-orange-500' },
  medium: { label: 'Trung bình', color: 'text-yellow-600', dot: 'bg-yellow-500' },
  low: { label: 'Thấp', color: 'text-green-600', dot: 'bg-green-500' },
};

const milestoneStatusConfig = {
  done: { icon: '✓', color: 'bg-green-500 text-white', line: 'bg-green-500' },
  current: { icon: '●', color: 'bg-blue-500 text-white animate-pulse', line: 'bg-gray-200' },
  upcoming: { icon: '○', color: 'bg-gray-200 text-gray-400', line: 'bg-gray-200' },
};

const TASK_PIE_COLORS = ['#94a3b8', '#3b82f6', '#f59e0b', '#10b981'];

const tabs = [
  { id: 'overview', label: 'Tổng quan', icon: BarChart2 },
  { id: 'tasks', label: 'Công việc', icon: CheckSquare },
  { id: 'team', label: 'Thành viên', icon: Users },
  { id: 'documents', label: 'Tài liệu', icon: FileText },
];

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const project = getProjectById(id || '');

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <FolderKanban className="w-16 h-16 text-muted-foreground" />
        <h2>Không tìm thấy dự án</h2>
        <Button onClick={() => navigate('/projects')}>
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
        </Button>
      </div>
    );
  }

  const teamMembers = project.teamIds.map((id) => getMemberById(id)).filter(Boolean);
  const budgetPercent = Math.round((project.budgetUsed / project.budgetTotal) * 100);
  const totalTasks =
    project.taskStats.todo +
    project.taskStats.inProgress +
    project.taskStats.review +
    project.taskStats.done;

  const taskPieData = [
    { name: 'Cần làm', value: project.taskStats.todo },
    { name: 'Đang làm', value: project.taskStats.inProgress },
    { name: 'Review', value: project.taskStats.review },
    { name: 'Hoàn thành', value: project.taskStats.done },
  ];

  const status = statusConfig[project.status];
  const priority = priorityConfig[project.priority];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/projects" className="hover:text-primary transition-colors flex items-center gap-1">
          <FolderKanban className="w-4 h-4" />
          Dự án
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">{project.name}</span>
      </div>

      {/* Header */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Top color bar */}
        <div className="h-2 bg-gradient-to-r from-primary to-accent" />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <FolderKanban className="w-7 h-7 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1>{project.name}</h1>
                  <span className={cn('text-xs px-2.5 py-1 rounded-full', status.bg, status.color)}>
                    {status.label}
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <span className={cn('w-2 h-2 rounded-full', priority.dot)} />
                    <span className={priority.color}>Ưu tiên {priority.label}</span>
                  </span>
                </div>
                <p className="text-sm text-muted-foreground max-w-xl">{project.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> PM: <strong className="text-foreground">{project.pm}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {project.startDate} → {project.endDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> KH: <strong className="text-foreground">{project.customer}</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/projects/${id}/acceptance`)}
              >
                <Award className="w-4 h-4" /> Nghiệm thu
              </Button>
              <Button
                size="sm"
                onClick={() => navigate(`/projects/${id}/tasks`)}
              >
                <PlayCircle className="w-4 h-4" /> Bảng công việc
              </Button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5 space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tiến độ tổng thể</span>
              <span className="font-semibold text-primary">{project.progress}%</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-border px-6">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors',
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
              bg="bg-blue-50"
              label="Tiến độ"
              value={`${project.progress}%`}
              sub="So với kế hoạch"
            />
            <StatCard
              icon={<CheckSquare className="w-5 h-5 text-green-600" />}
              bg="bg-green-50"
              label="Công việc"
              value={`${project.taskStats.done}/${totalTasks}`}
              sub="Hoàn thành"
            />
            <StatCard
              icon={<Users className="w-5 h-5 text-purple-600" />}
              bg="bg-purple-50"
              label="Thành viên"
              value={String(teamMembers.length)}
              sub="Đang tham gia"
            />
            <StatCard
              icon={<DollarSign className="w-5 h-5 text-orange-600" />}
              bg="bg-orange-50"
              label="Ngân sách"
              value={`${budgetPercent}%`}
              sub={`${formatCurrency(project.budgetUsed)} / ${formatCurrency(project.budgetTotal)}`}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Chart */}
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3>Biểu đồ tiến độ</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Theo tuần</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={project.progressHistory}>
                  <defs>
                    <linearGradient id="colorPlan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip
                    formatter={(v, n) => [`${v}%`, n === 'plan' ? 'Kế hoạch' : 'Thực tế']}
                  />
                  <Legend
                    formatter={(v) => (v === 'plan' ? 'Kế hoạch' : 'Thực tế')}
                    wrapperStyle={{ fontSize: 12 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="plan"
                    stroke="#94a3b8"
                    strokeDasharray="5 5"
                    fill="url(#colorPlan)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#3b82f6"
                    fill="url(#colorActual)"
                    strokeWidth={2.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Task Distribution Pie */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="mb-4">Phân bổ công việc</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={taskPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {taskPieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={TASK_PIE_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v} task`]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {taskPieData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-sm inline-block"
                        style={{ backgroundColor: TASK_PIE_COLORS[idx] }}
                      />
                      {item.name}
                    </span>
                    <span className="text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Milestones + Budget */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Milestones */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" /> Mốc dự án
                </h3>
              </div>
              <div className="space-y-0">
                {project.milestones.map((ms, idx) => {
                  const cfg = milestoneStatusConfig[ms.status];
                  return (
                    <div key={ms.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            'w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0',
                            cfg.color
                          )}
                        >
                          {cfg.icon}
                        </div>
                        {idx < project.milestones.length - 1 && (
                          <div className={cn('w-0.5 flex-1 min-h-[20px] my-1', cfg.line)} />
                        )}
                      </div>
                      <div className="pb-4 min-w-0">
                        <p
                          className={cn(
                            'text-sm',
                            ms.status === 'done' ? 'line-through text-muted-foreground' : ''
                          )}
                        >
                          {ms.title}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" /> {ms.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Budget */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" /> Ngân sách
                </h3>
                <Button variant="ghost" size="sm">
                  <Edit2 className="w-4 h-4" /> Cập nhật
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Đã sử dụng</span>
                    <span className="text-sm font-semibold">{budgetPercent}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        budgetPercent >= 90 ? 'bg-red-500' : budgetPercent >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                      )}
                      style={{ width: `${budgetPercent}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Tổng ngân sách</p>
                    <p className="mt-1">{formatCurrency(project.budgetTotal)} VND</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Đã chi</p>
                    <p className="mt-1 text-orange-600">{formatCurrency(project.budgetUsed)} VND</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Còn lại</p>
                    <p className="mt-1 text-green-600">
                      {formatCurrency(project.budgetTotal - project.budgetUsed)} VND
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Dự báo vượt</p>
                    <p className="mt-1 text-muted-foreground">— VND</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">Tổng cộng {totalTasks} công việc</p>
            <Button size="sm" onClick={() => navigate(`/projects/${id}/tasks`)}>
              <PlayCircle className="w-4 h-4" /> Mở bảng Kanban
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Cần làm', count: project.taskStats.todo, color: 'bg-gray-100 text-gray-700' },
              { label: 'Đang làm', count: project.taskStats.inProgress, color: 'bg-blue-100 text-blue-700' },
              { label: 'Review', count: project.taskStats.review, color: 'bg-yellow-100 text-yellow-700' },
              { label: 'Hoàn thành', count: project.taskStats.done, color: 'bg-green-100 text-green-700' },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <span className={cn('text-sm px-2.5 py-1 rounded-full', s.color)}>{s.count}</span>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <p className="text-sm text-muted-foreground">Xem chi tiết và quản lý công việc trong bảng Kanban</p>
            </div>
            <div className="p-8 flex flex-col items-center justify-center gap-4">
              <CheckSquare className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">Chuyển sang Bảng công việc để quản lý task</p>
              <Button onClick={() => navigate(`/projects/${id}/tasks`)}>
                Mở Bảng công việc <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">{teamMembers.length} thành viên</p>
            <Button size="sm">
              <Plus className="w-4 h-4" /> Thêm thành viên
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => {
              if (!member) return null;
              const wl = member.workloadPercent;
              const wlColor = wl >= 90 ? 'bg-red-500' : wl >= 70 ? 'bg-yellow-500' : 'bg-green-500';
              const wlText = wl >= 90 ? 'text-red-600' : wl >= 70 ? 'text-yellow-600' : 'text-green-600';
              return (
                <div key={member.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                      {member.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Khối lượng công việc</span>
                        <span className={wlText}>{wl}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={cn('h-full rounded-full', wlColor)} style={{ width: `${wl}%` }} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {member.skills.slice(0, 3).map((sk) => (
                        <span key={sk} className="text-xs px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">Tài liệu dự án</p>
            <Button size="sm">
              <Plus className="w-4 h-4" /> Tải lên
            </Button>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {[
              { name: 'Project Charter.pdf', size: '1.2 MB', type: 'PDF', date: '02/01/2026', author: 'Bùi Thị Hoa' },
              { name: 'System Architecture.drawio', size: '890 KB', type: 'Diagram', date: '10/01/2026', author: 'Trần Thị Bình' },
              { name: 'UI Design System.fig', size: '8.5 MB', type: 'Figma', date: '20/01/2026', author: 'Phạm Thị Dung' },
              { name: 'API Documentation.yaml', size: '560 KB', type: 'YAML', date: '01/02/2026', author: 'Trần Thị Bình' },
              { name: 'Sprint Planning Q1.xlsx', size: '320 KB', type: 'Excel', date: '01/01/2026', author: 'Bùi Thị Hoa' },
            ].map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.size} · {doc.author} · {doc.date}</p>
                  </div>
                </div>
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">{doc.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  bg,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  bg: string;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', bg)}>{icon}</div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}
