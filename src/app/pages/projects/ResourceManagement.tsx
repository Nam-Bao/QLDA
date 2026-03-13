import { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  BarChart2,
  LayoutGrid,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  ChevronDown,
  Info,
} from 'lucide-react';
import { Button } from '../../components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { TEAM_MEMBERS, type TeamMember } from '../../lib/mockData';
import { cn } from '../../lib/utils';

type ViewMode = 'grid';

const WEEKS = ['T10/W1', 'T10/W2', 'T10/W3', 'T11/W1', 'T11/W2', 'T11/W3'];

function getLoadColor(load: number) {
  if (load >= 90) return { bg: 'bg-red-500', text: 'text-white', label: 'Quá tải', badge: 'bg-red-100 text-red-700' };
  if (load >= 70) return { bg: 'bg-yellow-400', text: 'text-white', label: 'Bận', badge: 'bg-yellow-100 text-yellow-700' };
  if (load >= 40) return { bg: 'bg-green-500', text: 'text-white', label: 'Sẵn sàng', badge: 'bg-green-100 text-green-700' };
  return { bg: 'bg-blue-300', text: 'text-white', label: 'Rảnh', badge: 'bg-blue-100 text-blue-700' };
}

function WorkloadBar({ value }: { value: number }) {
  const { bg } = getLoadColor(value);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full transition-all', bg)} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs w-9 text-right text-muted-foreground">{value}%</span>
    </div>
  );
}

export default function ResourceManagement() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [newWorkload, setNewWorkload] = useState(20);

  const filteredMembers = members.filter((m) => {
    const matchSearch =
      search === '' ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'all' || m.role.includes(filterRole);
    return matchSearch && matchRole;
  });

  const stats = {
    available: members.filter((m) => m.workloadPercent < 70).length,
    busy: members.filter((m) => m.workloadPercent >= 70 && m.workloadPercent < 90).length,
    overloaded: members.filter((m) => m.workloadPercent >= 90).length,
  };

  // Chart data for bar chart
  const workloadChartData = filteredMembers.map((m) => ({
    name: m.name.split(' ').slice(-1)[0],
    fullName: m.name,
    workload: m.workloadPercent,
  }));

  // Radar for selected member
  const radarData = selectedMember
    ? [
        { subject: 'Kỹ thuật', A: 85 },
        { subject: 'Giao tiếp', A: 72 },
        { subject: 'Đúng hạn', A: 90 },
        { subject: 'Chất lượng', A: 88 },
        { subject: 'Teamwork', A: 78 },
      ]
    : [];

  const uniqueRoles = Array.from(new Set(members.map((m) => m.role.split(' ')[0])));

  const handleAddMember = () => {
    const name = newName.trim();
    const role = newRole.trim();
    const email = newEmail.trim();

    if (!name || !role || !email) return;

    const avatar = name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const skills = newSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newMember: TeamMember = {
      id: `m-${crypto.randomUUID()}`,
      name,
      role,
      email,
      avatar,
      workloadPercent: Math.min(100, Math.max(0, newWorkload)),
      projects: [],
      skills,
    };

    setMembers([newMember, ...members]);
    setNewName('');
    setNewRole('');
    setNewEmail('');
    setNewSkills('');
    setNewWorkload(20);
    setAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1>Quản lý nguồn lực</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Theo dõi khả năng sẵn sàng và khối lượng công việc của nhóm
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4" /> Thêm thành viên
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm thành viên mới</DialogTitle>
                <DialogDescription>
                  Nhập thông tin cơ bản để thêm thành viên vào nguồn lực.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="member-name">Tên</Label>
                  <Input
                    id="member-name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="member-role">Vai trò</Label>
                  <Input
                    id="member-role"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="Kỹ sư phần mềm"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="member-email">Email</Label>
                  <Input
                    id="member-email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="example@company.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="member-skills">Kỹ năng (phân tách bằng dấu phẩy)</Label>
                  <Input
                    id="member-skills"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    placeholder="React, TypeScript, Docker"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="member-workload">Khối lượng (%)</Label>
                  <Input
                    id="member-workload"
                    type="number"
                    min={0}
                    max={100}
                    value={newWorkload}
                    onChange={(e) => setNewWorkload(Number(e.target.value))}
                    placeholder="20"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleAddMember}>Thêm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Tổng nhân sự</p>
            <p className="text-2xl font-semibold">{members.length}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Sẵn sàng</p>
            <p className="text-2xl font-semibold text-green-600">{stats.available}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Đang bận</p>
            <p className="text-2xl font-semibold text-yellow-600">{stats.busy}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Quá tải</p>
            <p className="text-2xl font-semibold text-red-600">{stats.overloaded}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm thành viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Tất cả vai trò</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-green-500" /> Sẵn sàng (&lt;70%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-yellow-400" /> Bận (70–89%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-500" /> Quá tải (≥90%)
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Member Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMembers.map((member) => {
              const { bg, label, badge } = getLoadColor(member.workloadPercent);
              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(selectedMember?.id === member.id ? null : member)}
                  className={cn(
                    'bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all',
                    selectedMember?.id === member.id && 'ring-2 ring-primary border-primary'
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full', badge)}>{label}</span>
                  </div>

                  <div className="space-y-2">
                    <WorkloadBar value={member.workloadPercent} />
                    <div className="text-xs text-muted-foreground">
                      {member.projects.length} dự án đang tham gia
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

          {/* Right Panel */}
          <div className="space-y-4">
            {/* Workload Bar Chart */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="mb-3 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-primary" /> Biểu đồ khối lượng
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={workloadChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip
                    formatter={(v) => [`${v}%`, 'Khối lượng']}
                    labelFormatter={(l) => workloadChartData.find((d) => d.name === l)?.fullName || l}
                  />
                  <Bar dataKey="workload" radius={[4, 4, 0, 0]}>
                    {workloadChartData.map((entry, index) => {
                      const { bg } = getLoadColor(entry.workload);
                      const colors: Record<string, string> = {
                        'bg-red-500': '#ef4444',
                        'bg-yellow-400': '#facc15',
                        'bg-green-500': '#22c55e',
                        'bg-blue-300': '#93c5fd',
                      };
                      return <Cell key={index} fill={colors[bg] || '#3b82f6'} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Selected Member Detail / Radar */}
            {selectedMember ? (
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="mb-1">{selectedMember.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{selectedMember.role}</p>
                <ResponsiveContainer width="100%" height={180}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <Radar dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-xs">{selectedMember.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dự án</span>
                    <span>{selectedMember.projects.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tải hiện tại</span>
                    <span className={getLoadColor(selectedMember.workloadPercent).badge.includes('red') ? 'text-red-600' : ''}>
                      {selectedMember.workloadPercent}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border border-dashed border-border rounded-xl p-5 text-center">
                <Info className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Chọn một thành viên để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
