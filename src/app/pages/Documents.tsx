import { useMemo, useState } from 'react';
import { FileText, Folder, Download, Upload, Search, Plus } from 'lucide-react';
import { Button } from '../components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const folders = [
  { name: 'Tài liệu dự án', count: 24, icon: Folder },
  { name: 'Hợp đồng', count: 12, icon: Folder },
  { name: 'Báo cáo', count: 18, icon: Folder },
  { name: 'Thiết kế', count: 35, icon: Folder },
];

const documents = [
  {
    name: 'Kế hoạch dự án E-commerce 2026.pdf',
    size: '2.4 MB',
    date: '10/03/2026',
    type: 'PDF',
    folder: 'Tài liệu dự án',
  },
  {
    name: 'Báo giá Mobile Banking.xlsx',
    size: '1.2 MB',
    date: '08/03/2026',
    type: 'Excel',
    folder: 'Hợp đồng',
  },
  {
    name: 'Thiết kế giao diện Homepage.fig',
    size: '5.8 MB',
    date: '07/03/2026',
    type: 'Figma',
    folder: 'Thiết kế',
  },
  {
    name: 'Báo cáo tiến độ tháng 2.docx',
    size: '890 KB',
    date: '05/03/2026',
    type: 'Word',
    folder: 'Báo cáo',
  },
  {
    name: 'Yêu cầu kỹ thuật ERP.pdf',
    size: '3.1 MB',
    date: '03/03/2026',
    type: 'PDF',
    folder: 'Tài liệu dự án',
  },
  {
    name: 'Hợp đồng phát triển phần mềm.pdf',
    size: '1.5 MB',
    date: '01/03/2026',
    type: 'PDF',
    folder: 'Hợp đồng',
  },
];

export function Documents() {
  const [foldersState, setFoldersState] = useState(folders);
  const [documentsState, setDocumentsState] = useState(documents);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFolder, setUploadFolder] = useState(folders[0]?.name ?? '');

  const folderCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    documentsState.forEach((doc) => {
      counts[doc.folder] = (counts[doc.folder] || 0) + 1;
    });
    return counts;
  }, [documentsState]);

  const displayedDocuments = useMemo(() => {
    if (!selectedFolder) return documentsState;
    return documentsState.filter((doc) => doc.folder === selectedFolder);
  }, [documentsState, selectedFolder]);

  const handleCreateFolder = () => {
    const name = newFolderName.trim();
    if (!name) return;
    if (foldersState.some((f) => f.name === name)) return;
    setFoldersState([{ name, count: 0, icon: Folder }, ...foldersState]);
    setNewFolderName('');
    setCreateFolderOpen(false);
  };

  const handleUpload = () => {
    if (!uploadFile) return;

    const newDoc = {
      name: uploadFile.name,
      size: `${(uploadFile.size / 1024 / 1024).toFixed(2)} MB`,
      date: new Date().toLocaleDateString('vi-VN'),
      type: uploadFile.name.split('.').pop()?.toUpperCase() ?? 'File',
      folder: uploadFolder,
    };

    setDocumentsState([newDoc, ...documentsState]);
    setUploadFile(null);
    setUploadOpen(false);
  };

  const openUploadDialog = () => {
    setUploadFolder(selectedFolder ?? foldersState[0]?.name ?? '');
    setUploadFile(null);
    setUploadOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Quản lý tài liệu</h1>
          <p className="text-muted-foreground mt-1">
            Lưu trữ và quản lý tài liệu dự án
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="w-4 h-4" />
                Tải lên
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tải tài liệu lên</DialogTitle>
                <DialogDescription>
                  Chọn tệp và chọn thư mục để tải lên.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="upload-file">Chọn tệp</Label>
                  <input
                    id="upload-file"
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
                    className="file:border-0 file:bg-primary file:text-white file:px-3 file:py-1"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="upload-folder">Thư mục</Label>
                  <select
                    id="upload-folder"
                    value={uploadFolder}
                    onChange={(e) => setUploadFolder(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2"
                  >
                    {foldersState.map((folder) => (
                      <option key={folder.name} value={folder.name}>
                        {folder.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleUpload}>Tải lên</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={createFolderOpen} onOpenChange={setCreateFolderOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4" />
                Tạo thư mục
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo thư mục mới</DialogTitle>
                <DialogDescription>
                  Nhập tên thư mục để tạo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="new-folder-name">Tên thư mục</Label>
                  <Input
                    id="new-folder-name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Ví dụ: Tài liệu dự án"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateFolderOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleCreateFolder}>Tạo</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Storage Info */}
      <div className="bg-gradient-to-br from-primary to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white">Dung lượng lưu trữ</h3>
            <p className="text-blue-100 mt-1">52.4 GB / 100 GB đã sử dụng</p>
          </div>
          <FileText className="w-12 h-12 opacity-50" />
        </div>
        <div className="bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all"
            style={{ width: '52.4%' }}
          ></div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Folders */}
      <div>
        <h3 className="mb-4">Thư mục</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {foldersState.map((folder) => {
            const isSelected = selectedFolder === folder.name;
            const fileCount = folderCounts[folder.name] ?? 0;
            return (
              <div
                key={folder.name}
                onClick={() =>
                  setSelectedFolder((current) =>
                    current === folder.name ? null : folder.name,
                  )
                }
                className={`bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer ${
                  isSelected ? 'border-primary ring-2 ring-primary/30' : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Folder className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {fileCount} file
                  </span>
                </div>
                <h4 className="text-sm">{folder.name}</h4>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3>Tài liệu gần đây</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3">Tên tài liệu</th>
                <th className="text-left px-6 py-3">Thư mục</th>
                <th className="text-left px-6 py-3">Loại</th>
                <th className="text-left px-6 py-3">Kích thước</th>
                <th className="text-left px-6 py-3">Ngày tạo</th>
                <th className="text-left px-6 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedDocuments.map((doc, index) => (
                <tr
                  key={`${doc.name}-${index}`}
                  className="border-b border-border hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <span>{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {doc.folder}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {doc.date}
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
