import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppStateProvider } from '@/context/AppState'
import { ToastStack } from '@/components/Toast'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { AppShell } from '@/layouts/AppShell'
import { AdminShell } from '@/layouts/AdminShell'
import { MarketingHomePage } from '@/pages/marketing/MarketingHomePage'
import { VenuesPage } from '@/pages/marketing/VenuesPage'
import { PrivacyPage } from '@/pages/marketing/PrivacyPage'
import { TermsPage } from '@/pages/marketing/TermsPage'
import { OnboardingPage } from '@/pages/app/OnboardingPage'
import { LoginPage } from '@/pages/app/LoginPage'
import { SignupPage } from '@/pages/app/SignupPage'
import { HomeFeedPage } from '@/pages/app/HomeFeedPage'
import { ActivityPage } from '@/pages/app/ActivityPage'
import { MapPage } from '@/pages/app/MapPage'
import { CommunityPage } from '@/pages/app/CommunityPage'
import { ProfilePage } from '@/pages/app/ProfilePage'
import { EventDetailPage } from '@/pages/app/EventDetailPage'
import { SettingsPage } from '@/pages/app/SettingsPage'
import { NotificationsSettingsPage } from '@/pages/app/NotificationsSettingsPage'
import { FaqPage } from '@/pages/app/FaqPage'
import { HostDashboardPage } from '@/pages/app/HostDashboardPage'
import { HostCreatePage } from '@/pages/app/HostCreatePage'
import { VerifyPhotoPage } from '@/pages/app/VerifyPhotoPage'
import {
  AccountSettingsPage,
  AppNotificationsPage,
  PastEventsPage,
  PreferencesPage,
  PrivacySettingsPage,
  SavedEventsPage,
} from '@/pages/app/SettingsSubpages'
import {
  AdminAnnouncementsPage,
  AdminDashboardPage,
  AdminEventsPage,
  AdminModerationPage,
  AdminRolesPage,
  AdminSafetyPage,
  AdminUsersPage,
  AdminVenuesPage,
  AdminVerificationPage,
} from '@/pages/admin/AdminPages'

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <ToastStack />
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route index element={<MarketingHomePage />} />
            <Route path="venues" element={<VenuesPage />} />
            <Route path="privacy-policy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>

          <Route path="app" element={<AppShell />}>
            <Route index element={<OnboardingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="home" element={<HomeFeedPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="notifications" element={<AppNotificationsPage />} />
            <Route path="event/:id" element={<EventDetailPage />} />
            <Route path="event/:id/verify" element={<VerifyPhotoPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="settings/account" element={<AccountSettingsPage />} />
            <Route path="settings/privacy" element={<PrivacySettingsPage />} />
            <Route path="settings/saved" element={<SavedEventsPage />} />
            <Route path="settings/past" element={<PastEventsPage />} />
            <Route path="settings/preferences" element={<PreferencesPage />} />
            <Route
              path="settings/notifications"
              element={<NotificationsSettingsPage />}
            />
            <Route path="settings/faq" element={<FaqPage />} />
            <Route path="host" element={<HostDashboardPage />} />
            <Route path="host/create" element={<HostCreatePage />} />
          </Route>

          <Route path="admin" element={<AdminShell />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="venues" element={<AdminVenuesPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="moderation" element={<AdminModerationPage />} />
            <Route path="verification" element={<AdminVerificationPage />} />
            <Route path="safety" element={<AdminSafetyPage />} />
            <Route path="announcements" element={<AdminAnnouncementsPage />} />
            <Route path="roles" element={<AdminRolesPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  )
}
