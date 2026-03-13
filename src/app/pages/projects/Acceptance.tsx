import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import {
  FolderKanban,
  ChevronRight,
  Award,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Download,
  Eye,
  CheckSquare,
  AlertCircle,
  MessageSquare,
  Send,
  Stamp,
  User,
  Calendar,
  Building2,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Shield,
} from 'lucide-react';
import { Button } from '../../components/Button';
import { getProjectById, DELIVERABLES, type Deliverable } from '../../lib/mockData';
import { cn } from '../../lib/utils';

type AcceptanceStatus = 'pending' | 'reviewing' | 'accepted' | 'rejected';

const deliverableStatusConfig: Record<
  Deliverable['status'],
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: 'Chờ bàn giao',
    color: 'bg-gray-100 text-gray-700',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  delivered: {
    label: 'Đã bàn giao',
    color: 'bg-blue-100 text-blue-700',
    icon: <FileText className="w-3.5 h-3.5" />,
  },
  accepted: {
    label: 'Đã nghiệm thu',
    color: 'bg-green-100 text-green-700',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  rejected: {
    label: 'Từ chối',
    color: 'bg-red-100 text-red-700',
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

const acceptanceHistory = [
  {
    id: 'ah1',
    actor: 'Bùi Thị Hoa',
    role: 'PM',
    action: 'Tạo yêu cầu nghiệm thu',
    date: '08/04/2026 09:00',
    note: 'Gửi tài liệu bàn giao đến Khách hàng để review.',
  },
  {
    id: 'ah2',
    actor: 'Nguyễn Minh Tuấn',
    role: 'Khách hàng',
    action: 'Bắt đầu review',
    date: '09/04/2026 10:30',
    note: 'Đang kiểm tra Source Code và tài liệu kỹ thuật.',
  },
  {
    id: 'ah3',
    actor: 'Nguyễn Minh Tuấn',
    role: 'Khách hàng',
    action: 'Đã nghiệm thu "Source Code & Documentation"',
    date: '10/04/2026 14:00',
    note: 'Tài liệu đầy đủ, source code sạch và có documentation tốt.',
  },
];

export default function Acceptance() {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [overallStatus, setOverallStatus] = useState<AcceptanceStatus>('reviewing');
  const [deliverableStates, setDeliverableStates] = useState<
    Record<string, Deliverable['status']>
  >({});
  const [feedback, setFeedback] = useState('');
  const [acceptanceComment, setAcceptanceComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState<'accept' | 'reject' | null>(null);
  const [rating, setRating] = useState(0);

  const ratingLabels = ['Rất tệ', 'Tệ', 'Trung bình', 'Tốt', 'Xuất sắc'];

  const project = getProjectById(projectId || 'p1');
  const deliverables = DELIVERABLES[projectId || 'p1'] || DELIVERABLES['p1'];

  const getDeliverableStatus = (d: Deliverable): Deliverable['status'] =>
    deliverableStates[d.id] ?? d.status;

  const acceptedCount = deliverables.filter(
    (d) => getDeliverableStatus(d) === 'accepted'
  ).length;
  const deliveredCount = deliverables.filter(
    (d) => getDeliverableStatus(d) === 'delivered' || getDeliverableStatus(d) === 'accepted'
  ).length;
  const totalCount = deliverables.length;
  const completionPct = Math.round((acceptedCount / totalCount) * 100);

  const handleAcceptDeliverable = (deliverableId: string) => {
    setDeliverableStates((prev) => ({ ...prev, [deliverableId]: 'accepted' }));
  };
  const handleRejectDeliverable = (deliverableId: string) => {
    setDeliverableStates((prev) => ({ ...prev, [deliverableId]: 'rejected' }));
  };

  const handleFinalAccept = () => {
    setOverallStatus('accepted');
    setIsSubmitted(true);
    setShowConfirm(null);
  };
  const handleFinalReject = () => {
    setOverallStatus('rejected');
    setIsSubmitted(true);
    setShowConfirm(null);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
        {overallStatus === 'accepted' ? (
          <>
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <div>
              <h1 className="text-green-700">Nghiệm thu thành công!</h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Bạn đã xác nhận nghiệm thu dự án{' '}
                <strong>{project?.name}</strong>. Biên bản nghiệm thu đã được gửi đến PM và lưu trữ hệ thống.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-left">
              <h4 className="text-green-800 mb-2">Thông tin nghiệm thu</h4>
              <div className="space-y-1 text-sm text-green-700">
                <p>📅 Ngày nghiệm thu: {new Date().toLocaleDateString('vi-VN')}</p>
                <p>👤 Người xác nhận: Nguyễn Minh Tuấn (Đại diện khách hàng)</p>
                <p>⭐ Đánh giá: {rating > 0 ? `${rating}/5 - ${ratingLabels[rating - 1]}` : 'Chưa đánh giá'}</p>
                {feedback && <p>💬 Nhận xét: {feedback}</p>}
              </div>
            </div>
            <Button onClick={() => navigate('/projects')}>
              Quay về danh sách dự án
            </Button>
          </>
        ) : (
          <>
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <div>
              <h1 className="text-red-700">Đã từ chối nghiệm thu</h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Bạn đã từ chối nghiệm thu dự án <strong>{project?.name}</strong>. PM sẽ nhận được thông báo và liên hệ lại với bạn.
              </p>
            </div>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              <RotateCcw className="w-4 h-4" /> Xem lại
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/projects" className="hover:text-primary transition-colors flex items-center gap-1">
          <FolderKanban className="w-4 h-4" /> Dự án
        </Link>
        <ChevronRight className="w-4 h-4" />
        {project && (
          <>
            <Link to={`/projects/${project.id}`} className="hover:text-primary transition-colors truncate max-w-[150px]">
              {project.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
          </>
        )}
        <span className="text-foreground">Nghiệm thu & Bàn giao</span>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent text-white rounded-xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-white">Nghiệm thu & Bàn giao</h1>
              <p className="text-white/80 text-sm mt-0.5">{project?.name}</p>
              <div className="flex items-center gap-3 mt-1 text-white/70 text-xs">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {project?.customer}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Deadline: {project?.endDate}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{completionPct}%</div>
            <div className="text-white/80 text-sm">{acceptedCount}/{totalCount} hạng mục đã nghiệm thu</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${completionPct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/70 mt-1">
            <span>{deliveredCount} hạng mục đã bàn giao</span>
            <span>{totalCount - deliveredCount} hạng mục chờ bàn giao</span>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      {overallStatus === 'reviewing' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-800 text-sm">
              <strong>Đang trong quá trình review</strong> — Vui lòng kiểm tra từng hạng mục bàn giao bên dưới trước khi xác nhận nghiệm thu cuối cùng.
            </p>
            <p className="text-blue-600 text-xs mt-1">
              Bạn có thể chấp nhận hoặc từ chối từng hạng mục riêng lẻ. Sau khi xem xét xong, nhấn nút "Xác nhận nghiệm thu" hoặc "Từ chối" ở cuối trang.
            </p>
          </div>
        </div>
      )}

      {/* Deliverables */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-primary" /> Hạng mục bàn giao
        </h2>
        {deliverables.map((d, idx) => {
          const currentStatus = getDeliverableStatus(d);
          const statusCfg = deliverableStatusConfig[currentStatus];
          const canAct = currentStatus === 'delivered';

          return (
            <div key={d.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4>{d.title}</h4>
                        <span className={cn('flex items-center gap-1 text-xs px-2 py-0.5 rounded-full', statusCfg.color)}>
                          {statusCfg.icon} {statusCfg.label}
                        </span>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                          {d.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{d.description}</p>
                      {d.deliveredDate && (
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Bàn giao: {d.deliveredDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {canAct && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRejectDeliverable(d.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" /> Từ chối
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAcceptDeliverable(d.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" /> Chấp nhận
                      </Button>
                    </div>
                  )}
                  {currentStatus === 'accepted' && (
                    <div className="flex items-center gap-1.5 text-green-600 text-sm flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Đã nghiệm thu
                    </div>
                  )}
                  {currentStatus === 'rejected' && (
                    <div className="flex items-center gap-1.5 text-red-600 text-sm flex-shrink-0">
                      <XCircle className="w-4 h-4" /> Đã từ chối
                    </div>
                  )}
                  {currentStatus === 'pending' && (
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm flex-shrink-0">
                      <Clock className="w-4 h-4" /> Chờ bàn giao
                    </div>
                  )}
                </div>

                {/* Documents */}
                {d.documents.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Tài liệu đính kèm ({d.documents.length})</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {d.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg group">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                            <div>
                              <p className="text-xs">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:bg-muted rounded transition-colors" title="Xem trực tuyến">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1 hover:bg-muted rounded transition-colors" title="Tải xuống">
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Acceptance History */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-primary" /> Lịch sử nghiệm thu
        </h3>
        <div className="space-y-0">
          {acceptanceHistory.map((entry, idx) => (
            <div key={entry.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
                {idx < acceptanceHistory.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border min-h-[16px] my-1" />
                )}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm">{entry.actor}</span>
                  <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{entry.role}</span>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{entry.action}</p>
                {entry.note && (
                  <p className="text-xs bg-muted/40 rounded p-2 mt-1">{entry.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback & Decision */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-primary" /> Phản hồi & Quyết định
        </h3>
        <div className="space-y-4">
          {/* Comment */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Nhận xét của Quý khách</label>
            <textarea
              placeholder="Nhập nhận xét, yêu cầu chỉnh sửa hoặc phản hồi về dự án..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Decision Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={() => setShowConfirm('accept')}
              className="bg-green-600 hover:bg-green-700 flex-1"
              disabled={acceptedCount !== totalCount}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Chấp nhận nghiệm thu
            </Button>
            <Button
              onClick={() => setShowConfirm('reject')}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Từ chối nghiệm thu
            </Button>
          </div>
          {acceptedCount !== totalCount && (
            <p className="text-xs text-muted-foreground text-center">
              Cần nghiệm thu tất cả hạng mục trước khi chấp nhận dự án
            </p>
          )}
        </div>
      </div>

        {showConfirm && (
          <div className={cn(
            'mb-4 p-4 rounded-xl border',
            showConfirm === 'accept' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          )}>
            <p className={cn('text-sm mb-3', showConfirm === 'accept' ? 'text-green-800' : 'text-red-800')}>
              {showConfirm === 'accept'
                ? '✅ Xác nhận nghiệm thu toàn bộ dự án? Biên bản nghiệm thu sẽ được tạo tự động và gửi cho PM.'
                : '❌ Xác nhận từ chối nghiệm thu? PM sẽ được thông báo và liên hệ lại để xử lý vấn đề.'}
            </p>
            <div>
              <textarea
                placeholder="Lý do / Ghi chú bổ sung (không bắt buộc)..."
                value={acceptanceComment}
                onChange={(e) => setAcceptanceComment(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-3"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className={showConfirm === 'accept' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                onClick={showConfirm === 'accept' ? handleFinalAccept : handleFinalReject}
              >
                {showConfirm === 'accept' ? (
                  <><CheckCircle2 className="w-4 h-4" /> Xác nhận</>
                ) : (
                  <><XCircle className="w-4 h-4" /> Từ chối</>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowConfirm(null)}>
                Hủy
              </Button>
            </div>
          </div>
        )}
      </div>
  );
}
