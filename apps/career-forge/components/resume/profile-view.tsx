import { getProfile } from '@edupulse/profile/server';
import ProfileClientBoundary from './profile-client-boundary';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@feature/ui/components/card';
import { Button } from '@feature/ui/components/button';
import { MessageSquare, Upload } from 'lucide-react';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';
import ProfileAccordion from './profile-accordion';
import UploadDropzone from './upload/upload-dropzone';

export async function ProfileView() {
  const { data: profile, error } = await getProfile();

  if (error) {
    console.log("ProfileView#getProfile", { error })
  }

  return (
    <ProfileClientBoundary profile={profile}>
      <div className="glass-effect flex flex-col h-full !py-0 !gap-0">
        
        <div className="flex-1 flex flex-col p-0">
          {/* Scrollable area: Accordion + Messages */}
          <div className="flex-1">
            {/* Accordion */}
            <div className="border-b border-border p-4">
              <ProfileAccordion />
              <UploadDropzone />
            </div>
            {/* Messages */}
            {/* <ChatMessages /> */}
          </div>
          {/* Input - fixed at bottom */}
          <ChatInput />
        </div>
      </div>
    </ProfileClientBoundary>
  );
}

export default ProfileView;
