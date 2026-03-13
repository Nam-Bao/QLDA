// ===================== MOCK DATA SHARED ACROSS PM MODULE =====================

export type ProjectStatus = 'planning' | 'in-progress' | 'completed' | 'paused';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  workloadPercent: number;
  skills: string[];
  projects: string[];
  weeklyLoad: { week: string; load: number }[];
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  status: 'done' | 'current' | 'upcoming';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  progress: number;
  teamIds: string[];
  startDate: string;
  endDate: string;
  budgetTotal: number;
  budgetUsed: number;
  tags: string[];
  pm: string;
  customer: string;
  milestones: Milestone[];
  progressHistory: { week: string; plan: number; actual: number }[];
  taskStats: { todo: number; inProgress: number; review: number; done: number };
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  createdAt: string;
}

export interface HistoryEntry {
  id: string;
  actor: string;
  action: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId: string;
  reporterId: string;
  startDate: string;
  dueDate: string;
  tags: string[];
  estimatedHours: number;
  loggedHours: number;
  attachments: Attachment[];
  comments: Comment[];
  history: HistoryEntry[];
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'delivered' | 'accepted' | 'rejected';
  deliveredDate?: string;
  documents: { id: string; name: string; size: string; url: string }[];
}

// ===================== FINANCIAL MODULE INTERFACES =====================

export interface CostCategory {
  id: string;
  name: string;
  projectId: string;
  amount: number;
  percentage: number;
}

export interface ExpenseEntry {
  id: string;
  projectId: string;
  category: string;
  amount: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  approvalDate?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: { description: string; amount: number }[];
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  vendor: string;
  total: number;
}

export interface ApprovalRequest {
  id: string;
  type: 'project_start' | 'expense';
  projectId: string;
  amount: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  reason?: string;
}

export interface RiskAlert {
  id: string;
  type: 'budget_overrun' | 'delay';
  projectId: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  createdAt: string;
  resolved: boolean;
}

// ===================== TEAM MEMBERS =====================
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Nguyễn Văn An',
    role: 'Senior FE Developer',
    email: 'an.nguyen@company.com',
    avatar: 'NVA',
    workloadPercent: 85,
    skills: ['React', 'TypeScript', 'CSS'],
    projects: ['p1', 'p6'],
    weeklyLoad: [
      { week: 'T10/W1', load: 80 },
      { week: 'T10/W2', load: 90 },
      { week: 'T10/W3', load: 85 },
      { week: 'T11/W1', load: 70 },
      { week: 'T11/W2', load: 95 },
      { week: 'T11/W3', load: 80 },
    ],
  },
  {
    id: 'tm2',
    name: 'Trần Thị Bình',
    role: 'Backend Developer',
    email: 'binh.tran@company.com',
    avatar: 'TTB',
    workloadPercent: 90,
    skills: ['Java', 'Spring Boot', 'PostgreSQL'],
    projects: ['p1', 'p2'],
    weeklyLoad: [
      { week: 'T10/W1', load: 90 },
      { week: 'T10/W2', load: 100 },
      { week: 'T10/W3', load: 95 },
      { week: 'T11/W1', load: 85 },
      { week: 'T11/W2', load: 90 },
      { week: 'T11/W3', load: 100 },
    ],
  },
  {
    id: 'tm3',
    name: 'Lê Văn Cường',
    role: 'Mobile Developer',
    email: 'cuong.le@company.com',
    avatar: 'LVC',
    workloadPercent: 70,
    skills: ['React Native', 'Flutter', 'iOS'],
    projects: ['p2'],
    weeklyLoad: [
      { week: 'T10/W1', load: 70 },
      { week: 'T10/W2', load: 65 },
      { week: 'T10/W3', load: 75 },
      { week: 'T11/W1', load: 80 },
      { week: 'T11/W2', load: 70 },
      { week: 'T11/W3', load: 60 },
    ],
  },
  {
    id: 'tm4',
    name: 'Phạm Thị Dung',
    role: 'UX/UI Designer',
    email: 'dung.pham@company.com',
    avatar: 'PTD',
    workloadPercent: 60,
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    projects: ['p1', 'p5'],
    weeklyLoad: [
      { week: 'T10/W1', load: 55 },
      { week: 'T10/W2', load: 60 },
      { week: 'T10/W3', load: 65 },
      { week: 'T11/W1', load: 50 },
      { week: 'T11/W2', load: 70 },
      { week: 'T11/W3', load: 60 },
    ],
  },
  {
    id: 'tm5',
    name: 'Hoàng Văn Em',
    role: 'QA Engineer',
    email: 'em.hoang@company.com',
    avatar: 'HVE',
    workloadPercent: 75,
    skills: ['Selenium', 'JMeter', 'Postman'],
    projects: ['p1', 'p3'],
    weeklyLoad: [
      { week: 'T10/W1', load: 75 },
      { week: 'T10/W2', load: 80 },
      { week: 'T10/W3', load: 70 },
      { week: 'T11/W1', load: 85 },
      { week: 'T11/W2', load: 75 },
      { week: 'T11/W3', load: 70 },
    ],
  },
  {
    id: 'tm6',
    name: 'Vũ Thị Phương',
    role: 'Business Analyst',
    email: 'phuong.vu@company.com',
    avatar: 'VTP',
    workloadPercent: 50,
    skills: ['Requirements', 'BPMN', 'SQL'],
    projects: ['p3', 'p5'],
    weeklyLoad: [
      { week: 'T10/W1', load: 50 },
      { week: 'T10/W2', load: 45 },
      { week: 'T10/W3', load: 55 },
      { week: 'T11/W1', load: 50 },
      { week: 'T11/W2', load: 40 },
      { week: 'T11/W3', load: 60 },
    ],
  },
  {
    id: 'tm7',
    name: 'Đặng Văn Quân',
    role: 'DevOps Engineer',
    email: 'quan.dang@company.com',
    avatar: 'DVQ',
    workloadPercent: 65,
    skills: ['Docker', 'Kubernetes', 'CI/CD'],
    projects: ['p1', 'p2', 'p3'],
    weeklyLoad: [
      { week: 'T10/W1', load: 65 },
      { week: 'T10/W2', load: 70 },
      { week: 'T10/W3', load: 60 },
      { week: 'T11/W1', load: 75 },
      { week: 'T11/W2', load: 65 },
      { week: 'T11/W3', load: 55 },
    ],
  },
  {
    id: 'tm8',
    name: 'Bùi Thị Hoa',
    role: 'Project Manager',
    email: 'hoa.bui@company.com',
    avatar: 'BTH',
    workloadPercent: 80,
    skills: ['PMP', 'Agile', 'Scrum'],
    projects: ['p1', 'p2', 'p4'],
    weeklyLoad: [
      { week: 'T10/W1', load: 80 },
      { week: 'T10/W2', load: 85 },
      { week: 'T10/W3', load: 75 },
      { week: 'T11/W1', load: 80 },
      { week: 'T11/W2', load: 90 },
      { week: 'T11/W3', load: 80 },
    ],
  },
];

