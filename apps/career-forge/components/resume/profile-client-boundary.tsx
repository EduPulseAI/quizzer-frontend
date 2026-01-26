'use client';

import { useProfileStore, type Profile } from '@edupulse/profile';
import { ReactNode, useEffect } from 'react';

interface Props {
  profile: Profile;
  children: ReactNode;
}

export function ProfileClientBoundary({ profile, children }: Props) {
  const  { initializeProfile } = useProfileStore();

  useEffect(() => {
      initializeProfile(profile);
  }, [profile, initializeProfile])

  /* Other helpful actions later */

  return (
    <div className="space-y-6">
      {children}
    </div>
  );
}

export default ProfileClientBoundary;
