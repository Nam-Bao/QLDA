import { useState } from 'react';
import {
  FolderKanban,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Users,
  Calendar,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const initialProjects = [
  {
    id: 'p1',
    name: 'Website Thương mại điện tử',
    description: 'Xây dựng nền tảng bán hàng trực tuyến với đầy đủ tính năng',
    status: 'in-progress',
    priority: 'high',
    progress: 75,
    team: 8,
    startDate: '01/01/2026',
    endDate: '15/04/2026',
    budget: '500M',
    tags: ['Web', 'E-commerce', 'React'],
  },
  {
    id: 'p2',
    name: 'Ứng dụng Mobile Banking',
    description: 'Phát triển ứng dụng ngân hàng di động cho iOS và Android',
    status: 'in-progress',
    priority: 'high',
    progress: 60,
    team: 12,
    startDate: '15/01/2026',
    endDate: '30/04/2026',
    budget: '800M',
    tags: ['Mobile', 'Banking', 'React Native'],
  },
  {
    id: 'p3',
    name: 'Hệ thống ERP',
    description: 'Triển khai hệ thống quản lý tài nguyên doanh nghiệp',
    status: 'in-progress',
    priority: 'medium',
    progress: 40,
    team: 15,
    startDate: '01/02/2026',
    endDate: '20/05/2026',
    budget: '1.2B',
    tags: ['Enterprise', 'ERP', 'Java'],
  },
  {
    id: 'p4',
    name: 'Portal Nội bộ',
    description: 'Cổng thông tin nội bộ cho nhân viên',
    status: 'completed',
    priority: 'low',
    progress: 100,
    team: 6,
    startDate: '01/12/2025',
    endDate: '01/03/2026',
    budget: '300M',
    tags: ['Web', 'Internal', 'Vue.js'],
  },
  {
    id: 'p5',
    name: 'Hệ thống CRM',
    description: 'Quản lý quan hệ khách hàng tự động',
    status: 'planning',
    priority: 'medium',
    progress: 10,
    team: 5,
    startDate: '15/03/2026',
    endDate: '30/06/2026',
    budget: '450M',
    tags: ['CRM', 'Sales', 'Angular'],
  },
  {
    id: 'p6',
    name: 'Data Analytics Platform',
    description: 'Nền tảng phân tích dữ liệu cho doanh nghiệp',
    status: 'in-progress',
    priority: 'high',
    progress: 55,
    team: 10,
    startDate: '01/02/2026',
    endDate: '15/05/2026',
    budget: '700M',
    tags: ['Data', 'Analytics', 'Python'],
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  planning: { label: 'Lập kế hoạch', color: 'bg-gray-100 text-gray-700' },
  'in-progress': { label: 'Đang thực hiện', color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-700' },
  paused: { label: 'Tạm dừng', color: 'bg-red-100 text-red-700' },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: 'Cao', color: 'text-red-600' },
  medium: { label: 'Trung bình', color: 'text-yellow-600' },
  low: { label: 'Thấp', color: 'text-green-600' },
};

export function Projects() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState(initialProjects);
  const [createOpen, setCreateOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleCreateProject = () => {
    const name = newProjectName.trim();
    if (!name) return;

    const newProject = {
      id: crypto.randomUUID(),
      name,
      description: newProjectDescription.trim(),
      status: 'planning',
      priority: 'medium',
      progress: 0,
      team: 1,
      startDate: new Date().toLocaleDateString('vi-VN'),
      endDate: '',
      budget: '',
      tags: [],
    };

    setProjects([newProject, ...projects]);
    setNewProjectName('');
    setNewProjectDescription('');
    setCreateOpen(false);
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Quản lý dự án</h1>
          <p className="text-muted-foreground mt-1">Danh sách tất cả dự án CNTT</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4" />
              Tạo dự án mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo dự án mới</DialogTitle>
              <DialogDescription>
                Nhập tên và mô tả để tạo dự án mới.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="project-name">Tên dự án</Label>
                <Input
                  id="project-name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Nhập tên dự án"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-desc">Mô tả</Label>
                <Input
                  id="project-desc"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="Mô tả ngắn gọn"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleCreateProject}>Tạo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm dự án..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4" />
              Lọc
            </Button>
            <div className="flex border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
              >
                Lưới
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
              >
                Danh sách
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FolderKanban className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4>{project.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{project.budget}</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-muted rounded">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Tiến độ</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{project.team} thành viên</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{project.endDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        statusConfig[project.status].color
                      }`}
                    >
                      {statusConfig[project.status].label}
                    </span>
                    <span className={`text-xs ${priorityConfig[project.priority].color}`}>
                      Ưu tiên {priorityConfig[project.priority].label}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-border p-4 bg-muted/30 flex items-center gap-2">
                <Link to={`/projects/${project.id}`} className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full">
                    <Eye className="w-4 h-4" /> Xem chi tiết
                  </Button>
                </Link>
                <Link to={`/projects/${project.id}/tasks`}>
                  <Button variant="outline" size="sm">
                    Tasks
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-3">Dự án</th>
                <th className="text-left px-6 py-3">Trạng thái</th>
                <th className="text-left px-6 py-3">Ưu tiên</th>
                <th className="text-left px-6 py-3">Tiến độ</th>
                <th className="text-left px-6 py-3">Nhóm</th>
                <th className="text-left px-6 py-3">Deadline</th>
                <th className="text-left px-6 py-3">Ngân sách</th>
                <th className="text-left px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FolderKanban className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p>{project.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {project.description.slice(0, 40)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        statusConfig[project.status].color
                      }`}
                    >
                      {statusConfig[project.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={priorityConfig[project.priority].color}>
                      {priorityConfig[project.priority].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{project.team}</td>
                  <td className="px-6 py-4">{project.endDate}</td>
                  <td className="px-6 py-4">{project.budget}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link to={`/projects/${project.id}`}>
                        <Button variant="ghost" size="sm">
                          Chi tiết
                        </Button>
                      </Link>
                      <Link to={`/projects/${project.id}/tasks`}>
                        <Button variant="outline" size="sm">
                          Tasks
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