// ===================== PROJECTS =====================
export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Website Thương mại điện tử',
    description: 'Xây dựng nền tảng bán hàng trực tuyến với đầy đủ tính năng: giỏ hàng, thanh toán, quản lý đơn hàng, hệ thống review, tích hợp shipping API.',
    status: 'in-progress',
    priority: 'high',
    progress: 75,
    teamIds: ['tm1', 'tm2', 'tm4', 'tm5', 'tm7', 'tm8'],
    startDate: '2026-01-01',
    endDate: '2026-04-15',
    budgetTotal: 500000000,
    budgetUsed: 375000000,
    tags: ['Web', 'E-commerce', 'React'],
    pm: 'Bùi Thị Hoa',
    customer: 'Công ty TNHH Thương Mại ABC',
    milestones: [
      { id: 'ms1', title: 'Kickoff & Phân tích yêu cầu', date: '10/01/2026', status: 'done' },
      { id: 'ms2', title: 'Hoàn thành thiết kế UI/UX', date: '01/02/2026', status: 'done' },
      { id: 'ms3', title: 'Phát triển core modules', date: '01/03/2026', status: 'done' },
      { id: 'ms4', title: 'Tích hợp Payment & Shipping', date: '25/03/2026', status: 'current' },
      { id: 'ms5', title: 'UAT & Kiểm thử toàn diện', date: '05/04/2026', status: 'upcoming' },
      { id: 'ms6', title: 'Go-live Production', date: '15/04/2026', status: 'upcoming' },
    ],
    progressHistory: [
      { week: 'T1', plan: 10, actual: 8 },
      { week: 'T2', plan: 20, actual: 18 },
      { week: 'T3', plan: 30, actual: 28 },
      { week: 'T4', plan: 40, actual: 42 },
      { week: 'T5', plan: 50, actual: 52 },
      { week: 'T6', plan: 60, actual: 63 },
      { week: 'T7', plan: 68, actual: 70 },
      { week: 'T8', plan: 75, actual: 75 },
    ],
    taskStats: { todo: 5, inProgress: 8, review: 3, done: 24 },
  },
  {
    id: 'p2',
    name: 'Ứng dụng Mobile Banking',
    description: 'Phát triển ứng dụng ngân hàng di động cho iOS và Android với đầy đủ tính năng: chuyển khoản, thanh toán hóa đơn, quản lý tài khoản, bảo mật 2FA.',
    status: 'in-progress',
    priority: 'high',
    progress: 60,
    teamIds: ['tm2', 'tm3', 'tm5', 'tm7', 'tm8'],
    startDate: '2026-01-15',
    endDate: '2026-04-30',
    budgetTotal: 800000000,
    budgetUsed: 480000000,
    tags: ['Mobile', 'Banking', 'React Native'],
    pm: 'Bùi Thị Hoa',
    customer: 'Ngân hàng XYZ',
    milestones: [
      { id: 'ms1', title: 'Phân tích & Kiến trúc hệ thống', date: '25/01/2026', status: 'done' },
      { id: 'ms2', title: 'Hoàn thành module Auth & Tài khoản', date: '20/02/2026', status: 'done' },
      { id: 'ms3', title: 'Module Chuyển khoản & Thanh toán', date: '20/03/2026', status: 'current' },
      { id: 'ms4', title: 'Tích hợp bảo mật 2FA & Biometric', date: '05/04/2026', status: 'upcoming' },
      { id: 'ms5', title: 'Go-live App Store & Play Store', date: '30/04/2026', status: 'upcoming' },
    ],
    progressHistory: [
      { week: 'T1', plan: 8, actual: 7 },
      { week: 'T2', plan: 18, actual: 15 },
      { week: 'T3', plan: 28, actual: 25 },
      { week: 'T4', plan: 38, actual: 38 },
      { week: 'T5', plan: 48, actual: 50 },
      { week: 'T6', plan: 58, actual: 60 },
    ],
    taskStats: { todo: 8, inProgress: 12, review: 4, done: 18 },
  },
  {
    id: 'p3',
    name: 'Hệ thống ERP',
    description: 'Triển khai hệ thống quản lý tài nguyên doanh nghiệp toàn diện: kế toán, nhân sự, kho vận, mua hàng, bán hàng tích hợp.',
    status: 'in-progress',
    priority: 'medium',
    progress: 40,
    teamIds: ['tm2', 'tm5', 'tm6', 'tm7'],
    startDate: '2026-02-01',
    endDate: '2026-05-20',
    budgetTotal: 1200000000,
    budgetUsed: 480000000,
    tags: ['Enterprise', 'ERP', 'Java'],
    pm: 'Vũ Thị Phương',
    customer: 'Tập đoàn Sản xuất DEF',
    milestones: [
      { id: 'ms1', title: 'Khảo sát & Lập kế hoạch', date: '15/02/2026', status: 'done' },
      { id: 'ms2', title: 'Module Kế toán cơ bản', date: '10/03/2026', status: 'done' },
      { id: 'ms3', title: 'Module Nhân sự & Bảng lương', date: '05/04/2026', status: 'current' },
      { id: 'ms4', title: 'Module Kho vận & Mua hàng', date: '30/04/2026', status: 'upcoming' },
      { id: 'ms5', title: 'Tích hợp & UAT', date: '20/05/2026', status: 'upcoming' },
    ],
    progressHistory: [
      { week: 'T1', plan: 5, actual: 4 },
      { week: 'T2', plan: 15, actual: 12 },
      { week: 'T3', plan: 25, actual: 22 },
      { week: 'T4', plan: 35, actual: 38 },
      { week: 'T5', plan: 42, actual: 40 },
    ],
    taskStats: { todo: 15, inProgress: 10, review: 5, done: 12 },
  },
  {
    id: 'p4',
    name: 'Portal Nội bộ',
    description: 'Cổng thông tin nội bộ cho nhân viên với tính năng thông báo, quản lý văn bản, lịch công tác, và bảng tin nội bộ.',
    status: 'completed',
    priority: 'low',
    progress: 100,
    teamIds: ['tm1', 'tm4', 'tm8'],
    startDate: '2025-12-01',
    endDate: '2026-03-01',
    budgetTotal: 300000000,
    budgetUsed: 285000000,
    tags: ['Web', 'Internal', 'Vue.js'],
    pm: 'Bùi Thị Hoa',
    customer: 'Nội bộ công ty',
    milestones: [
      { id: 'ms1', title: 'Phân tích & Thiết kế', date: '15/12/2025', status: 'done' },
      { id: 'ms2', title: 'Phát triển & Testing', date: '15/02/2026', status: 'done' },
      { id: 'ms3', title: 'Deploy & Training', date: '01/03/2026', status: 'done' },
    ],
    progressHistory: [
      { week: 'T1', plan: 15, actual: 12 },
      { week: 'T2', plan: 35, actual: 32 },
      { week: 'T3', plan: 55, actual: 58 },
      { week: 'T4', plan: 75, actual: 78 },
      { week: 'T5', plan: 90, actual: 92 },
      { week: 'T6', plan: 100, actual: 100 },
    ],
    taskStats: { todo: 0, inProgress: 0, review: 0, done: 42 },
  },
  {
    id: 'p5',
    name: 'Hệ thống CRM',
    description: 'Quản lý quan hệ khách hàng tự động với AI: phân tích hành vi, dự báo doanh thu, quản lý pipeline bán hàng.',
    status: 'planning',
    priority: 'medium',
    progress: 10,
    teamIds: ['tm1', 'tm4', 'tm6'],
    startDate: '2026-03-15',
    endDate: '2026-06-30',
    budgetTotal: 450000000,
    budgetUsed: 45000000,
    tags: ['CRM', 'Sales', 'Angular'],
    pm: 'Vũ Thị Phương',
    customer: 'Công ty Phân phối GHI',
    milestones: [
      { id: 'ms1', title: 'Kickoff & Phân tích', date: '20/03/2026', status: 'current' },
      { id: 'ms2', title: 'Thiết kế kiến trúc', date: '10/04/2026', status: 'upcoming' },
      { id: 'ms3', title: 'MVP ra mắt nội bộ', date: '15/05/2026', status: 'upcoming' },
      { id: 'ms4', title: 'Go-live chính thức', date: '30/06/2026', status: 'upcoming' },
    ],
    progressHistory: [
      { week: 'T1', plan: 5, actual: 4 },
      { week: 'T2', plan: 10, actual: 10 },
    ],
    taskStats: { todo: 12, inProgress: 2, review: 0, done: 2 },
  },
  {
    id: 'p6',
    name: 'Data Analytics Platform',
    description: 'Nền tảng phân tích dữ liệu cho doanh nghiệp với dashboard thời gian thực, dự báo bằng ML và tích hợp đa nguồn dữ liệu.',
    status: 'in-progress',
    priority: 'high',
    progress: 55,
    teamIds: ['tm1', 'tm2', 'tm6', 'tm7'],
    startDate: '2026-02-01',
    endDate: '2026-05-15',
    budgetTotal: 700000000,
    budgetUsed: 385000000,
    tags: ['Data', 'Analytics', 'Python'],
    pm: 'Vũ Thị Phương',
    customer: 'Tập đoàn Tài chính JKL',
    milestones: [
      { id: 'ms1', title: 'Data Architecture Design', date: '15/02/2026', status: 'done' },
      { id: 'ms2', title: 'ETL Pipeline hoàn thành', date: '10/03/2026', status: 'done' },
      { id: 'ms3', title: 'Dashboard & Visualization', date: '05/04/2026', status: 'current' },
      { id: 'ms4', title: 'ML Models Integration', date: '30/04/2026', status: 'upcoming' },
      { id: 'ms5', title: 'Go-live & Handover', date: '15/05/2026', status: 'upcoming' },
    ],
    progressHistory: [
      { week: 'T1', plan: 8, actual: 6 },
      { week: 'T2', plan: 20, actual: 18 },
      { week: 'T3', plan: 32, actual: 30 },
      { week: 'T4', plan: 44, actual: 46 },
      { week: 'T5', plan: 55, actual: 55 },
    ],
    taskStats: { todo: 7, inProgress: 9, review: 3, done: 16 },
  },
];

