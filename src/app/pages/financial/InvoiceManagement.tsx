import { useState } from 'react';
import {
  FileText,
  Upload,
  Search,
  Plus,
  Download,
  Eye,
  Edit,
  MoreVertical,
  Calendar,
  DollarSign,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle,
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
import { INVOICES, formatCurrency } from '../../lib/mockData';
import { toast } from 'sonner';

const invoiceCategories = [
  { name: 'Đã thanh toán', count: INVOICES.filter(i => i.status === 'paid').length, icon: CheckCircle, color: 'text-green-500' },
  { name: 'Chờ thanh toán', count: INVOICES.filter(i => i.status === 'sent').length, icon: Clock, color: 'text-yellow-500' },
  { name: 'Quá hạn', count: INVOICES.filter(i => i.status === 'overdue').length, icon: AlertCircle, color: 'text-red-500' },
  { name: 'Nháp', count: INVOICES.filter(i => i.status === 'draft').length, icon: FileText, color: 'text-gray-500' },
];

export default function InvoiceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    invoiceNumber: '',
    vendor: '',
    issueDate: '',
    dueDate: '',
    total: 0,
  });

  const filteredInvoices = INVOICES.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleUpload = () => {
    // Mock upload
    toast.success('Hóa đơn đã được upload thành công!');
    setShowUploadForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'sent':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán';
      case 'sent':
        return 'Đã gửi';
      case 'overdue':
        return 'Quá hạn';
      default:
        return 'Nháp';
    }
  };

  const handleEdit = (invoice: any) => {
    setSelectedInvoice(invoice);
    setEditFormData({
      invoiceNumber: invoice.invoiceNumber,
      vendor: invoice.vendor,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      total: invoice.total,
    });
    setShowEditForm(true);
  };

  const handleViewDetail = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowDetailModal(true);
  };

  const handleDownload = (invoice: any) => {
    // Mock download
    toast.success(`Đang tải xuống hóa đơn ${invoice.invoiceNumber}...`);
    // Simulate download delay
    setTimeout(() => {
      toast.success('Hóa đơn đã được tải xuống thành công!');
    }, 2000);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update
    toast.success('Hóa đơn đã được cập nhật thành công!');
    setShowEditForm(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Chứng từ / Hóa đơn</h1>
          <p className="text-gray-600 mt-1">
            Upload, lưu trữ và tra cứu các file hóa đơn, chứng từ tài chính
          </p>
        </div>
        <Button onClick={() => setShowUploadForm(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload hóa đơn
        </Button>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {invoiceCategories.map((category, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{category.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{category.count}</p>
              </div>
              <category.icon className={`w-8 h-8 ${category.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo số hóa đơn hoặc nhà cung cấp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="draft">Nháp</option>
          <option value="sent">Đã gửi</option>
          <option value="paid">Đã thanh toán</option>
          <option value="overdue">Quá hạn</option>
        </select>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Upload hóa đơn mới</h3>
              <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  File hóa đơn
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Số hóa đơn
                </label>
                <input
                  type="text"
                  placeholder="INV-2026-XXX"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nhà cung cấp
                </label>
                <input
                  type="text"
                  placeholder="Tên công ty cung cấp"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Ngày phát hành
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Ngày đáo hạn
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 bg-background"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUploadForm(false)}
                >
                  Hủy
                </Button>
                <Button onClick={handleUpload}>
                  Upload
                </Button>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số hóa đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nhà cung cấp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày phát hành
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đáo hạn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.invoiceNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{invoice.vendor}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{invoice.issueDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{invoice.dueDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(invoice.total)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(invoice.status)}
                      <span className="ml-2 text-sm text-gray-900">
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetail(invoice)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(invoice)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(invoice)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Invoice Modal */}
      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa hóa đơn</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin hóa đơn
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit-invoice-number">Số hóa đơn</Label>
              <Input
                id="edit-invoice-number"
                value={editFormData.invoiceNumber}
                onChange={(e) => setEditFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                placeholder="Nhập số hóa đơn"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-vendor">Nhà cung cấp</Label>
              <Input
                id="edit-vendor"
                value={editFormData.vendor}
                onChange={(e) => setEditFormData(prev => ({ ...prev, vendor: e.target.value }))}
                placeholder="Nhập tên nhà cung cấp"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-issue-date">Ngày phát hành</Label>
                <Input
                  id="edit-issue-date"
                  type="date"
                  value={editFormData.issueDate}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-due-date">Ngày đáo hạn</Label>
                <Input
                  id="edit-due-date"
                  type="date"
                  value={editFormData.dueDate}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-total">Tổng tiền (VNĐ)</Label>
              <Input
                id="edit-total"
                type="number"
                value={editFormData.total}
                onChange={(e) => setEditFormData(prev => ({ ...prev, total: Number(e.target.value) }))}
                placeholder="Nhập tổng tiền"
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEditForm(false)}>
                Hủy
              </Button>
              <Button type="submit">Cập nhật</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết hóa đơn</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về hóa đơn
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Số hóa đơn</Label>
                  <p className="text-sm font-medium text-gray-900">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <Label>Nhà cung cấp</Label>
                  <p className="text-sm text-gray-600">{selectedInvoice.vendor}</p>
                </div>
                <div>
                  <Label>Ngày phát hành</Label>
                  <p className="text-sm text-gray-600">{selectedInvoice.issueDate}</p>
                </div>
                <div>
                  <Label>Ngày đáo hạn</Label>
                  <p className="text-sm text-gray-600">{selectedInvoice.dueDate}</p>
                </div>
                <div>
                  <Label>Tổng tiền</Label>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(selectedInvoice.total)}</p>
                </div>
                <div>
                  <Label>Trạng thái</Label>
                  <div className="flex items-center">
                    {getStatusIcon(selectedInvoice.status)}
                    <span className="ml-2 text-sm text-gray-600">{getStatusText(selectedInvoice.status)}</span>
                  </div>
                </div>
              </div>
              {selectedInvoice.description && (
                <div>
                  <Label>Mô tả</Label>
                  <p className="text-sm text-gray-600">{selectedInvoice.description}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowDetailModal(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
