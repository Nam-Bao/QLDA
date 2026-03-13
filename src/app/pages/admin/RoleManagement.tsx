import { useState } from 'react';
import {
  Shield,
  Users,
  Plus,
  Edit,
  Trash2,
  Check,
  X as XIcon,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../components/Button';

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  color: string;
}

interface Permission {
  id: string;
  module: string;
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

const roles: Role[] = [
  {
    id: '1',
    name: 'Ban giám đốc',
    description: 'Toàn quyền quản lý và giám sát toàn bộ hệ thống',
    userCount: 3,
    color: 'bg-purple-500',
  },
  {
    id: '2',
    name: 'Quản lý dự án',
    description: 'Quản lý dự án, phân công công việc, theo dõi tiến độ',
    userCount: 8,
    color: 'bg-blue-500',
  },
  {
    id: '3',
    name: 'Trưởng nhóm',
    description: 'Quản lý nhóm phát triển, phê duyệt công việc',
    userCount: 12,
    color: 'bg-green-500',
  },
  {
    id: '4',
    name: 'Thành viên',
    description: 'Thực hiện công việc được giao, cập nhật tiến độ',
    userCount: 45,
    color: 'bg-cyan-500',
  },
  {
    id: '5',
    name: 'Admin',
    description: 'Quản trị hệ thống, phân quyền, cấu hình',
    userCount: 2,
    color: 'bg-red-500',
  },
  {
    id: '6',
    name: 'Kế toán',
    description: 'Quản lý ngân sách, chi phí dự án',
    userCount: 4,
    color: 'bg-amber-500',
  },
  {
    id: '7',
    name: 'Khách hàng',
    description: 'Xem tiến độ dự án, phê duyệt deliverable',
    userCount: 15,
    color: 'bg-gray-500',
  },
];

const defaultPermissions: Permission[] = [
  {
    id: '1',
    module: 'Dashboard',
    permissions: { view: true, create: false, edit: false, delete: false },
  },
  {
    id: '2',
    module: 'Dự án',
    permissions: { view: true, create: true, edit: true, delete: true },
  },
  {
    id: '3',
    module: 'Công việc',
    permissions: { view: true, create: true, edit: true, delete: false },
  },
  {
    id: '4',
    module: 'Nhóm',
    permissions: { view: true, create: false, edit: true, delete: false },
  },
  {
    id: '5',
    module: 'Báo cáo',
    permissions: { view: true, create: true, edit: false, delete: false },
  },
  {
    id: '6',
    module: 'Tài liệu',
    permissions: { view: true, create: true, edit: true, delete: true },
  },
  {
    id: '7',
    module: 'Ngân sách',
    permissions: { view: false, create: false, edit: false, delete: false },
  },
  {
    id: '8',
    module: 'Quản lý người dùng',
    permissions: { view: false, create: false, edit: false, delete: false },
  },
  {
    id: '9',
    module: 'Cấu hình hệ thống',
    permissions: { view: false, create: false, edit: false, delete: false },
  },
];

export default function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(roles[0]);
  const [permissions, setPermissions] = useState<Permission[]>(defaultPermissions);
  const [expandedModules, setExpandedModules] = useState<string[]>(['1', '2']);

  const togglePermission = (
    moduleId: string,
    permissionType: keyof Permission['permissions']
  ) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.id === moduleId
          ? {
              ...p,
              permissions: {
                ...p.permissions,
                [permissionType]: !p.permissions[permissionType],
              },
            }
          : p
      )
    );
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const savePermissions = () => {
    console.log('Saving permissions for role:', selectedRole?.name, permissions);
    alert('Lưu phân quyền thành công!');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Quản lý phân quyền</h1>
        <p className="text-muted-foreground">
          Cấu hình quyền truy cập cho từng vai trò người dùng
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">Danh sách vai trò</h2>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Thêm
              </Button>
            </div>

            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRole?.id === role.id
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${role.color}`}
                    ></div>
                    <h3 className="font-medium flex-1">{role.name}</h3>
                    {selectedRole?.id === role.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {role.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {role.userCount} người dùng
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Configuration */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl mb-1">
                    Phân quyền: {selectedRole?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedRole?.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Sửa vai trò
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xóa
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                <div>Module</div>
                <div className="text-center">Xem</div>
                <div className="text-center">Tạo</div>
                <div className="text-center">Sửa</div>
                <div className="text-center">Xóa</div>
              </div>
            </div>

            <div className="p-6 space-y-1 max-h-[600px] overflow-y-auto">
              {permissions.map((permission) => (
                <div
                  key={permission.id}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  <div
                    className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/30 cursor-pointer"
                    onClick={() => toggleModule(permission.id)}
                  >
                    <div className="flex items-center gap-2">
                      {expandedModules.includes(permission.id) ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="font-medium">{permission.module}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePermission(permission.id, 'view');
                        }}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          permission.permissions.view
                            ? 'bg-primary border-primary'
                            : 'border-border bg-background'
                        }`}
                      >
                        {permission.permissions.view && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePermission(permission.id, 'create');
                        }}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          permission.permissions.create
                            ? 'bg-primary border-primary'
                            : 'border-border bg-background'
                        }`}
                      >
                        {permission.permissions.create && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePermission(permission.id, 'edit');
                        }}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          permission.permissions.edit
                            ? 'bg-primary border-primary'
                            : 'border-border bg-background'
                        }`}
                      >
                        {permission.permissions.edit && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePermission(permission.id, 'delete');
                        }}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          permission.permissions.delete
                            ? 'bg-destructive border-destructive'
                            : 'border-border bg-background'
                        }`}
                      >
                        {permission.permissions.delete && (
                          <XIcon className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedModules.includes(permission.id) && (
                    <div className="bg-muted/30 p-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-3">
                        Cấu hình chi tiết quyền truy cập cho module{' '}
                        <strong>{permission.module}</strong>
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-center justify-between text-sm cursor-pointer">
                          <span>Giới hạn xem dữ liệu của nhóm mình</span>
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
                          />
                        </label>
                        <label className="flex items-center justify-between text-sm cursor-pointer">
                          <span>Giới hạn xem dữ liệu nhạy cảm</span>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
                          />
                        </label>
                        <label className="flex items-center justify-between text-sm cursor-pointer">
                          <span>Yêu cầu phê duyệt khi thao tác</span>
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <Button variant="outline">Hủy thay đổi</Button>
              <Button onClick={savePermissions}>
                <Check className="w-4 h-4 mr-2" />
                Lưu phân quyền
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
