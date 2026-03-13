import { useState } from 'react';
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Check,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../components/Button';

interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  type: string;
}

interface CategoryType {
  id: string;
  name: string;
  icon: string;
  categories: Category[];
}

const mockCategoryTypes: CategoryType[] = [
  {
    id: '1',
    name: 'Loại dự án',
    icon: '📁',
    categories: [
      {
        id: '1-1',
        name: 'Website',
        description: 'Dự án phát triển website',
        itemCount: 12,
        type: '1',
      },
      {
        id: '1-2',
        name: 'Mobile App',
        description: 'Dự án phát triển ứng dụng di động',
        itemCount: 8,
        type: '1',
      },
      {
        id: '1-3',
        name: 'Hệ thống nội bộ',
        description: 'Dự án phát triển hệ thống quản lý nội bộ',
        itemCount: 5,
        type: '1',
      },
    ],
  },
  {
    id: '2',
    name: 'Trạng thái công việc',
    icon: '📊',
    categories: [
      {
        id: '2-1',
        name: 'Chưa bắt đầu',
        description: 'Công việc chưa được khởi động',
        itemCount: 45,
        type: '2',
      },
      {
        id: '2-2',
        name: 'Đang thực hiện',
        description: 'Công việc đang được thực hiện',
        itemCount: 78,
        type: '2',
      },
      {
        id: '2-3',
        name: 'Đang review',
        description: 'Công việc đang được review',
        itemCount: 23,
        type: '2',
      },
      {
        id: '2-4',
        name: 'Hoàn thành',
        description: 'Công việc đã hoàn thành',
        itemCount: 156,
        type: '2',
      },
    ],
  },
  {
    id: '3',
    name: 'Phòng ban',
    icon: '🏢',
    categories: [
      {
        id: '3-1',
        name: 'Phát triển phần mềm',
        description: 'Bộ phận phát triển sản phẩm',
        itemCount: 35,
        type: '3',
      },
      {
        id: '3-2',
        name: 'Thiết kế UI/UX',
        description: 'Bộ phận thiết kế giao diện',
        itemCount: 12,
        type: '3',
      },
      {
        id: '3-3',
        name: 'Kiểm thử QA',
        description: 'Bộ phận đảm bảo chất lượng',
        itemCount: 8,
        type: '3',
      },
      {
        id: '3-4',
        name: 'Marketing',
        description: 'Bộ phận tiếp thị',
        itemCount: 6,
        type: '3',
      },
    ],
  },
  {
    id: '4',
    name: 'Độ ưu tiên',
    icon: '🔥',
    categories: [
      {
        id: '4-1',
        name: 'Khẩn cấp',
        description: 'Ưu tiên cao nhất',
        itemCount: 15,
        type: '4',
      },
      {
        id: '4-2',
        name: 'Cao',
        description: 'Ưu tiên cao',
        itemCount: 42,
        type: '4',
      },
      {
        id: '4-3',
        name: 'Trung bình',
        description: 'Ưu tiên trung bình',
        itemCount: 87,
        type: '4',
      },
      {
        id: '4-4',
        name: 'Thấp',
        description: 'Ưu tiên thấp',
        itemCount: 34,
        type: '4',
      },
    ],
  },
  {
    id: '5',
    name: 'Loại tài liệu',
    icon: '📄',
    categories: [
      {
        id: '5-1',
        name: 'Tài liệu kỹ thuật',
        description: 'Tài liệu về kỹ thuật phát triển',
        itemCount: 67,
        type: '5',
      },
      {
        id: '5-2',
        name: 'Hợp đồng',
        description: 'Các loại hợp đồng',
        itemCount: 23,
        type: '5',
      },
      {
        id: '5-3',
        name: 'Báo cáo',
        description: 'Các loại báo cáo',
        itemCount: 89,
        type: '5',
      },
    ],
  },
];

export default function CategoryManagement() {
  const [categoryTypes, setCategoryTypes] = useState(mockCategoryTypes);
  const [selectedType, setSelectedType] = useState<CategoryType | null>(
    categoryTypes[0]
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const filteredCategories =
    selectedType?.categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;

    if (editingCategory) {
      // Update existing category
      setCategoryTypes((prev) =>
        prev.map((type) =>
          type.id === selectedType.id
            ? {
                ...type,
                categories: type.categories.map((cat) =>
                  cat.id === editingCategory.id
                    ? { ...cat, ...formData }
                    : cat
                ),
              }
            : type
        )
      );
      alert('Cập nhật danh mục thành công!');
    } else {
      // Create new category
      const newCategory: Category = {
        id: `${selectedType.id}-${Date.now()}`,
        ...formData,
        itemCount: 0,
        type: selectedType.id,
      };
      setCategoryTypes((prev) =>
        prev.map((type) =>
          type.id === selectedType.id
            ? { ...type, categories: [...type.categories, newCategory] }
            : type
        )
      );
      alert('Thêm danh mục thành công!');
    }
    closeModal();
  };

  const deleteCategory = (categoryId: string) => {
    if (!selectedType) return;
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategoryTypes((prev) =>
        prev.map((type) =>
          type.id === selectedType.id
            ? {
                ...type,
                categories: type.categories.filter((cat) => cat.id !== categoryId),
              }
            : type
        )
      );
      alert('Xóa danh mục thành công!');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Quản lý danh mục</h1>
        <p className="text-muted-foreground">
          Quản lý các danh mục hệ thống: loại dự án, trạng thái, phòng ban...
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Types */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="font-medium mb-4">Loại danh mục</h2>
            <div className="space-y-2">
              {categoryTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedType?.id === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{type.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium">{type.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {type.categories.length} danh mục
                      </p>
                    </div>
                    {selectedType?.id === type.id && (
                      <ChevronRight className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-lg">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl mb-1">{selectedType?.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Quản lý danh sách {selectedType?.name.toLowerCase()}
                  </p>
                </div>
                <Button onClick={() => openModal()}>
                  <Plus className="w-5 h-5 mr-2" />
                  Thêm danh mục
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm danh mục..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                />
              </div>
            </div>

            {/* Categories Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openModal(category)}
                          className="h-8 w-8"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCategory(category.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FolderTree className="w-4 h-4" />
                      <span>Đang sử dụng: {category.itemCount} mục</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <FolderTree className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl mb-2">Không tìm thấy danh mục</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm
                      ? 'Thử tìm kiếm với từ khóa khác'
                      : 'Chưa có danh mục nào được tạo'}
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => openModal()}>
                      <Plus className="w-5 h-5 mr-2" />
                      Thêm danh mục đầu tiên
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-medium">
                {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
              </h2>
              <button
                onClick={closeModal}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Loại danh mục
                </label>
                <div className="px-4 py-2.5 bg-muted rounded-lg flex items-center gap-2">
                  <span className="text-xl">{selectedType?.icon}</span>
                  <span>{selectedType?.name}</span>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  placeholder="Nhập tên danh mục"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background resize-none"
                  placeholder="Nhập mô tả cho danh mục"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  className="flex-1"
                >
                  Hủy
                </Button>
                <Button type="submit" className="flex-1">
                  <Check className="w-4 h-4 mr-2" />
                  {editingCategory ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
