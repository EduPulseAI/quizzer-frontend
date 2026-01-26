'use client';

import { About, useProfileStore } from '@edupulse/profile';
import { Card, CardContent, CardHeader, CardTitle } from '@feature/ui/components/card';
import { Input } from '@feature/ui/components/input';
import { Textarea } from '@feature/ui/components/textarea';
import { FileText } from 'lucide-react';
import { ReactNode } from 'react';


export function AboutCard() {
  const { profile } = useProfileStore()
  return (
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
              defaultValue={profile.personal?.firstName || ''}
              className="bg-background/50"
              readOnly
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input
              placeholder="Doe"
              defaultValue={profile.personal?.lastName || ''}
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
            defaultValue={profile.personal?.email || ''}
            className="bg-background/50"
            readOnly
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <Input
            type="tel"
            placeholder="+1 (555) 000-0000"
            defaultValue={profile.personal?.phone || ''}
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
            defaultValue={profile.about?.bio || ''}
            className="min-h-24 bg-background/50"
            readOnly
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Edit personal information in your profile settings
        </p>
      </CardContent>
    </Card>
  );
}

export default AboutCard;
