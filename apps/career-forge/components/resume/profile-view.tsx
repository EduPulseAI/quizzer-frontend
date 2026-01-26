import { getProfile } from '@edupulse/profile';
import { ReactNode } from 'react';
import AboutCard from './about-card';
import { EducationList } from './education-list';
import { ExperienceList } from './experience-list';
import ProfileClientBoundary from './profile-client-boundary';


interface Props {
  children?: ReactNode;
}

export async function ProfileView(props: Props) {
  const { data: profile } = await getProfile();

  return (
    <ProfileClientBoundary profile={profile}>
      {/* About Information Card */}
      <AboutCard />

      {/* Work Experience List */}
      <ExperienceList />

      {/* Education List */}
      <EducationList />
    </ProfileClientBoundary>
  );
}

export default ProfileView;
