const RoutePaths = {
  Home: '/',
  About: '/about',
  Contact: '/contact',
  Settings: '/settings',
  NotFound: '*',
  Document: '/tai-lieu',
  CategoryDocuments: '/tai-lieu/:categorySlug',
  DocumentDetail: '/tai-lieu/:categorySlug/:documentSlug',
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
  AccountHistoryTransaction: '/history-transaction',
  AccountDepositPoint: '/deposit',
  AccountDepositSuccess: '/deposit-success',
  AccountDepositError: '/deposit-error',

  // Admin Routes
  AdminDashboard: '/admin/dashboard',
  ManageUser: '/admin/manage-user',
  ManageCategory: '/admin/manage-category',
  ManagePublisher: '/admin/manage-publisher',
  ManageAuthor: '/admin/manage-author',
  ManageDocument: '/admin/manage-document',
  ManageSeedData: '/admin/manage-seed-data',
  ManageFeedback: '/admin/manage-feedback',
  ManageContact: '/admin/manage-contact',

  // User Routes
  MyDocuments: '/my-documents',
  MyDownloadDocuments: '/download-documents',
  UploadDocument: '/upload-document',
  UpdateDocument: '/upload-document/:documentId',
  MyPendingDocuments: '/pending-documents',
  MySavedDocuments: '/favorite-documents',
} as const;

export default RoutePaths;