// ===================== TASKS FOR PROJECT p1 =====================
export const TASKS: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Thiết kế giao diện trang chủ',
    description: 'Thiết kế và phát triển giao diện trang chủ responsive, bao gồm hero section, featured products, categories, promotional banners và footer. Đảm bảo tối ưu SEO và Core Web Vitals.',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'tm1',
    reporterId: 'tm8',
    startDate: '2026-03-01',
    dueDate: '2026-03-15',
    tags: ['Frontend', 'UI', 'SEO'],
    estimatedHours: 40,
    loggedHours: 28,
    attachments: [
      { id: 'a1', name: 'homepage-wireframe.fig', size: '2.4 MB', type: 'figma', uploadedBy: 'Phạm Thị Dung', uploadedAt: '02/03/2026' },
      { id: 'a2', name: 'design-spec.pdf', size: '1.1 MB', type: 'pdf', uploadedBy: 'Phạm Thị Dung', uploadedAt: '02/03/2026' },
    ],
    comments: [
      { id: 'c1', author: 'Bùi Thị Hoa', role: 'PM', content: 'Vui lòng ưu tiên hoàn thành hero section trước để team QA có thể bắt ��ầu review.', createdAt: '01/03/2026 09:00' },
      { id: 'c2', author: 'Nguyễn Văn An', role: 'Dev', content: 'Đã hoàn thành hero section và featured products. Đang làm categories section, dự kiến xong trong 2 ngày.', createdAt: '05/03/2026 14:30' },
      { id: 'c3', author: 'Phạm Thị Dung', role: 'Designer', content: 'Phần promotional banner cần chỉnh lại màu sắc theo brand guidelines. Tôi đã cập nhật file Figma.', createdAt: '06/03/2026 10:15' },
    ],
    history: [
      { id: 'h1', actor: 'Bùi Thị Hoa', action: 'Tạo công việc', createdAt: '01/03/2026 08:30' },
      { id: 'h2', actor: 'Bùi Thị Hoa', action: 'Gán người thực hiện', field: 'Assignee', oldValue: 'Chưa gán', newValue: 'Nguyễn Văn An', createdAt: '01/03/2026 08:31' },
      { id: 'h3', actor: 'Nguyễn Văn An', action: 'Cập nhật trạng thái', field: 'Trạng thái', oldValue: 'To-do', newValue: 'In-progress', createdAt: '03/03/2026 09:00' },
      { id: 'h4', actor: 'Phạm Thị Dung', action: 'Đính kèm file', field: 'Tệp đính kèm', newValue: 'homepage-wireframe.fig', createdAt: '02/03/2026 11:00' },
    ],
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Phát triển API xác thực người dùng',
    description: 'Xây dựng API xác thực đầy đủ: đăng ký, đăng nhập, refresh token, quên mật khẩu, OAuth2 với Google và Facebook. Implement JWT và bảo mật theo OWASP standards.',
    status: 'done',
    priority: 'high',
    assigneeId: 'tm2',
    reporterId: 'tm8',
    startDate: '2026-01-10',
    dueDate: '2026-01-30',
    tags: ['Backend', 'API', 'Security'],
    estimatedHours: 60,
    loggedHours: 58,
    attachments: [
      { id: 'a3', name: 'api-auth-spec.yaml', size: '890 KB', type: 'yaml', uploadedBy: 'Trần Thị Bình', uploadedAt: '15/01/2026' },
    ],
    comments: [
      { id: 'c4', author: 'Trần Thị Bình', role: 'Dev', content: 'API đã hoàn thành và passed tất cả test cases. Sẵn sàng để review.', createdAt: '28/01/2026 16:00' },
      { id: 'c5', author: 'Hoàng Văn Em', role: 'QA', content: 'Đã review và test xong. Tất cả 47 test cases đều pass. Approve!', createdAt: '30/01/2026 11:30' },
    ],
    history: [
      { id: 'h5', actor: 'Bùi Thị Hoa', action: 'Tạo công việc', createdAt: '10/01/2026 09:00' },
      { id: 'h6', actor: 'Trần Thị Bình', action: 'Cập nhật trạng thái', field: 'Trạng thái', oldValue: 'To-do', newValue: 'In-progress', createdAt: '11/01/2026 08:00' },
      { id: 'h7', actor: 'Trần Thị Bình', action: 'Cập nhật trạng thái', field: 'Trạng thái', oldValue: 'In-progress', newValue: 'Review', createdAt: '28/01/2026 16:00' },
      { id: 'h8', actor: 'Hoàng Văn Em', action: 'Cập nhật trạng thái', field: 'Trạng thái', oldValue: 'Review', newValue: 'Done', createdAt: '30/01/2026 11:30' },
    ],
  },
  {
    id: 't3',
    projectId: 'p1',
    title: 'Tích hợp Payment Gateway (VNPAY, MoMo)',
    description: 'Tích hợp các cổng thanh toán phổ biến: VNPAY, MoMo, ZaloPay và thẻ tín dụng. Xử lý callback, webhook, refund và reconciliation. Đảm bảo tuân thủ PCI-DSS.',
    status: 'todo',
    priority: 'critical',
    assigneeId: 'tm2',
    reporterId: 'tm8',
    startDate: '2026-03-20',
    dueDate: '2026-04-05',
    tags: ['Backend', 'Payment', 'Integration'],
    estimatedHours: 80,
    loggedHours: 0,
    attachments: [],
    comments: [
      { id: 'c6', author: 'Bùi Thị Hoa', role: 'PM', content: 'Task này có độ ưu tiên cao nhất, cần hoàn thành trước ngày 5/4. Liên hệ VNPAY để lấy sandbox credentials.', createdAt: '10/03/2026 09:00' },
    ],
    history: [
      { id: 'h9', actor: 'Bùi Thị Hoa', action: 'Tạo công việc', createdAt: '10/03/2026 09:00' },
    ],
  },
  {
    id: 't4',
    projectId: 'p1',
    title: 'Kiểm thử module giỏ hàng',
    description: 'Viết và thực thi test cases cho toàn bộ module giỏ hàng: thêm/xóa sản phẩm, cập nhật số lượng, áp dụng coupon, tính phí ship, và edge cases.',
    status: 'review',
    priority: 'medium',
    assigneeId: 'tm5',
    reporterId: 'tm8',
    startDate: '2026-03-05',
    dueDate: '2026-03-18',
    tags: ['QA', 'Testing'],
    estimatedHours: 32,
    loggedHours: 25,
    attachments: [
      { id: 'a4', name: 'test-cases-cart.xlsx', size: '245 KB', type: 'excel', uploadedBy: 'Hoàng Văn Em', uploadedAt: '08/03/2026' },
    ],
    comments: [
      { id: 'c7', author: 'Hoàng Văn Em', role: 'QA', content: 'Đã hoàn thành 85% test cases. Còn lại phần coupon combination chưa test xong, dự kiến xong ngày mai.', createdAt: '15/03/2026 17:00' },
    ],
    history: [
      { id: 'h10', actor: 'Bùi Thị Hoa', action: 'Tạo công việc', createdAt: '05/03/2026 08:00' },
      { id: 'h11', actor: 'Hoàng Văn Em', action: 'Cập nhật trạng thái', field: 'Trạng thái', oldValue: 'To-do', newValue: 'In-progress', createdAt: '06/03/2026 09:00' },
      { id: 'h12', actor: 'Hoàng Văn Em', action: 'Cập nhật trạng thái', field: 'Trạng thái', oldValue: 'In-progress', newValue: 'Review', createdAt: '15/03/2026 17:00' },
    ],
  },
  {
    id: 't5',
    projectId: 'p1',
    title: 'Setup CI/CD Pipeline Production',
    description: 'Cấu hình CI/CD pipeline hoàn chỉnh trên GitHub Actions: build, test, code coverage, security scan, Docker build và deploy tự động lên Kubernetes production.',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'tm7',
    reporterId: 'tm8',
    startDate: '2026-03-08',
    dueDate: '2026-03-20',
    tags: ['DevOps', 'CI/CD', 'Kubernetes'],
    estimatedHours: 24,
    loggedHours: 16,
    attachments: [],
    comments: [],
    history: [
      { id: 'h13', actor: 'Đặng Văn Quân', action: 'Cập nhật trạng thái', field: 'Trạng thái', oldValue: 'To-do', newValue: 'In-progress', createdAt: '08/03/2026 09:00' },
    ],
  },
  {
    id: 't6',
    projectId: 'p1',
    title: 'Tối ưu Database Query Performance',
    description: 'Phân tích và tối ưu các query chậm trong hệ thống, thêm index phù hợp, cấu hình connection pooling và implement Redis cache cho các query thường xuyên.',
    status: 'in-progress',
    priority: 'medium',
    assigneeId: 'tm2',
    reporterId: 'tm1',
    startDate: '2026-03-10',
    dueDate: '2026-03-22',
    tags: ['Backend', 'Database', 'Performance'],
    estimatedHours: 20,
    loggedHours: 8,
    attachments: [],
    comments: [],
    history: [
      { id: 'h14', actor: 'Trần Thị Bình', action: 'Cập nhật trạng thái', field: 'Trạng thái', oldValue: 'To-do', newValue: 'In-progress', createdAt: '10/03/2026 10:00' },
    ],
  },
  {
    id: 't7',
    projectId: 'p1',
    title: 'Thiết kế UX Checkout Flow',
    description: 'Nghiên cứu và thiết kế luồng checkout tối ưu để tăng tỷ lệ chuyển đổi: 3-step checkout, guest checkout, saved addresses, order review.',
    status: 'done',
    priority: 'high',
    assigneeId: 'tm4',
    reporterId: 'tm8',
    startDate: '2026-01-15',
    dueDate: '2026-02-05',
    tags: ['UX', 'Design'],
    estimatedHours: 30,
    loggedHours: 28,
    attachments: [],
    comments: [],
    history: [
      { id: 'h15', actor: 'Phạm Thị Dung', action: 'Cập nhật trạng thái', field: 'Trạng thái', oldValue: 'In-progress', newValue: 'Done', createdAt: '04/02/2026 16:00' },
    ],
  },
  {
    id: 't8',
    projectId: 'p1',
    title: 'Tích hợp API vận chuyển (GHN, GHTK)',
    description: 'Tích hợp API của Giao Hàng Nhanh và Giao Hàng Tiết Kiệm để tính phí ship, tạo đơn, theo dõi trạng thái giao hàng theo thời gian thực.',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'tm2',
    reporterId: 'tm8',
    startDate: '2026-03-25',
    dueDate: '2026-04-08',
    tags: ['Backend', 'API', 'Logistics'],
    estimatedHours: 40,
    loggedHours: 0,
    attachments: [],
    comments: [],
    history: [
      { id: 'h16', actor: 'Bùi Thị Hoa', action: 'Tạo công việc', createdAt: '10/03/2026 09:00' },
    ],
  },
  // Tasks for project p2
  {
    id: 't9',
    projectId: 'p2',
    title: 'Thiết kế kiến trúc microservices',
    description: 'Thiết kế kiến trúc hệ thống microservices cho ứng dụng mobile banking.',
    status: 'done',
    priority: 'critical',
    assigneeId: 'tm2',
    reporterId: 'tm8',
    startDate: '2026-01-15',
    dueDate: '2026-02-01',
    tags: ['Architecture', 'Backend'],
    estimatedHours: 50,
    loggedHours: 48,
    attachments: [],
    comments: [],
    history: [],
  },
  {
    id: 't10',
    projectId: 'p2',
    title: 'Develop iOS native app screens',
    description: 'Phát triển các màn hình native cho iOS app.',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'tm3',
    reporterId: 'tm8',
    startDate: '2026-02-10',
    dueDate: '2026-03-20',
    tags: ['Mobile', 'iOS'],
    estimatedHours: 80,
    loggedHours: 55,
    attachments: [],
    comments: [],
    history: [],
  },
];

