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
            </Route>
          </Route>

          <Route element={<MainLayout />}>
            {/* Add private user route  */}
            <Route path={RoutePaths.AccountProfile} element={<ProfilePage />} />
            <Route path={RoutePaths.AccountSettings} element={<SetupPage />} />
            <Route path={RoutePaths.AccountChangePassword} element={<ChangePasswordPage />} />
          </Route>
        </Route>
        <Route element={<MainLayout />}>
          {/* Add public route */}
          <Route path={RoutePaths.Home} element={<HomePage />} />
          <Route path={RoutePaths.About} element={<AboutPage />} />
          <Route path={RoutePaths.Document} element={<DocumentCategoryPage />} />
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
