import { useState } from 'react';
import { Users, Mail, Phone, Plus, Search, MoreVertical } from 'lucide-react';
import { Button } from '../components/Button';

const teamMembers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    role: 'Project Manager',
    email: 'nguyenvana@company.com',
    phone: '0901234567',
    avatar: 'NVA',
    projects: 5,
    tasks: 12,
    status: 'active',
    department: 'Quản lý',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    role: 'Senior Developer',
    email: 'tranthib@company.com',
    phone: '0902345678',
    avatar: 'TTB',
    projects: 3,
    tasks: 8,
    status: 'active',
    department: 'Phát triển',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    role: 'QA Engineer',
    email: 'levanc@company.com',
    phone: '0903456789',
    avatar: 'LVC',
    projects: 4,
    tasks: 15,
    status: 'active',
    department: 'Kiểm thử',
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    role: 'UI/UX Designer',
    email: 'phamthid@company.com',
    phone: '0904567890',
    avatar: 'PTD',
    projects: 6,
    tasks: 10,
    status: 'active',
    department: 'Thiết kế',
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    role: 'DevOps Engineer',
    email: 'hoangvane@company.com',
    phone: '0905678901',
    avatar: 'HVE',
    projects: 2,
    tasks: 5,
    status: 'active',
    department: 'Vận hành',
  },
  {
    id: 6,
    name: 'Nguyễn Văn F',
    role: 'Backend Developer',
    email: 'nguyenvanf@company.com',
    phone: '0906789012',
    avatar: 'NVF',
    projects: 3,
    tasks: 9,
    status: 'active',
    department: 'Phát triển',
  },
  {
    id: 7,
    name: 'Đỗ Thị G',
    role: 'Frontend Developer',
    email: 'dothig@company.com',
    phone: '0907890123',
    avatar: 'DTG',
    projects: 4,
    tasks: 11,
    status: 'active',
    department: 'Phát triển',
  },
  {
    id: 8,
    name: 'Vũ Văn H',
    role: 'Business Analyst',
    email: 'vuvanh@company.com',
    phone: '0908901234',
    avatar: 'VVH',
    projects: 3,
    tasks: 7,
    status: 'inactive',
    department: 'Phân tích',
  },
];

const departments = ['Tất cả', 'Quản lý', 'Phát triển', 'Kiểm thử', 'Thiết kế', 'Vận hành', 'Phân tích'];

export function Team() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Tất cả');

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === 'Tất cả' || member.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Quản lý nhóm</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thành viên và phân công công việc
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Thêm thành viên
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng thành viên</p>
              <h3 className="mt-2">{teamMembers.length}</h3>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đang hoạt động</p>
              <h3 className="mt-2">
                {teamMembers.filter((m) => m.status === 'active').length}
              </h3>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng dự án</p>
              <h3 className="mt-2">
                {teamMembers.reduce((sum, m) => sum + m.projects, 0)}
              </h3>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng công việc</p>
              <h3 className="mt-2">
                {teamMembers.reduce((sum, m) => sum + m.tasks, 0)}
              </h3>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm thành viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedDepartment === dept
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border border-border hover:bg-muted'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <span>{member.avatar}</span>
              </div>
              <button className="p-1 hover:bg-muted rounded">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <h4 className="mb-1">{member.name}</h4>
            <p className="text-sm text-muted-foreground mb-4">{member.role}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{member.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Dự án</p>
                <p className="mt-1">{member.projects}</p>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Công việc</p>
                <p className="mt-1">{member.tasks}</p>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                ></span>
                <p className="text-xs text-muted-foreground mt-1">
                  {member.status === 'active' ? 'Hoạt động' : 'Offline'}
                </p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">
              Xem chi tiết
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
