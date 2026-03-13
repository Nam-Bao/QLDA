import { useState } from 'react';
import {
  Database,
  Download,
  Upload,
  Calendar,
  Clock,
  HardDrive,
  CheckCircle,
  AlertCircle,
  Play,
  Settings,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../../components/Button';

interface Backup {
  id: string;
  name: string;
  date: string;
  time: string;
  size: string;
  type: 'auto' | 'manual';
  status: 'completed' | 'failed' | 'in_progress';
}

const mockBackups: Backup[] = [
  {
    id: '1',
    name: 'backup_2026_03_11_14_00',
    date: '11/03/2026',
    time: '14:00',
    size: '256 MB',
    type: 'auto',
    status: 'completed',
  },
  {
    id: '2',
    name: 'backup_2026_03_10_14_00',
    date: '10/03/2026',
    time: '14:00',
    size: '248 MB',
    type: 'auto',
    status: 'completed',
  },
  {
    id: '3',
    name: 'backup_manual_2026_03_09',
    date: '09/03/2026',
    time: '16:30',
    size: '245 MB',
    type: 'manual',
    status: 'completed',
  },
  {
    id: '4',
    name: 'backup_2026_03_09_14_00',
    date: '09/03/2026',
    time: '14:00',
    size: '242 MB',
    type: 'auto',
    status: 'completed',
  },
  {
    id: '5',
    name: 'backup_2026_03_08_14_00',
    date: '08/03/2026',
    time: '14:00',
    size: '0 MB',
    type: 'auto',
    status: 'failed',
  },
];

export default function BackupRestore() {
  const [backups, setBackups] = useState(mockBackups);
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [backupTime, setBackupTime] = useState('14:00');
  const [retentionDays, setRetentionDays] = useState(30);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleManualBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      const now = new Date();
      const newBackup: Backup = {
        id: Date.now().toString(),
        name: `backup_manual_${now.toISOString().split('T')[0]}`,
        date: now.toLocaleDateString('vi-VN'),
        time: now.toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        size: '256 MB',
        type: 'manual',
        status: 'completed',
      };
      setBackups((prev) => [newBackup, ...prev]);
      setIsBackingUp(false);
      alert('Sao lưu thủ công thành công!');
    }, 2000);
  };

  const handleRestore = (backupId: string) => {
    const backup = backups.find((b) => b.id === backupId);
    if (
      confirm(
        `Bạn có chắc chắn muốn khôi phục dữ liệu từ bản sao lưu "${backup?.name}"?\n\nCảnh báo: Dữ liệu hiện tại sẽ bị thay thế!`
      )
    ) {
      console.log('Restoring backup:', backupId);
      alert('Khôi phục dữ liệu thành công!');
    }
  };

  const handleDelete = (backupId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bản sao lưu này?')) {
      setBackups((prev) => prev.filter((b) => b.id !== backupId));
      alert('Xóa bản sao lưu thành công!');
    }
  };

  const handleDownload = (backupId: string) => {
    const backup = backups.find((b) => b.id === backupId);
    console.log('Downloading backup:', backup);
    alert('Đang tải xuống bản sao lưu...');
  };

  const saveSettings = () => {
    console.log('Saving backup settings:', {
      autoBackup,
      backupFrequency,
      backupTime,
      retentionDays,
    });
    alert('Lưu cấu hình thành công!');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Sao lưu & Khôi phục</h1>
        <p className="text-muted-foreground">
          Quản lý sao lưu và khôi phục dữ liệu hệ thống
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Tổng bản sao lưu
              </p>
              <p className="text-2xl">{backups.length}</p>
            </div>
            <Database className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Thành công</p>
              <p className="text-2xl text-green-600">
                {backups.filter((b) => b.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Thất bại</p>
              <p className="text-2xl text-red-600">
                {backups.filter((b) => b.status === 'failed').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Dung lượng</p>
              <p className="text-2xl">
                {backups
                  .filter((b) => b.status === 'completed')
                  .reduce((acc, b) => acc + parseInt(b.size), 0)}{' '}
                MB
              </p>
            </div>
            <HardDrive className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Backup Settings */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-medium">Cấu hình sao lưu</h2>
            </div>

            <div className="space-y-6">
              {/* Auto Backup Toggle */}
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium">Sao lưu tự động</span>
                  <input
                    type="checkbox"
                    checked={autoBackup}
                    onChange={(e) => setAutoBackup(e.target.checked)}
                    className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
                  />
                </label>
                <p className="text-sm text-muted-foreground mt-1">
                  Tự động sao lưu dữ liệu theo lịch
                </p>
              </div>

              {autoBackup && (
                <>
                  {/* Frequency */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Tần suất sao lưu
                    </label>
                    <select
                      value={backupFrequency}
                      onChange={(e) => setBackupFrequency(e.target.value)}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                    >
                      <option value="hourly">Hàng giờ</option>
                      <option value="daily">Hàng ngày</option>
                      <option value="weekly">Hàng tuần</option>
                      <option value="monthly">Hàng tháng</option>
                    </select>
                  </div>

                  {/* Backup Time */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Thời gian sao lưu
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="time"
                        value={backupTime}
                        onChange={(e) => setBackupTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                      />
                    </div>
                  </div>

                  {/* Retention Period */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Thời gian lưu trữ (ngày)
                    </label>
                    <input
                      type="number"
                      value={retentionDays}
                      onChange={(e) =>
                        setRetentionDays(parseInt(e.target.value))
                      }
                      min={7}
                      max={365}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Tự động xóa bản sao lưu cũ hơn {retentionDays} ngày
                    </p>
                  </div>
                </>
              )}

              {/* Manual Backup Button */}
              <Button
                onClick={handleManualBackup}
                disabled={isBackingUp}
                className="w-full"
              >
                {isBackingUp ? (
                  <>
                    <RotateCcw className="w-5 h-5 mr-2 animate-spin" />
                    Đang sao lưu...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Sao lưu ngay
                  </>
                )}
              </Button>

              <Button onClick={saveSettings} variant="outline" className="w-full">
                <CheckCircle className="w-5 h-5 mr-2" />
                Lưu cấu hình
              </Button>
            </div>

            {/* Storage Info */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium mb-3">Thông tin lưu trữ</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Đã sử dụng</span>
                  <span className="font-medium">1.2 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Còn trống</span>
                  <span className="font-medium">8.8 GB</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: '12%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Backups List */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-medium mb-1">
                    Danh sách bản sao lưu
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Quản lý và khôi phục dữ liệu từ các bản sao lưu
                  </p>
                </div>
                <Button variant="outline">
                  <Upload className="w-5 h-5 mr-2" />
                  Tải lên
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">
                      Tên bản sao lưu
                    </th>
                    <th className="text-left px-6 py-3 font-medium">
                      Ngày giờ
                    </th>
                    <th className="text-left px-6 py-3 font-medium">
                      Dung lượng
                    </th>
                    <th className="text-left px-6 py-3 font-medium">Loại</th>
                    <th className="text-left px-6 py-3 font-medium">
                      Trạng thái
                    </th>
                    <th className="text-right px-6 py-3 font-medium">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {backups.map((backup) => (
                    <tr
                      key={backup.id}
                      className="border-b border-border hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Database className="w-5 h-5 text-primary" />
                          <span className="font-medium">{backup.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {backup.date} {backup.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{backup.size}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            backup.type === 'auto'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {backup.type === 'auto' ? 'Tự động' : 'Thủ công'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 w-fit ${
                            backup.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : backup.status === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {backup.status === 'completed' && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          {backup.status === 'failed' && (
                            <AlertCircle className="w-4 h-4" />
                          )}
                          {backup.status === 'completed' && 'Thành công'}
                          {backup.status === 'failed' && 'Thất bại'}
                          {backup.status === 'in_progress' && 'Đang xử lý'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {backup.status === 'completed' && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRestore(backup.id)}
                                title="Khôi phục"
                              >
                                <RotateCcw className="w-4 h-4 text-primary" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDownload(backup.id)}
                                title="Tải xuống"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(backup.id)}
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
        </div>
      </div>
    </div>
  );
}