// ===================== DELIVERABLES FOR ACCEPTANCE =====================
export const DELIVERABLES: Record<string, Deliverable[]> = {
  p1: [
    {
      id: 'd1',
      title: 'Source Code & Documentation',
      description: 'Toàn bộ source code frontend và backend, tài liệu kỹ thuật và hướng dẫn deploy.',
      category: 'Technical',
      status: 'delivered',
      deliveredDate: '10/04/2026',
      documents: [
        { id: 'doc1', name: 'source-code-v1.0.zip', size: '125 MB', url: '#' },
        { id: 'doc2', name: 'technical-documentation.pdf', size: '3.2 MB', url: '#' },
        { id: 'doc3', name: 'deployment-guide.pdf', size: '1.1 MB', url: '#' },
      ],
    },
    {
      id: 'd2',
      title: 'Database Schema & Migration Scripts',
      description: 'Schema cơ sở dữ liệu, scripts migration và tài liệu ERD.',
      category: 'Technical',
      status: 'delivered',
      deliveredDate: '10/04/2026',
      documents: [
        { id: 'doc4', name: 'database-schema.sql', size: '450 KB', url: '#' },
        { id: 'doc5', name: 'erd-diagram.pdf', size: '890 KB', url: '#' },
      ],
    },
    {
      id: 'd3',
      title: 'Báo cáo Kiểm thử & UAT',
      description: 'Báo cáo kết quả kiểm thử toàn diện, bao gồm kết quả UAT với người dùng thực.',
      category: 'Quality',
      status: 'delivered',
      deliveredDate: '11/04/2026',
      documents: [
        { id: 'doc6', name: 'uat-report.pdf', size: '2.5 MB', url: '#' },
        { id: 'doc7', name: 'test-cases-summary.xlsx', size: '380 KB', url: '#' },
      ],
    },
    {
      id: 'd4',
      title: 'Hướng dẫn sử dụng (User Manual)',
      description: 'Tài liệu hướng dẫn sử dụng cho admin và end-user, kèm video training.',
      category: 'Training',
      status: 'pending',
      documents: [],
    },
    {
      id: 'd5',
      title: 'Hợp đồng bảo trì & SLA',
      description: 'Hợp đồng bảo trì sau bàn giao, cam kết SLA 24/7 support.',
      category: 'Contract',
      status: 'pending',
      documents: [],
    },
  ],
  p4: [
    {
      id: 'd6',
      title: 'Source Code Portal Nội bộ',
      description: 'Source code hoàn chỉnh của portal nội bộ.',
      category: 'Technical',
      status: 'accepted',
      deliveredDate: '28/02/2026',
      documents: [
        { id: 'doc8', name: 'portal-source-v1.0.zip', size: '45 MB', url: '#' },
      ],
    },
    {
      id: 'd7',
      title: 'Tài liệu kỹ thuật & API docs',
      description: 'Tài liệu kỹ thuật đầy đủ.',
      category: 'Technical',
      status: 'accepted',
      deliveredDate: '28/02/2026',
      documents: [
        { id: 'doc9', name: 'technical-docs.pdf', size: '1.8 MB', url: '#' },
      ],
    },
  ],
};

