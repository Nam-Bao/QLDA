export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 IT Project Manager. Quản lý dự án CNTT chuyên nghiệp.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Về chúng tôi
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Hỗ trợ
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Điều khoản
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Bảo mật
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
