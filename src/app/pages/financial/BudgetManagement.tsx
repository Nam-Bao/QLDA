import { useState } from 'react';
import {
  DollarSign,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
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
  EXPENSE_ENTRIES,
  PROJECTS,
  TEAM_MEMBERS,
  formatCurrency,
  getProjectById,
  getMemberById,
} from '../../lib/mockData';
import { toast } from 'sonner';

interface ExpenseFormData {
  projectId: string;
  category: string;
  amount: number;
  description: string;
}

const categories = ['Nhân sự', 'Công nghệ', 'Thiết bị', 'Khác'];

export default function BudgetManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [formData, setFormData] = useState<ExpenseFormData>({
    projectId: '',
    category: '',
    amount: 0,
    description: '',
  });
  const [editFormData, setEditFormData] = useState<ExpenseFormData>({
    projectId: '',
    category: '',
    amount: 0,
    description: '',
  });

  const filteredExpenses = EXPENSE_ENTRIES.filter(expense => {
    const project = getProjectById(expense.projectId);
    const matchesSearch = project?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    toast.success('Chi phí đã được ghi nhận thành công!');
    setShowForm(false);
    setFormData({ projectId: '', category: '', amount: 0, description: '' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Từ chối';
      default:
        return 'Chờ duyệt';
    }
  };

  const handleEdit = (expense: any) => {
    setSelectedExpense(expense);
    setEditFormData({
      projectId: expense.projectId,
      category: expense.category,
      amount: expense.amount,
      description: expense.description,
    });
    setShowEditForm(true);
  };

  const handleViewDetail = (expense: any) => {
    setSelectedExpense(expense);
    setShowDetailModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update
    toast.success('Chi phí đã được cập nhật thành công!');
    setShowEditForm(false);
    setSelectedExpense(null);
  };

  const handleDelete = (expenseId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa chi phí này?')) {
      // Mock delete
      toast.success('Chi phí đã được xóa thành công!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Ngân sách & Chi phí</h1>
          <p className="text-gray-600 mt-1">
            Ghi nhận và theo dõi ngân sách ban đầu, chi phí thực tế
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm chi phí
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo dự án hoặc hạng mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Tất cả hạng mục</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Expense Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Thêm chi phí mới</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Dự án
                </label>
                <select
                  value={formData.projectId}
                  onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 bg-background"
                  required
                >
                  <option value="">Chọn dự án</option>
                  {PROJECTS.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Hạng mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 bg-background"
                  required
                >
                  <option value="">Chọn hạng mục</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Số tiền (VNĐ)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 bg-background"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 bg-background"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  Ghi nhận
                </Button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}

      {/* Expenses Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dự án
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hạng mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người ghi nhận
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => {
                const project = getProjectById(expense.projectId);
                const member = getMemberById(expense.submittedBy);
                return (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {project?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{expense.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(expense.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(expense.status)}
                        <span className="ml-2 text-sm text-gray-900">
                          {getStatusText(expense.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member?.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{expense.submittedAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(expense)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetail(expense)}
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredExpenses.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Không có chi phí nào</h3>
          <p className="mt-1 text-sm text-gray-500">
            Bắt đầu bằng cách thêm chi phí đầu tiên.
          </p>
        </div>
      )}

      {/* Edit Expense Modal */}
      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa chi phí</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin chi phí
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit-project">Dự án</Label>
              <select
                id="edit-project"
                value={editFormData.projectId}
                onChange={(e) => setEditFormData(prev => ({ ...prev, projectId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn dự án</option>
                {PROJECTS.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="edit-category">Hạng mục</Label>
              <select
                id="edit-category"
                value={editFormData.category}
                onChange={(e) => setEditFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn hạng mục</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="edit-amount">Số tiền (VNĐ)</Label>
              <Input
                id="edit-amount"
                type="number"
                value={editFormData.amount}
                onChange={(e) => setEditFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
                placeholder="Nhập số tiền"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Mô tả</Label>
              <Input
                id="edit-description"
                value={editFormData.description}
                onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả chi phí"
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
            <DialogTitle>Chi tiết chi phí</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về chi phí
            </DialogDescription>
          </DialogHeader>
          {selectedExpense && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Dự án</Label>
                  <p className="text-sm text-gray-600">{getProjectById(selectedExpense.projectId)?.name}</p>
                </div>
                <div>
                  <Label>Hạng mục</Label>
                  <p className="text-sm text-gray-600">{selectedExpense.category}</p>
                </div>
                <div>
                  <Label>Số tiền</Label>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(selectedExpense.amount)}</p>
                </div>
                <div>
                  <Label>Trạng thái</Label>
                  <div className="flex items-center">
                    {getStatusIcon(selectedExpense.status)}
                    <span className="ml-2 text-sm text-gray-600">{getStatusText(selectedExpense.status)}</span>
                  </div>
                </div>
                <div>
                  <Label>Người ghi nhận</Label>
                  <p className="text-sm text-gray-600">{getMemberById(selectedExpense.submittedBy)?.name}</p>
                </div>
                <div>
                  <Label>Ngày ghi nhận</Label>
                  <p className="text-sm text-gray-600">{selectedExpense.submittedAt}</p>
                </div>
              </div>
              <div>
                <Label>Mô tả</Label>
                <p className="text-sm text-gray-600">{selectedExpense.description}</p>
              </div>
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