// ===================== FINANCIAL MODULE DATA =====================

export const COST_CATEGORIES: CostCategory[] = [
  { id: 'cc1', name: 'Nhân sự', projectId: 'p1', amount: 500000000, percentage: 45 },
  { id: 'cc2', name: 'Công nghệ', projectId: 'p1', amount: 300000000, percentage: 27 },
  { id: 'cc3', name: 'Thiết bị', projectId: 'p1', amount: 150000000, percentage: 14 },
  { id: 'cc4', name: 'Khác', projectId: 'p1', amount: 160000000, percentage: 14 },
  { id: 'cc5', name: 'Nhân sự', projectId: 'p2', amount: 400000000, percentage: 50 },
  { id: 'cc6', name: 'Công nghệ', projectId: 'p2', amount: 200000000, percentage: 25 },
  { id: 'cc7', name: 'Thiết bị', projectId: 'p2', amount: 200000000, percentage: 25 },
];

export const EXPENSE_ENTRIES: ExpenseEntry[] = [
  {
    id: 'e1',
    projectId: 'p1',
    category: 'Nhân sự',
    amount: 50000000,
    status: 'approved',
    submittedBy: 'tm1',
    submittedAt: '15/03/2026',
    approvalDate: '16/03/2026',
  },
  {
    id: 'e2',
    projectId: 'p1',
    category: 'Công nghệ',
    amount: 30000000,
    status: 'submitted',
    submittedBy: 'tm2',
    submittedAt: '18/03/2026',
  },
  {
    id: 'e3',
    projectId: 'p2',
    category: 'Thiết bị',
    amount: 25000000,
    status: 'rejected',
    submittedBy: 'tm3',
    submittedAt: '10/03/2026',
    approvalDate: '11/03/2026',
  },
];

