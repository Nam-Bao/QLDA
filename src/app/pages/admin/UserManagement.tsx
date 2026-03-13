import { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  MoreVertical,
  Lock,
  Unlock,
  Trash2,
  Edit,
  Key,
  Shield,
  Mail,
  Phone,
  Building2,
  X,
} from 'lucide-react';
import { Button } from '../../components/Button';
import { TEAM_MEMBERS } from '../../lib/mockData';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: 'active' | 'locked';
  lastLogin: string;
}

// Convert TeamMember to User format
const convertTeamMembersToUsers = (): User[] => {
  return TEAM_MEMBERS.map(member => ({
    id: member.id,
    fullName: member.name,
    email: member.email,
    phone: 'N/A', // TeamMember doesn't have phone
    department: 'Phát triển phần mềm', // Default department
    role: member.role,
    status: 'active' as const,
    lastLogin: '2 giờ trước', // Default last login
  }));
};

type ModalType = 'create' | 'edit' | 'resetPassword' | 'security' | null;

export default function UserManagement() {
  const [users, setUsers] = useState(convertTeamMembersToUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    password: '',
  });

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'active' ? 'locked' : 'active',
            }
          : user
      )
    );
  };

  const deleteUser = (userId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const openModal = (type: ModalType, user?: User) => {
    setActiveModal(type);
    if (user) {
      setSelectedUser(user);
      setFormData({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        department: user.department,
        role: user.role,
        password: '',
      });
    } else {
      setSelectedUser(null);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        password: '',
      });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeModal === 'create') {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        status: 'active',
        lastLogin: 'Chưa đăng nhập',
      };
      setUsers((prev) => [...prev, newUser]);
      alert('Tạo người dùng thành công!');
    } else if (activeModal === 'edit' && selectedUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id ? { ...user, ...formData } : user
        )
      );
      alert('Cập nhật người dùng thành công!');
    } else if (activeModal === 'resetPassword') {
      alert('Đặt lại mật khẩu thành công! Email đã được gửi tới người dùng.');
    } else if (activeModal === 'security') {
      alert('Cập nhật cấu hình bảo mật thành công!');
    }
    closeModal();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl mb-2">Quản lý người dùng</h1>
            <p className="text-muted-foreground">
              Quản lý tài khoản và phân quyền người dùng
            </p>
          </div>
          <Button onClick={() => openModal('create')}>
            <UserPlus className="w-5 h-5 mr-2" />
            Thêm người dùng
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Tổng người dùng
                </p>
                <p className="text-2xl">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Đang hoạt động</p>
                <p className="text-2xl text-green-600">
                  {users.filter((u) => u.status === 'active').length}
                </p>
              </div>
              <Unlock className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bị khóa</p>
                <p className="text-2xl text-red-600">
                  {users.filter((u) => u.status === 'locked').length}
                </p>
              </div>
              <Lock className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Trực tuyến hôm nay
                </p>
                <p className="text-2xl text-blue-600">12</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-medium">Người dùng</th>
                <th className="text-left px-6 py-3 font-medium">Liên hệ</th>
                <th className="text-left px-6 py-3 font-medium">Phòng ban</th>
                <th className="text-left px-6 py-3 font-medium">Vai trò</th>
                <th className="text-left px-6 py-3 font-medium">Trạng thái</th>
                <th className="text-left px-6 py-3 font-medium">
                  Đăng nhập cuối
                </th>
                <th className="text-right px-6 py-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-medium">
                          {user.fullName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      {user.department}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openModal('edit', user)}
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleUserStatus(user.id)}
                        title={
                          user.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa'
                        }
                      >
                        {user.status === 'active' ? (
                          <Lock className="w-4 h-4 text-amber-600" />
                        ) : (
                          <Unlock className="w-4 h-4 text-green-600" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openModal('resetPassword', user)}
                        title="Đặt lại mật khẩu"
                      >
                        <Key className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openModal('security', user)}
                        title="Cấu hình bảo mật"
                      >
                        <Shield className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteUser(user.id)}
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-medium">
                {activeModal === 'create' && 'Thêm người dùng mới'}
                {activeModal === 'edit' && 'Chỉnh sửa người dùng'}
                {activeModal === 'resetPassword' && 'Đặt lại mật khẩu'}
                {activeModal === 'security' && 'Cấu hình bảo mật'}
              </h2>
              <button
                onClick={closeModal}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {(activeModal === 'create' || activeModal === 'edit') && (
                <>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Phòng ban
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                      required
                    >
                      <option value="">Chọn phòng ban</option>
                      <option>Phát triển phần mềm</option>
                      <option>Thiết kế UI/UX</option>
                      <option>Kiểm thử QA</option>
                      <option>Kế toán</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Vai trò
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                      required
                    >
                      <option value="">Chọn vai trò</option>
                      <option>Ban giám đốc</option>
                      <option>Quản lý dự án</option>
                      <option>Trưởng nhóm</option>
                      <option>Thành viên</option>
                      <option>Admin</option>
                      <option>Kế toán</option>
                      <option>Khách hàng</option>
                    </select>
                  </div>
                  {activeModal === 'create' && (
                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                        required
                      />
                    </div>
                  )}
                </>
              )}

              {activeModal === 'resetPassword' && (
                <div className="text-center py-4">
                  <Key className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="mb-4">
                    Bạn có chắc chắn muốn đặt lại mật khẩu cho{' '}
                    <strong>{selectedUser?.fullName}</strong>?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Mật khẩu mới sẽ được gửi qua email đến{' '}
                    <strong>{selectedUser?.email}</strong>
                  </p>
                </div>
              )}

              {activeModal === 'security' && (
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm">Bật xác thực 2 bước (2FA)</span>
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm">
                        Yêu cầu đổi mật khẩu định kỳ
                      </span>
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm">
                        Giới hạn đăng nhập từ IP cố định
                      </span>
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Số lần đăng nhập sai tối đa
                    </label>
                    <input
                      type="number"
                      defaultValue={5}
                      min={3}
                      max={10}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={closeModal} className="flex-1">
                  Hủy
                </Button>
                <Button type="submit" className="flex-1">
                  {activeModal === 'create' && 'Tạo người dùng'}
                  {activeModal === 'edit' && 'Cập nhật'}
                  {activeModal === 'resetPassword' && 'Xác nhận'}
                  {activeModal === 'security' && 'Lưu cấu hình'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
