import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import {
  ArrowLeft,
  FolderKanban,
  ChevronRight,
  Edit2,
  Paperclip,
  MessageSquare,
  History,
  Send,
  Download,
  File,
  FileText,
  Flag,
  User,
  Calendar,
  Clock,
  Tag,
  CheckCircle2,
  Circle,
  RotateCcw,
  AlertCircle,
  Trash2,
  Plus,
  MoreVertical,
  Activity,
  Link2,
  Eye,
} from 'lucide-react';
import { Button } from '../../components/Button';
import { getTaskById, getMemberById, getProjectById, type TaskStatus } from '../../lib/mockData';
import { cn } from '../../lib/utils';

type DetailTab = 'comments' | 'history';

const statusOptions: { value: TaskStatus; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'todo', label: 'Cần làm', icon: <Circle className="w-4 h-4" />, color: 'text-gray-600' },
  { value: 'in-progress', label: 'Đang thực hiện', icon: <RotateCcw className="w-4 h-4" />, color: 'text-blue-600' },
  { value: 'review', label: 'Đang review', icon: <AlertCircle className="w-4 h-4" />, color: 'text-yellow-600' },
  { value: 'done', label: 'Hoàn thành', icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-green-600' },
];

const priorityOptions = [
  { value: 'critical', label: 'Nghiêm trọng', color: 'text-red-700 bg-red-100', dot: 'bg-red-500' },
  { value: 'high', label: 'Cao', color: 'text-orange-700 bg-orange-100', dot: 'bg-orange-500' },
  { value: 'medium', label: 'Trung bình', color: 'text-yellow-700 bg-yellow-100', dot: 'bg-yellow-500' },
  { value: 'low', label: 'Thấp', color: 'text-green-700 bg-green-100', dot: 'bg-green-500' },
];

const fileIconMap: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5 text-red-500" />,
  figma: <File className="w-5 h-5 text-purple-500" />,
  excel: <File className="w-5 h-5 text-green-500" />,
  yaml: <File className="w-5 h-5 text-blue-500" />,
  default: <Paperclip className="w-5 h-5 text-muted-foreground" />,
};

