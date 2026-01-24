
import { updatePersonalInfoAction, getProfile, auth } from '@edupulse/profile';
import { Button } from '@feature/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@feature/ui/components/card';
import { Label } from '@feature/ui/components/label';
import { Switch } from '@feature/ui/components/switch';
import { Bell, LogOut, Palette, Shield, User } from 'lucide-react';
import type React from 'react';
import ProfileSettingsContentForm from '../../../components/settings/profile-settings-content-form';

export default async function SettingsPage() {
  const userId = (await auth())?.user?.id || "";
  const { data: profile } = await getProfile(userId);


  const handleLogout = () => {
    // router.push('/login');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2 gradient-text">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Card className="glass-effect card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-400" />
            Profile Settings
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <ProfileSettingsContentForm
          action={updatePersonalInfoAction}
          initialState={profile.personal} />
      </Card>

      <Card className="glass-effect card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Manage your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about your progress
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Job Recommendations</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about matching job opportunities
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">
                Receive weekly progress summaries
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>AI Insights</Label>
              <p className="text-sm text-muted-foreground">
                Get AI-powered career recommendations
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Manage your privacy and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">
                Make your profile visible to recruiters
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security
              </p>
            </div>
            <Switch />
          </div>
          <div className="pt-4">
            <Button variant="outline" className="w-full bg-transparent">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize your app appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Use dark theme (currently enabled)
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-red-500/50 card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <LogOut className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full bg-transparent hover:bg-red-950/20"
            // onClick={handleLogout}
          >
            Log Out
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
