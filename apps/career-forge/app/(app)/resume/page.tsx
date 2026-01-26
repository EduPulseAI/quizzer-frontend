import { Button } from '@feature/ui/components/button';
import ProfileView from 'apps/career-forge/components/resume/profile-view';
import { Download, Upload } from 'lucide-react';
import { ProfileChatPanel } from '../../../components/resume/profile-chat-panel';
import { ResumePreview } from '../../../components/resume/resume-preview';

export default async function ResumePage() {

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
          <ProfileView />

          {/* Resume Preview */}
          <div className="lg:sticky lg:top-6 h-fit">
            <ResumePreview />
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
