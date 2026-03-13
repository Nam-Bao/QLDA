import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';
import { Button } from '../components/Button';

export function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Cài đặt</h1>
        <p className="text-muted-foreground mt-1">
          Quản lý cài đặt hệ thống và tài khoản
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="bg-card border border-border rounded-lg p-4">
          <nav className="space-y-1">
            {[
              { icon: User, label: 'Thông tin cá nhân', active: true },
              { icon: Bell, label: 'Thông báo', active: false },
              { icon: Shield, label: 'Bảo mật', active: false },
              { icon: Palette, label: 'Giao diện', active: false },
              { icon: SettingsIcon, label: 'Cài đặt chung', active: false },
            ].map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="mb-6">Thông tin cá nhân</h3>

            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <span className="text-2xl">NVA</span>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  Thay đổi ảnh
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  JPG, PNG tối đa 2MB
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Họ và tên</label>
                  <input
                    type="text"
                    defaultValue="Nguyễn Văn A"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Chức vụ</label>
                  <input
                    type="text"
                    defaultValue="Project Manager"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="nguyenvana@company.com"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  defaultValue="0901234567"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phòng ban</label>
                <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Quản lý dự án</option>
                  <option>Phát triển</option>
                  <option>Thiết kế</option>
                  <option>Kiểm thử</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Giới thiệu</label>
                <textarea
                  rows={4}
                  defaultValue="Project Manager với 8 năm kinh nghiệm trong quản lý dự án CNTT."
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <Button>Lưu thay đổi</Button>
                <Button variant="outline">Hủy</Button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="mb-6">Cài đặt thông báo</h3>

            <div className="space-y-4">
              {[
                {
                  label: 'Thông báo email',
                  description: 'Nhận thông báo qua email',
                },
                {
                  label: 'Cập nhật dự án',
                  description: 'Thông báo khi có cập nhật dự án',
                },
                {
                  label: 'Công việc mới',
                  description: 'Thông báo khi được gán công việc mới',
                },
                {
                  label: 'Nhắc nhở deadline',
                  description: 'Nhắc nhở trước deadline 24 giờ',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p>{item.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="mb-6">Bảo mật</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Mật khẩu mới</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="pt-4">
                <Button>Đổi mật khẩu</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
