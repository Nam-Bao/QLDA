import { useState } from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
  Filter,
  X,
} from 'lucide-react';
import { Button } from '../components/Button';

type NotificationType = 'info' | 'warning' | 'success' | 'deadline';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  project?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: 'Deadline sắp đến hạn',
    message: 'Task "Thiết kế giao diện chính" sẽ đến hạn trong 2 giờ nữa',
    timestamp: '2 giờ trước',
    read: false,
    project: 'Website bán hàng',
  },
  {
    id: '2',
    type: 'success',
    title: 'Task hoàn thành',
    message: 'Nguyễn Văn B đã hoàn thành task "Code API authentication"',
    timestamp: '3 giờ trước',
    read: false,
    project: 'App mobile',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Cảnh báo ngân sách',
    message: 'Dự án "Hệ thống CRM" đã sử dụng 85% ngân sách',
    timestamp: '5 giờ trước',
    read: false,
    project: 'Hệ thống CRM',
  },
  {
    id: '4',
    type: 'info',
    title: 'Được phân công task mới',
    message: 'Bạn được phân công task "Review code module thanh toán"',
    timestamp: '1 ngày trước',
    read: true,
    project: 'Website bán hàng',
  },
  {
    id: '5',
    type: 'info',
    title: 'Bình luận mới',
    message: 'Trần Thị C đã bình luận trong task "Tối ưu database"',
    timestamp: '1 ngày trước',
    read: true,
    project: 'App mobile',
  },
  {
    id: '6',
    type: 'success',
    title: 'Dự án hoàn thành',
    message: 'Dự án "Landing page marketing" đã được đánh dấu hoàn thành',
    timestamp: '2 ngày trước',
    read: true,
    project: 'Landing page marketing',
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'deadline':
        return <Clock className="w-5 h-5 text-red-500" />;
    }
  };

  const getBgColor = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50';
      case 'warning':
        return 'bg-amber-50';
      case 'success':
        return 'bg-green-50';
      case 'deadline':
        return 'bg-red-50';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl">Thông báo</h1>
              {unreadCount > 0 && (
                <p className="text-muted-foreground">
                  Bạn có {unreadCount} thông báo chưa đọc
                </p>
              )}
            </div>
          </div>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  <CheckCheck className="w-5 h-5 mr-2" />
                  Đánh dấu đã đọc
                </Button>
              )}
              <Button variant="outline" onClick={clearAll}>
                <Trash2 className="w-5 h-5 mr-2" />
                Xóa tất cả
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          <Filter className="w-4 h-4 inline-block mr-2" />
          Tất cả ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-primary text-white'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          <Bell className="w-4 h-4 inline-block mr-2" />
          Chưa đọc ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl mb-2">Không có thông báo</h3>
            <p className="text-muted-foreground">
              {filter === 'unread'
                ? 'Bạn đã đọc tất cả thông báo'
                : 'Bạn chưa có thông báo nào'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-card border rounded-lg p-4 transition-all hover:shadow-md ${
                !notification.read
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-border'
              }`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getBgColor(notification.type)}`}
                >
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium">
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 w-2 h-2 bg-primary rounded-full inline-block"></span>
                      )}
                    </h3>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    {notification.project && (
                      <span className="px-2 py-1 bg-muted rounded text-xs">
                        {notification.project}
                      </span>
                    )}
                    <span className="text-muted-foreground text-xs">
                      {notification.timestamp}
                    </span>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-primary hover:underline text-xs ml-auto"
                      >
                        Đánh dấu đã đọc
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Settings */}
      {notifications.length > 0 && (
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="mb-4">Cài đặt thông báo</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Thông báo deadline sắp đến hạn</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Thông báo khi được phân công task</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Thông báo bình luận mới</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Email thông báo hàng ngày</span>
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
