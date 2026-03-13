import { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import {
  ArrowLeft,
  FolderKanban,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  ChevronRight,
  User,
  Calendar,
  Flag,
  MoreVertical,
  Clock,
  CheckCircle2,
  AlertCircle,
  Circle,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../../components/Button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  getProjectById,
  getTasksByProject,
  getMemberById,
  type Task,
  type TaskStatus,
} from '../../lib/mockData';
import { cn } from '../../lib/utils';

type ViewMode = 'kanban';

const statusColumns: { id: TaskStatus; label: string; icon: React.ReactNode; bg: string; headerColor: string }[] = [
  {
    id: 'todo',
    label: 'Cần làm',
    icon: <Circle className="w-4 h-4 text-gray-500" />,
    bg: 'bg-gray-50',
    headerColor: 'border-t-gray-400',
  },
  {
    id: 'in-progress',
    label: 'Đang thực hiện',
    icon: <RotateCcw className="w-4 h-4 text-blue-500" />,
    bg: 'bg-blue-50',
    headerColor: 'border-t-blue-500',
  },
  {
    id: 'review',
    label: 'Đang review',
    icon: <AlertCircle className="w-4 h-4 text-yellow-500" />,
    bg: 'bg-yellow-50',
    headerColor: 'border-t-yellow-500',
  },
  {
    id: 'done',
    label: 'Hoàn thành',
    icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    bg: 'bg-green-50',
    headerColor: 'border-t-green-500',
  },
];

const priorityConfig: Record<string, { label: string; color: string; bar: string; dot: string }> = {
  critical: { label: 'Nghiêm trọng', color: 'text-red-700 bg-red-100', bar: 'border-l-red-600', dot: 'bg-red-500' },
  high: { label: 'Cao', color: 'text-orange-700 bg-orange-100', bar: 'border-l-orange-500', dot: 'bg-orange-500' },
  medium: { label: 'Trung bình', color: 'text-yellow-700 bg-yellow-100', bar: 'border-l-yellow-500', dot: 'bg-yellow-500' },
  low: { label: 'Thấp', color: 'text-green-700 bg-green-100', bar: 'border-l-green-500', dot: 'bg-green-500' },
};

interface NewTaskForm {
  title: string;
  assigneeId: string;
  priority: string;
  dueDate: string;
  status: TaskStatus;
}

export default function TaskBoard() {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTaskColumn, setNewTaskColumn] = useState<TaskStatus>('todo');
  const [newTask, setNewTask] = useState<NewTaskForm>({
    title: '',
    assigneeId: '',
    priority: 'medium',
    dueDate: '',
    status: 'todo',
  });
  const [localTasks, setLocalTasks] = useState<Task[]>(() =>
    getTasksByProject(projectId || 'p1')
  );

  const project = getProjectById(projectId || 'p1');

  const filteredTasks = localTasks.filter((t) => {
    const matchSearch =
      search === '' || t.title.toLowerCase().includes(search.toLowerCase());
    const matchPriority = filterPriority === 'all' || t.priority === filterPriority;
    return matchSearch && matchPriority;
  });

  const tasksByStatus = statusColumns.reduce((acc, col) => {
    acc[col.id] = filteredTasks.filter((t) => t.status === col.id);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    const task: Task = {
      id: `t-${Date.now()}`,
      projectId: projectId || 'p1',
      title: newTask.title,
      description: '',
      status: newTaskColumn,
      priority: newTask.priority as Task['priority'],
      assigneeId: newTask.assigneeId || 'tm1',
      reporterId: 'tm8',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: newTask.dueDate || new Date(Date.now() + 7 * 864e5).toISOString().split('T')[0],
      tags: [],
      estimatedHours: 8,
      loggedHours: 0,
      attachments: [],
      comments: [],
      history: [
        {
          id: `h-${Date.now()}`,
          actor: 'Bạn',
          action: 'Tạo công việc',
          createdAt: new Date().toLocaleDateString('vi-VN'),
        },
      ],
    };
    setLocalTasks((prev) => [...prev, task]);
    setNewTask({ title: '', assigneeId: '', priority: 'medium', dueDate: '', status: 'todo' });
    setShowNewTaskModal(false);
  };

  const handleMoveTask = (taskId: string, newStatus: TaskStatus) => {
    setLocalTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="space-y-5 h-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/projects" className="hover:text-primary transition-colors flex items-center gap-1">
          <FolderKanban className="w-4 h-4" /> Dự án
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link
          to={`/projects/${projectId}`}
          className="hover:text-primary transition-colors truncate max-w-[160px]"
        >
          {project?.name || 'Chi tiết dự án'}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Bảng công việc</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1>Bảng công việc</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {project?.name} · {filteredTasks.length} công việc
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <Button
            size="sm"
            onClick={() => {
              setNewTaskColumn('todo');
              setShowNewTaskModal(true);
            }}
          >
            <Plus className="w-4 h-4" /> Tạo công việc
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm công việc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Tất cả ưu tiên</option>
            <option value="critical">Nghiêm trọng</option>
            <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
          </select>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{filteredTasks.filter((t) => t.status !== 'done').length} đang mở</span>
          <span>·</span>
          <span>{filteredTasks.filter((t) => t.status === 'done').length} hoàn thành</span>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {statusColumns.map((col) => (
            <div key={col.id} className="flex flex-col min-h-[400px]">
              {/* Column Header */}
              <div
                className={cn(
                  'bg-card border border-border rounded-t-xl p-3 border-t-2',
                  col.headerColor
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {col.icon}
                    <span className="text-sm">{col.label}</span>
                    <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                      {tasksByStatus[col.id]?.length || 0}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setNewTaskColumn(col.id);
                      setShowNewTaskModal(true);
                    }}
                    className="p-1 hover:bg-muted rounded transition-colors"
                    title="Thêm công việc"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div
                className={cn(
                  'flex-1 border-x border-b border-border rounded-b-xl p-2 space-y-2',
                  col.bg
                )}
              >
                {(tasksByStatus[col.id] || []).map((task) => {
                  const assignee = getMemberById(task.assigneeId);
                  const prio = priorityConfig[task.priority];
                  return (
                    <div
                      key={task.id}
                      onClick={() => navigate(`/tasks/${task.id}`)}
                      className={cn(
                        'bg-card border border-border rounded-lg p-3 cursor-pointer hover:shadow-md transition-all group border-l-4',
                        prio.bar
                      )}
                    >
                      {/* Tags */}
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {task.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {task.title}
                      </p>

                      {/* Progress */}
                      {task.estimatedHours > 0 && (
                        <div className="mb-2">
                          <div className="h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width: `${Math.min(100, Math.round((task.loggedHours / task.estimatedHours) * 100))}%`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
                            <span>{task.loggedHours}h / {task.estimatedHours}h</span>
                            <span>{Math.min(100, Math.round((task.loggedHours / task.estimatedHours) * 100))}%</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs">
                        <span className={cn('px-1.5 py-0.5 rounded', prio.color)}>{prio.label}</span>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                          })}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                            {assignee?.avatar?.slice(0, 1) || '?'}
                          </div>
                          <span className="truncate max-w-[80px]">{assignee?.name || '—'}</span>
                        </div>
                        {task.comments.length > 0 && (
                          <span className="text-xs text-muted-foreground">
                            💬 {task.comments.length}
                          </span>
                        )}
                      </div>

                      {/* Quick move */}
                      <div className="hidden group-hover:flex items-center gap-1 mt-2 pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground mr-1">Di chuyển:</span>
                        {statusColumns
                          .filter((c) => c.id !== col.id)
                          .map((c) => (
                            <button
                              key={c.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveTask(task.id, c.id);
                              }}
                              className="text-xs px-1.5 py-0.5 bg-muted hover:bg-primary hover:text-primary-foreground rounded transition-colors"
                            >
                              {c.label.split(' ')[0]}
                            </button>
                          ))}
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={() => {
                    setNewTaskColumn(col.id);
                    setShowNewTaskModal(true);
                  }}
                  className="w-full p-3 border-2 border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Thêm công việc
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-md shadow-xl">
            <div className="p-5 border-b border-border">
              <h3>Tạo công việc mới</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Thêm vào cột: <strong>{statusColumns.find((c) => c.id === newTaskColumn)?.label}</strong>
              </p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm mb-1.5">Tiêu đề công việc *</label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề..."
                  value={newTask.title}
                  onChange={(e) => setNewTask((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1.5">Mức độ ưu tiên</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask((p) => ({ ...p, priority: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="critical">Nghiêm trọng</option>
                    <option value="high">Cao</option>
                    <option value="medium">Trung bình</option>
                    <option value="low">Thấp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Deadline</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask((p) => ({ ...p, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5">Người thực hiện</label>
                <select
                  value={newTask.assigneeId}
                  onChange={(e) => setNewTask((p) => ({ ...p, assigneeId: e.target.value }))}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">— Chưa gán —</option>
                  {['tm1', 'tm2', 'tm3', 'tm4', 'tm5', 'tm6', 'tm7', 'tm8'].map((mid) => {
                    const m = getMemberById(mid);
                    return m ? (
                      <option key={mid} value={mid}>
                        {m.name} ({m.role})
                      </option>
                    ) : null;
                  })}
                </select>
              </div>
            </div>
            <div className="p-5 border-t border-border flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowNewTaskModal(false)}>
                Hủy
              </Button>
              <Button size="sm" onClick={handleAddTask} disabled={!newTask.title.trim()}>
                <Plus className="w-4 h-4" /> Tạo công việc
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