export default function TaskDetail() {
  const { id: taskId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DetailTab>('comments');
  const [currentStatus, setCurrentStatus] = useState<TaskStatus | null>(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<{ id: string; author: string; role: string; content: string; createdAt: string }[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  const task = getTaskById(taskId || '');

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <CheckCircle2 className="w-16 h-16 text-muted-foreground" />
        <h2>Không tìm thấy công việc</h2>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </Button>
      </div>
    );
  }

  const project = getProjectById(task.projectId);
  const assignee = getMemberById(task.assigneeId);
  const reporter = getMemberById(task.reporterId);
  const activeStatus = currentStatus ?? task.status;
  const currentStatusOption = statusOptions.find((s) => s.value === activeStatus)!;
  const currentPriority = priorityOptions.find((p) => p.value === task.priority)!;
  const progressPct = task.estimatedHours > 0
    ? Math.min(100, Math.round((task.loggedHours / task.estimatedHours) * 100))
    : 0;

  const allComments = [...task.comments, ...comments];

  const handleSendComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        author: 'Nguyễn Văn An',
        role: 'Senior Dev',
        content: newComment,
        createdAt: new Date().toLocaleString('vi-VN'),
      },
    ]);
    setNewComment('');
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    setCurrentStatus(newStatus);
  };

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        <Link to="/projects" className="hover:text-primary transition-colors flex items-center gap-1">
          <FolderKanban className="w-4 h-4" /> Dự án
        </Link>
        <ChevronRight className="w-4 h-4" />
        {project && (
          <>
            <Link to={`/projects/${project.id}`} className="hover:text-primary transition-colors truncate max-w-[120px]">
              {project.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/projects/${project.id}/tasks`} className="hover:text-primary transition-colors">
              Bảng công việc
            </Link>
            <ChevronRight className="w-4 h-4" />
          </>
        )}
        <span className="text-foreground truncate max-w-[200px]">{task.title}</span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Main Task Info */}
        <div className="xl:col-span-2 space-y-5">
          {/* Title Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex-1">
                {isEditingTitle ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="flex-1 text-xl border border-border rounded-lg px-3 py-1 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                    />
                    <Button size="sm" onClick={() => setIsEditingTitle(false)}>Lưu</Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditingTitle(false)}>Hủy</Button>
                  </div>
                ) : (
                  <h1 className="leading-snug">{editedTitle || task.title}</h1>
                )}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {task.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => {
                    setEditedTitle(task.title);
                    setIsEditingTitle(true);
                  }}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-sm text-muted-foreground">Trạng thái:</span>
              <div className="flex items-center gap-1 flex-wrap">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleStatusChange(opt.value)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-all',
                      activeStatus === opt.value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:bg-muted'
                    )}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="mb-2 text-sm text-muted-foreground">Mô tả</h4>
              <p className="text-sm leading-relaxed bg-muted/30 rounded-lg p-3">{task.description}</p>
            </div>

            {/* Progress */}
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Tiến độ thực hiện</span>
                <span className="font-semibold">{task.loggedHours}h / {task.estimatedHours}h ({progressPct}%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2">
                <Paperclip className="w-5 h-5 text-primary" /> Tệp đính kèm
                <span className="text-sm text-muted-foreground">({task.attachments.length})</span>
              </h3>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4" /> Tải lên
              </Button>
            </div>

            {task.attachments.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Paperclip className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Chưa có tệp đính kèm</p>
                <button className="text-sm text-primary hover:underline mt-1">Tải lên tệp đầu tiên</button>
              </div>
            ) : (
              <div className="space-y-2">
                {task.attachments.map((att) => (
                  <div key={att.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 group">
                    <div className="flex items-center gap-3">
                      {fileIconMap[att.type] ?? fileIconMap.default}
                      <div>
                        <p className="text-sm">{att.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {att.size} · {att.uploadedBy} · {att.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-muted rounded transition-colors" title="Xem">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-muted rounded transition-colors" title="Tải xuống">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-muted rounded transition-colors text-destructive" title="Xóa">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comments & History Tabs */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="border-b border-border flex">
              <button
                onClick={() => setActiveTab('comments')}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 text-sm border-b-2 transition-colors',
                  activeTab === 'comments'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <MessageSquare className="w-4 h-4" />
                Bình luận
                {allComments.length > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                    {allComments.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 text-sm border-b-2 transition-colors',
                  activeTab === 'history'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <History className="w-4 h-4" />
                Lịch sử
              </button>
            </div>

            <div className="p-5">
              {/* Comments Tab */}
              {activeTab === 'comments' && (
                <div className="space-y-4">
                  {allComments.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Chưa có bình luận nào</p>
                    </div>
                  )}
                  {allComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                        {comment.author.split(' ').pop()?.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{comment.author}</span>
                          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            {comment.role}
                          </span>
                          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                        </div>
                        <div className="bg-muted/40 rounded-lg p-3 text-sm leading-relaxed">
                          {comment.content}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* New comment input */}
                  <div className="flex gap-3 pt-2">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                      An
                    </div>
                    <div className="flex-1 flex gap-2">
                      <textarea
                        placeholder="Viết bình luận... (Nhấn Enter để gửi)"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendComment();
                          }
                        }}
                        rows={2}
                        className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      />
                      <Button size="sm" onClick={handleSendComment} disabled={!newComment.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-0">
                  {task.history.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <History className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Chưa có lịch sử chỉnh sửa</p>
                    </div>
                  ) : (
                    task.history.map((entry, idx) => (
                      <div key={entry.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-muted border-2 border-border rounded-full flex items-center justify-center flex-shrink-0">
                            <Activity className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          {idx < task.history.length - 1 && (
                            <div className="w-0.5 flex-1 bg-border min-h-[16px] my-1" />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="text-sm">
                            <strong>{entry.actor}</strong> {entry.action}
                            {entry.field && (
                              <>
                                {' '}trường <strong>{entry.field}</strong>
                              </>
                            )}
                          </p>
                          {(entry.oldValue || entry.newValue) && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {entry.oldValue && (
                                <span className="line-through mr-2">{entry.oldValue}</span>
                              )}
                              {entry.newValue && (
                                <span className="text-primary">{entry.newValue}</span>
                              )}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {entry.createdAt}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Sidebar Info */}
        <div className="space-y-4">
          {/* Status Quick Change */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h4 className="text-sm text-muted-foreground mb-3">Trạng thái hiện tại</h4>
            <div
              className={cn(
                'flex items-center gap-2 p-3 rounded-lg border',
                activeStatus === 'done'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : activeStatus === 'in-progress'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : activeStatus === 'review'
                  ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              )}
            >
              {currentStatusOption.icon}
              <span className="text-sm">{currentStatusOption.label}</span>
            </div>
          </div>

          {/* Details */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-4">
            <h4 className="text-sm text-muted-foreground border-b border-border pb-2">Chi tiết</h4>

            <InfoRow
              icon={<Flag className="w-4 h-4 text-muted-foreground" />}
              label="Ưu tiên"
              value={
                <span className={cn('text-xs px-2 py-1 rounded-full flex items-center gap-1', currentPriority.color)}>
                  <span className={cn('w-2 h-2 rounded-full', currentPriority.dot)} />
                  {currentPriority.label}
                </span>
              }
            />
            <InfoRow
              icon={<User className="w-4 h-4 text-muted-foreground" />}
              label="Phụ trách"
              value={
                assignee ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                      {assignee.avatar.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-xs">{assignee.name}</p>
                      <p className="text-xs text-muted-foreground">{assignee.role}</p>
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">Chưa gán</span>
                )
              }
            />
            <InfoRow
              icon={<User className="w-4 h-4 text-muted-foreground" />}
              label="Người tạo"
              value={
                reporter ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs">
                      {reporter.avatar.slice(0, 1)}
                    </div>
                    <span className="text-xs">{reporter.name}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">—</span>
                )
              }
            />
            <InfoRow
              icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
              label="Bắt đầu"
              value={<span className="text-sm">{new Date(task.startDate).toLocaleDateString('vi-VN')}</span>}
            />
            <InfoRow
              icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
              label="Deadline"
              value={
                <span className={cn('text-sm', new Date(task.dueDate) < new Date() && activeStatus !== 'done' ? 'text-red-600' : '')}>
                  {new Date(task.dueDate).toLocaleDateString('vi-VN')}
                </span>
              }
            />
            <InfoRow
              icon={<Clock className="w-4 h-4 text-muted-foreground" />}
              label="Thời gian"
              value={
                <span className="text-sm">{task.loggedHours}h / {task.estimatedHours}h ước tính</span>
              }
            />
            {project && (
              <InfoRow
                icon={<FolderKanban className="w-4 h-4 text-muted-foreground" />}
                label="Dự án"
                value={
                  <Link to={`/projects/${project.id}`} className="text-sm text-primary hover:underline">
                    {project.name}
                  </Link>
                }
              />
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h4 className="text-sm text-muted-foreground mb-3">Thao tác nhanh</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-left">
                <Clock className="w-4 h-4 text-primary" /> Ghi nhận thời gian làm việc
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-left">
                <Link2 className="w-4 h-4 text-primary" /> Liên kết công việc khác
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-left">
                <Paperclip className="w-4 h-4 text-primary" /> Đính kèm tệp
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-left">
                <Trash2 className="w-4 h-4" /> Xóa công việc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <div>{value}</div>
      </div>
    </div>
  );
}
