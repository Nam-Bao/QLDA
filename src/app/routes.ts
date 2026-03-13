import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Tasks } from './pages/Tasks';
import { Team } from './pages/Team';
import { Reports } from './pages/Reports';
import { Documents } from './pages/Documents';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import UserManagement from './pages/admin/UserManagement';
import RoleManagement from './pages/admin/RoleManagement';
import SystemLogs from './pages/admin/SystemLogs';
import BackupRestore from './pages/admin/BackupRestore';
import CategoryManagement from './pages/admin/CategoryManagement';

// PM Module
import ProjectDetail from './pages/projects/ProjectDetail';
import TaskBoard from './pages/projects/TaskBoard';
import TaskDetail from './pages/projects/TaskDetail';
import ResourceManagement from './pages/projects/ResourceManagement';
import Acceptance from './pages/projects/Acceptance';

// Financial Module
import FinancialOverview from './pages/financial/FinancialOverview';
import BudgetManagement from './pages/financial/BudgetManagement';
import InvoiceManagement from './pages/financial/InvoiceManagement';
import ExpenseApproval from './pages/financial/ExpenseApproval';
import RiskAlerts from './pages/financial/RiskAlerts';

export const router = createBrowserRouter([
  { path: '/login', Component: Login },
  { path: '/forgot-password', Component: ForgotPassword },
  {
    // PrivateRoute guards all app content – redirects to /login if not authenticated
    Component: PrivateRoute,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          { index: true, Component: Dashboard },

          // Project Management Module
          { path: 'projects', Component: Projects },
          { path: 'projects/:id', Component: ProjectDetail },
          { path: 'projects/:id/tasks', Component: TaskBoard },
          { path: 'projects/:id/acceptance', Component: Acceptance },

          // Task Management
          { path: 'tasks', Component: Tasks },
          { path: 'tasks/:id', Component: TaskDetail },

          // Resource & Team
          { path: 'resources', Component: ResourceManagement },

          // Team, Reports, Documents, Settings
          { path: 'team', Component: Team },
          { path: 'reports', Component: Reports },
          { path: 'documents', Component: Documents },
          { path: 'settings', Component: Settings },

          // Common UI
          { path: 'profile', Component: Profile },
          { path: 'notifications', Component: Notifications },

          // Admin Module
          { path: 'admin/users', Component: UserManagement },
          { path: 'admin/roles', Component: RoleManagement },
          { path: 'admin/categories', Component: CategoryManagement },
          { path: 'admin/logs', Component: SystemLogs },
          { path: 'admin/backup', Component: BackupRestore },

          // Financial Module
          { path: 'financial', Component: FinancialOverview },
          { path: 'financial/budget', Component: BudgetManagement },
          { path: 'financial/invoices', Component: InvoiceManagement },
          { path: 'financial/approvals', Component: ExpenseApproval },
          { path: 'financial/risks', Component: RiskAlerts },
        ],
      },
    ],
  },
  { path: '*', Component: NotFound },
]);
