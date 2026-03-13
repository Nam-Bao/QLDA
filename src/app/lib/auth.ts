// ===================== AUTH TYPES & MOCK DATA =====================

export type UserRole =
  | 'director'       // Ban giám đốc
  | 'pm'             // Project Manager
  | 'team_lead'      // Trưởng nhóm
  | 'member'         // Thành viên
  | 'customer'       // Khách hàng
  | 'accountant'     // Kế toán
  | 'admin';         // Quản trị hệ thống

export const ROLE_LABELS: Record<UserRole, string> = {
  director: 'Ban Giám Đốc',
  pm: 'Project Manager',
  team_lead: 'Trưởng Nhóm',
  member: 'Thành Viên',
  customer: 'Khách Hàng',
  accountant: 'Kế Toán',
  admin: 'Quản Trị Hệ Thống',
};

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;        // Initials for avatar
  department: string;
}

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Trần Minh Khoa',
    email: 'giamdoc@company.com',
    password: '123456',
    role: 'director',
    avatar: 'TMK',
    department: 'Ban Giám Đốc',
  },
  {
    id: 'u2',
    name: 'Bùi Thị Hoa',
    email: 'pm@company.com',
    password: '123456',
    role: 'pm',
    avatar: 'BTH',
    department: 'Phòng Dự Án',
  },
  {
    id: 'u3',
    name: 'Nguyễn Văn An',
    email: 'truongnhom@company.com',
    password: '123456',
    role: 'team_lead',
    avatar: 'NVA',
    department: 'Phòng Phát Triển',
  },
  {
    id: 'u4',
    name: 'Hoàng Văn Em',
    email: 'thanhvien@company.com',
    password: '123456',
    role: 'member',
    avatar: 'HVE',
    department: 'Phòng Phát Triển',
  },
  {
    id: 'u5',
    name: 'Công ty ABC',
    email: 'khachhang@company.com',
    password: '123456',
    role: 'customer',
    avatar: 'KH',
    department: 'Khách Hàng',
  },
  {
    id: 'u6',
    name: 'Lê Thị Kế Toán',
    email: 'ketoan@company.com',
    password: '123456',
    role: 'accountant',
    avatar: 'LTK',
    department: 'Phòng Kế Toán',
  },
  {
    id: 'u7',
    name: 'Phạm Văn Quản Trị',
    email: 'admin@company.com',
    password: '123456',
    role: 'admin',
    avatar: 'PVQ',
    department: 'Phòng IT',
  },
];

export type AuthUser = Omit<User, 'password'>;

export function loginUser(
  email: string,
  password: string
): AuthUser | null {
  const found = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!found) return null;
  const { password: _pw, ...authUser } = found;
  return authUser;
}