export const INVOICES: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2026-001',
    issueDate: '01/03/2026',
    dueDate: '31/03/2026',
    items: [
      { description: 'Phát triển phần mềm', amount: 100000000 },
      { description: 'Thiết kế UI/UX', amount: 50000000 },
    ],
    status: 'paid',
    vendor: 'Công ty TNHH ABC',
    total: 150000000,
  },
  {
    id: 'inv2',
    invoiceNumber: 'INV-2026-002',
    issueDate: '15/03/2026',
    dueDate: '14/04/2026',
    items: [
      { description: 'Server hosting', amount: 20000000 },
    ],
    status: 'sent',
    vendor: 'Viettel Cloud',
    total: 20000000,
  },
];

export const APPROVAL_REQUESTS: ApprovalRequest[] = [
  {
    id: 'ar1',
    type: 'project_start',
    projectId: 'p1',
    amount: 1100000000,
    description: 'Khởi động dự án E-commerce Platform',
    status: 'approved',
    submittedBy: 'tm1',
    submittedAt: '01/03/2026',
    approvedBy: 'admin1',
    approvedAt: '02/03/2026',
  },
  {
    id: 'ar2',
    type: 'expense',
    projectId: 'p1',
    amount: 30000000,
    description: 'Chi phí mua license phần mềm',
    status: 'pending',
    submittedBy: 'tm2',
    submittedAt: '18/03/2026',
  },
  {
    id: 'ar3',
    type: 'expense',
    projectId: 'p2',
    amount: 25000000,
    description: 'Chi phí mua thiết bị test',
    status: 'rejected',
    submittedBy: 'tm3',
    submittedAt: '10/03/2026',
    approvedBy: 'admin1',
    approvedAt: '11/03/2026',
    reason: 'Vượt ngân sách dự kiến',
  },
];

