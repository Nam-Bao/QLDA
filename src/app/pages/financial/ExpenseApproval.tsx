import { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  Send,
  User,
  Calendar,
  DollarSign,
  FileText,
  Eye,
  Building2,
} from 'lucide-react';
import { Button } from '../../components/Button';
import {
  APPROVAL_REQUESTS,
  PROJECTS,
  TEAM_MEMBERS,
  formatCurrency,
  getProjectById,
  getMemberById,
} from '../../lib/mockData';
import { toast } from 'sonner';

const approvalStatusConfig = {
  pending: {
    label: 'Chờ duyệt',
    color: 'bg-yellow-100 text-yellow-700',
    icon: <Clock className="w-4 h-4" />,
  },
  approved: {
    label: 'Đã duyệt',
    color: 'bg-green-100 text-green-700',
    icon: <CheckCircle className="w-4 h-4" />,
  },
  rejected: {
    label: 'Từ chối',
    color: 'bg-red-100 text-red-700',
    icon: <XCircle className="w-4 h-4" />,
  },
};

export default function ExpenseApproval() {
  const [approvalRequests, setApprovalRequests] = useState(APPROVAL_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = (requestId: string) => {
    setApprovalRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? {
              ...request,
              status: 'approved' as const,
              approvedBy: 'admin1', // Mock current user
              approvedAt: new Date().toLocaleDateString('vi-VN'),
            }
          : request
      )
    );
    toast.success('Yêu cầu đã được duyệt thành công!');
    setSelectedRequest(null);
  };

  const handleReject = (requestId: string) => {
    if (!rejectReason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối!');
      return;
    }
    setApprovalRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? {
              ...request,
              status: 'rejected' as const,
              approvedBy: 'admin1', // Mock current user
              approvedAt: new Date().toLocaleDateString('vi-VN'),
              reason: rejectReason,
            }
          : request
      )
    );
    toast.success('Yêu cầu đã bị từ chối!');
    setShowRejectForm(false);
    setSelectedRequest(null);
    setRejectReason('');
  };

  const getRequestTypeText = (type: string) => {
    return type === 'project_start' ? 'Khởi động dự án' : 'Chi phí phát sinh';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Phê duyệt (Approval Center)</h1>
          <p className="text-gray-600 mt-1">
            Duyệt các yêu cầu khởi động dự án mới và chi phí phát sinh
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Chờ duyệt</p>
              <p className="text-2xl font-bold text-gray-900">
                {approvalRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đã duyệt</p>
              <p className="text-2xl font-bold text-gray-900">
                {approvalRequests.filter(r => r.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center">
            <XCircle className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Từ chối</p>
              <p className="text-2xl font-bold text-gray-900">
                {approvalRequests.filter(r => r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Requests List */}
      <div className="space-y-4">
        {approvalRequests.map((request) => {
          const project = getProjectById(request.projectId);
          const submitter = getMemberById(request.submittedBy);
          const approver = request.approvedBy ? getMemberById(request.approvedBy) : null;

          return (
            <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      approvalStatusConfig[request.status].color
                    }`}>
                      {approvalStatusConfig[request.status].icon}
                      <span className="ml-1">{approvalStatusConfig[request.status].label}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {getRequestTypeText(request.type)}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {request.description}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 className="w-4 h-4 mr-2" />
                      Dự án: {project?.name}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Số tiền: {formatCurrency(request.amount)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      Người gửi: {submitter?.name}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Ngày gửi: {request.submittedAt}
                    </div>
                  </div>

                  {request.status !== 'pending' && (
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="w-4 h-4 mr-2" />
                          Người duyệt: {approver?.name}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Ngày duyệt: {request.approvedAt}
                        </div>
                      </div>
                      {request.reason && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Lý do:</strong> {request.reason}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {request.status === 'pending' && (
                  <div className="flex space-x-3 ml-6">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Duyệt
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedRequest(request.id);
                        setShowRejectForm(true);
                      }}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Từ chối
                    </Button>
                  </div>
                )}
              </div>

              {/* Action buttons for completed requests */}
              {request.status !== 'pending' && (
                <div className="flex justify-end space-x-3 mt-4 pt-4 border-t">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem chi tiết
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Tải tài liệu
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reject Form Modal */}
      {showRejectForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Từ chối yêu cầu</h3>
              <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Lý do từ chối
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-destructive/50 bg-background"
                  rows={4}
                  placeholder="Vui lòng nhập lý do từ chối..."
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowRejectForm(false);
                    setRejectReason('');
                  }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={() => selectedRequest && handleReject(selectedRequest)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Xác nhận từ chối
                </Button>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}

      {approvalRequests.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Không có yêu cầu nào</h3>
          <p className="mt-1 text-sm text-gray-500">
            Tất cả yêu cầu đã được xử lý.
          </p>
        </div>
      )}
    </div>
  );
}