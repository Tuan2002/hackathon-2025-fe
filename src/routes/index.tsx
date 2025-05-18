import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import AuthRoute from './AuthRoute';
import AdminDashboardPage from '@/pages/admin/dashboard/dashboard-page';
import RoutePaths from './routePaths';
import HomePage from '@/pages/home/home-page';
import MangeUserPage from '@/pages/admin/manage-user/manage-user-page';
import LoginPage from '@/pages/auth/login-page';
import RegisterPage from '@/pages/auth/register-page';
import AdminLayout from '@/layouts/AdminLayout';
import ForgotPasswordPage from '@/pages/auth/forgot-password';
import ResetPasswordPage from '@/pages/auth/reset-password';
import MainLayout from '@/layouts/MainLayout';
import AboutPage from '@/pages/home/about-page';
import NewsPage from '@/pages/news/news-page';
import DocumentCategoryPage from '@/pages/document/document-category-page';
import ChangePasswordPage from '@/pages/account/change-password-page';
import SetupPage from '@/pages/account/setup-page';
import ProfilePage from '@/pages/account/profile-page';
import ManageCategoryPage from '@/pages/admin/manage-category/manage-category-page';
import ManagePublisherPage from '@/pages/admin/manage-publisher/manage-publisher-page';
import ManageAuthorPage from '@/pages/admin/manage-author/manage-author-page';
import ManageDocumentPage from '@/pages/admin/manage-document/manage-document-page';
import ManageSeedDataPage from '@/pages/admin/manage-seed-data/manage-seed-data-page';
import MyDocumentPage from '@/pages/my-document/my-document-page';
import DownloadDocumentPage from '@/pages/my-document/download-document-page';
import UploadDocumentPage from '@/pages/my-document/upload-document-page';
import PendingDocumentPage from '@/pages/my-document/pending-document-page';
import SaveDocumentPage from '@/pages/my-document/saved-document-page';
import DocumentDetailPage from '@/pages/document/document-detail-page';
import ManageFeedbackPage from '@/pages/admin/manage-feedback/manage-feedback-page';
import ManageContactPage from '@/pages/admin/manage-contact/manage-contact-page';
import HistoryTransactionPage from '@/pages/account/history-transaction-page';
import DepositPointPage from '@/pages/account/deposit-point-page';
import DepositSuccessPage from '@/pages/account/deposit-success-page';
import DepositErrorPage from '@/pages/account/deposit-error-page';
import ManageMenuPage from '@/pages/admin/manage-menu/manage-menu';

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              {/* Add admin route */}
              <Route path={RoutePaths.AdminDashboard} element={<AdminDashboardPage />} />
              <Route path={RoutePaths.ManageUser} element={<MangeUserPage />} />
              <Route path={RoutePaths.ManageCategory} element={<ManageCategoryPage />} />
              <Route path={RoutePaths.ManagePublisher} element={<ManagePublisherPage />} />
              <Route path={RoutePaths.ManageAuthor} element={<ManageAuthorPage />} />
              <Route path={RoutePaths.ManageDocument} element={<ManageDocumentPage />} />
              <Route path={RoutePaths.ManageSeedData} element={<ManageSeedDataPage />} />
              <Route path={RoutePaths.ManageFeedback} element={<ManageFeedbackPage />} />
              <Route path={RoutePaths.ManageContact} element={<ManageContactPage />} />
              <Route path={RoutePaths.ManageMenu} element={<ManageMenuPage />} />
            </Route>
          </Route>

          <Route element={<MainLayout />}>
            {/* Add private user route  */}
            <Route path={RoutePaths.AccountProfile} element={<ProfilePage />} />
            <Route path={RoutePaths.AccountSettings} element={<SetupPage />} />
            <Route path={RoutePaths.AccountChangePassword} element={<ChangePasswordPage />} />
            <Route
              path={RoutePaths.AccountHistoryTransaction}
              element={<HistoryTransactionPage />}
            />
            <Route path={RoutePaths.AccountDepositPoint} element={<DepositPointPage />} />
            <Route path={RoutePaths.AccountDepositSuccess} element={<DepositSuccessPage />} />
            <Route path={RoutePaths.AccountDepositError} element={<DepositErrorPage />} />
            <Route path={RoutePaths.MyDocuments} element={<MyDocumentPage />} />
            <Route path={RoutePaths.MyDownloadDocuments} element={<DownloadDocumentPage />} />
            <Route path={RoutePaths.UploadDocument} element={<UploadDocumentPage />} />
            <Route path={RoutePaths.UpdateDocument} element={<UploadDocumentPage />} />
            <Route path={RoutePaths.MyPendingDocuments} element={<PendingDocumentPage />} />
            <Route path={RoutePaths.MySavedDocuments} element={<SaveDocumentPage />} />
          </Route>
        </Route>
        <Route element={<MainLayout />}>
          {/* Add public route */}
          <Route path={RoutePaths.Home} element={<HomePage />} />
          <Route path={RoutePaths.About} element={<AboutPage />} />
          <Route path={RoutePaths.Document} element={<DocumentCategoryPage />} />
          <Route path={RoutePaths.CategoryDocuments} element={<DocumentCategoryPage />} />
          <Route path={RoutePaths.DocumentDetail} element={<DocumentDetailPage />} />
          <Route path={RoutePaths.News} element={<NewsPage />} />
        </Route>

        <Route element={<AuthRoute />}>
          {/* Add auth route */}
          <Route path={RoutePaths.Login} element={<LoginPage />} />
          <Route path={RoutePaths.Signup} element={<RegisterPage />} />
          <Route path={RoutePaths.ForgotPassword} element={<ForgotPasswordPage />} />
          <Route path={RoutePaths.ResetPassword} element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoute;