export const RISK_ALERTS: RiskAlert[] = [
  {
    id: 'ra1',
    type: 'budget_overrun',
    projectId: 'p1',
    message: 'Dự án vượt ngân sách 15% so với kế hoạch',
    severity: 'high',
    createdAt: '20/03/2026',
    resolved: false,
  },
  {
    id: 'ra2',
    type: 'delay',
    projectId: 'p2',
    message: 'Milestone "Thiết kế hoàn thành" trễ 5 ngày',
    severity: 'medium',
    createdAt: '18/03/2026',
    resolved: true,
  },
  {
    id: 'ra3',
    type: 'budget_overrun',
    projectId: 'p3',
    message: 'Chi phí nhân sự vượt 10%',
    severity: 'medium',
    createdAt: '15/03/2026',
    resolved: false,
  },
];

// Helper functions
export const getProjectById = (id: string): Project | undefined =>
  PROJECTS.find((p) => p.id === id);

export const getTasksByProject = (projectId: string): Task[] =>
  TASKS.filter((t) => t.projectId === projectId);

export const getTaskById = (id: string): Task | undefined =>
  TASKS.find((t) => t.id === id);

export const getMemberById = (id: string): TeamMember | undefined =>
  TEAM_MEMBERS.find((m) => m.id === id);

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(1)}B`;
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)}M`;
  return amount.toLocaleString('vi-VN');
};

// Financial helper functions
export const getExpensesByProject = (projectId: string): ExpenseEntry[] =>
  EXPENSE_ENTRIES.filter((e) => e.projectId === projectId);

export const getInvoicesByStatus = (status: Invoice['status']): Invoice[] =>
  INVOICES.filter((i) => i.status === status);

export const getApprovalRequestsByStatus = (status: ApprovalRequest['status']): ApprovalRequest[] =>
  APPROVAL_REQUESTS.filter((a) => a.status === status);

export const getRiskAlertsBySeverity = (severity: RiskAlert['severity']): RiskAlert[] =>
  RISK_ALERTS.filter((r) => r.severity === severity);

export const getTotalBudgetVsActual = (projectId: string): { budget: number; actual: number } => {
  const project = getProjectById(projectId);
  const expenses = getExpensesByProject(projectId).filter(e => e.status === 'approved');
  const actual = expenses.reduce((sum, e) => sum + e.amount, 0);
  return { budget: project?.budgetTotal || 0, actual };
};
