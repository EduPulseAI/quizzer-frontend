import ProfileView from '../../../components/resume/profile-view';
import { ResumePreview } from '../../../components/resume/resume-preview';

export default async function ResumePage() {
  return (
    <div className="h-full bg-background pb-2">
      <div className="max-w-7xl mx-auto p-2 h-full">
        {/* 2-Column Layout */}
        <div className="grid grid-cols-[1fr_2fr] gap-2 h-full overflow-hidden">
          <ProfileView />

          {/* Right Panel: Resume Preview */}
          <div className="lg:sticky  overflow-hidden">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
