import { useState, useMemo } from 'react';
import { CheckSquare, Search, Calendar, User, Filter, BarChart3, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router';

const tasks = [
  {
    id: 1,
    title: 'Thiết kế giao diện trang chủ',
    project: 'Website Thương mại điện tử',
    assignee: 'Nguyễn Văn A',
    priority: 'high',
    status: 'todo',
    dueDate: '15/03/2026',
  },
  {
    id: 2,
    title: 'Phát triển API đăng nhập',
    project: 'Ứng dụng Mobile Banking',
    assignee: 'Trần Thị B',
    priority: 'high',
    status: 'in-progress',
    dueDate: '18/03/2026',
  },
  {
    id: 3,
    title: 'Viết test case cho module thanh toán',
    project: 'Website Thương mại điện tử',
    assignee: 'Lê Văn C',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '20/03/2026',
  },
  {
    id: 4,
    title: 'Review code module giỏ hàng',
    project: 'Website Thương mại điện tử',
    assignee: 'Phạm Thị D',
    priority: 'medium',
    status: 'review',
    dueDate: '14/03/2026',
  },
  {
    id: 5,
    title: 'Deploy lên môi trường staging',
    project: 'Portal Nội bộ',
    assignee: 'Hoàng Văn E',
    priority: 'low',
    status: 'done',
    dueDate: '10/03/2026',
  },
  {
    id: 6,
    title: 'Tích hợp payment gateway',
    project: 'Website Thương mại điện tử',
    assignee: 'Nguyễn Văn F',
    priority: 'high',
    status: 'todo',
    dueDate: '25/03/2026',
  },
];

const statusColumns = {
  todo: { title: 'Cần làm', color: 'bg-gray-100', count: 0 },
  'in-progress': { title: 'Đang làm', color: 'bg-blue-100', count: 0 },
  review: { title: 'Review', color: 'bg-yellow-100', count: 0 },
  done: { title: 'Hoàn thành', color: 'bg-green-100', count: 0 },
};

const priorityColors = {
  high: 'border-l-4 border-l-red-500',
  medium: 'border-l-4 border-l-yellow-500',
  low: 'border-l-4 border-l-green-500',
};

export function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Tính toán thống kê
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const overdue = tasks.filter(t => {
      const dueDate = new Date(t.dueDate.split('/').reverse().join('-'));
      return dueDate < new Date() && t.status !== 'done';
    }).length;

    return { total, completed, inProgress, overdue };
  }, []);

  // Lấy danh sách dự án duy nhất
  const projects = useMemo(() => {
    return Array.from(new Set(tasks.map(t => t.project)));
  }, []);

  // Lọc tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchSearch = searchTerm === '' ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.project.toLowerCase().includes(searchTerm.toLowerCase());

      const matchProject = filterProject === 'all' || task.project === filterProject;
      const matchStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchPriority = filterPriority === 'all' || task.priority === filterPriority;

      return matchSearch && matchProject && matchStatus && matchPriority;
    });
  }, [searchTerm, filterProject, filterStatus, filterPriority]);

  // Count tasks by status cho filtered tasks
  const tasksByStatus = useMemo(() => {
    return filteredTasks.reduce((acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    }, {} as Record<string, typeof tasks>);
  }, [filteredTasks]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Quản lý công việc</h1>
          <p className="text-muted-foreground mt-1">
            Tổng quan tất cả công việc trong hệ thống
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng công việc</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
            <CheckSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đang thực hiện</p>
              <h3 className="text-2xl font-bold text-blue-600">{stats.inProgress}</h3>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Hoàn thành</p>
              <h3 className="text-2xl font-bold text-green-600">{stats.completed}</h3>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Quá hạn</p>
              <h3 className="text-2xl font-bold text-red-600">{stats.overdue}</h3>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm công việc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Tất cả dự án</option>
            {projects.map(project => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="todo">Cần làm</option>
            <option value="in-progress">Đang thực hiện</option>
            <option value="review">Review</option>
            <option value="done">Hoàn thành</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Tất cả ưu tiên</option>
            <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
          </select>

          <div className="flex items-center justify-center">
            <span className="text-sm text-muted-foreground">
              {filteredTasks.length} kết quả
            </span>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(statusColumns).map(([status, config]) => (
          <div key={status} className="flex flex-col">
            <div className="bg-card border border-border rounded-t-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2">
                  {config.title}
                  <span className="bg-muted px-2 py-0.5 rounded-full text-sm">
                    {tasksByStatus[status]?.length || 0}
                  </span>
                </h3>
              </div>
            </div>

            <div className="space-y-3 bg-muted/30 border-x border-b border-border rounded-b-lg p-3 flex-1">
              {tasksByStatus[status]?.map((task) => (
                <div
                  key={task.id}
                  className={`bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow ${
                    priorityColors[task.priority]
                  }`}
                >
                  <h4 className="text-sm font-medium mb-2">{task.title}</h4>

                  <div className="mb-3">
                    <Link
                      to={`/projects/${(task.project || 'p1')
                        .toString()
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '')}/tasks`}
                      className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      📁 {task.project}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{task.dueDate}</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority === 'high' ? 'Cao' :
                       task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </span>
                  </div>
                </div>
              ))}

              {(!tasksByStatus[status] || tasksByStatus[status].length === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Không có công việc nào</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng công việc</p>
              <h3 className="mt-1">{tasks.length}</h3>
            </div>
            <CheckSquare className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đang thực hiện</p>
              <h3 className="mt-1">{tasksByStatus['in-progress']?.length || 0}</h3>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đang review</p>
              <h3 className="mt-1">{tasksByStatus['review']?.length || 0}</h3>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Hoàn thành</p>
              <h3 className="mt-1">{tasksByStatus['done']?.length || 0}</h3>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
