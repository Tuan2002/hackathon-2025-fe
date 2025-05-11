const RoutePaths = {
  Home: '/',
  About: '/about',
  Contact: '/contact',
  Settings: '/settings',
  NotFound: '*',
  Document: '/document',
  News: '/news',

  // Auth Routes
  Login: '/login',
  Signup: '/signup',
  ForgotPassword: '/forgot-password',
  ResetPassword: '/reset-password',

  // Account Routes
  AccountProfile: '/account/profile',
  AccountSettings: '/account/settings',
  AccountChangePassword: '/account/change-password',

  // Admin Routes
  AdminDashboard: '/admin/dashboard',
  ManageUser: '/admin/manage-user',

  // User Routes
} as const;

export default RoutePaths;
