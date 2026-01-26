import { getProfile } from '@edupulse/profile';
import { Button } from '@feature/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@feature/ui/components/card';
import { Input } from '@feature/ui/components/input';
import { Textarea } from '@feature/ui/components/textarea';
import { Download, FileText, Upload } from 'lucide-react';
import { ExperienceList } from '../../../components/resume/experience-list';
import { EducationList } from '../../../components/resume/education-list';
import { ResumePreview } from '../../../components/resume/resume-preview';
import { ProfileChatPanel } from '../../../components/resume/profile-chat-panel';

export default async function ResumePage() {
  const { data: profile } = await getProfile();

  const { personal, about, experience, credentials } = profile;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 gradient-text">
              Resume Builder
            </h1>
            <p className="text-muted-foreground">
              Create and customize your professional resume
            </p>
          </div>
          <div className="flex gap-2">
            <label htmlFor="resume-upload">
              <Button
                disabled={true}
                variant="outline"
                className="cursor-pointer bg-transparent"
                asChild
              >
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resume
                </span>
              </Button>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
            </label>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/30 card-hover">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            {/* Personal Information Card */}
            <Card className="glass-effect card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input
                      placeholder="John"
                      defaultValue={personal?.firstName || ''}
                      className="bg-background/50"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input
                      placeholder="Doe"
                      defaultValue={personal?.lastName || ''}
                      className="bg-background/50"
                      readOnly
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    defaultValue={personal?.email || ''}
                    className="bg-background/50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    defaultValue={personal?.phone || ''}
                    className="bg-background/50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Professional Summary
                  </label>
                  <Textarea
                    placeholder="Brief summary of your experience..."
                    defaultValue={about?.bio || ''}
                    className="min-h-24 bg-background/50"
                    readOnly
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Edit personal information in your profile settings
                </p>
              </CardContent>
            </Card>

            {/* Work Experience List */}
            <ExperienceList experiences={experience || []} />

            {/* Education List */}
            <EducationList education={credentials?.education || []} />
          </div>

          {/* Resume Preview */}
          <div className="lg:sticky lg:top-6 h-fit">
            <ResumePreview profile={profile} />
          </div>

          {/* AI Chat Panel */}
          <div className="lg:sticky lg:top-6 h-fit">
            <ProfileChatPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
