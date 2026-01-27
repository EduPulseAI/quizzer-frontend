import { getProfile } from '@edupulse/profile';
import ProfileClientBoundary from './profile-client-boundary';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@feature/ui/components/card';
import { Button } from '@feature/ui/components/button';
import { MessageSquare, Upload } from 'lucide-react';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';
import ProfileAccordion from './profile-accordion';

export async function ProfileView() {
  const { data: profile } = await getProfile();

  return (
    <ProfileClientBoundary profile={profile}>
      <div className="glass-effect flex flex-col h-full !py-0 !gap-0">
        {/* <CardHeader className="flex-shrink-0 border-b border-border py-4 px-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                AI Resume Assistant
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Build your profile with AI assistance
              </p>
            </div>
            <label htmlFor="resume-upload">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer bg-transparent"
                asChild
              >
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </span>
              </Button>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
            </label>
          </div>
        </CardHeader> */}
        <div className="flex-1 flex flex-col p-0">
          {/* Scrollable area: Accordion + Messages */}
          <div className="flex-1">
            {/* Accordion */}
            <div className="border-b border-border p-4">
              <ProfileAccordion />
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
