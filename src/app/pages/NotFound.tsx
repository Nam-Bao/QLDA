import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-9xl text-primary mb-4">404</h1>
        <h2 className="mb-4">Không tìm thấy trang</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
          <Button onClick={() => navigate('/')}>
            <Home className="w-4 h-4" />
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
