import { ReactNode } from 'react';
import { ScrollProgressIndicator } from '../../../components/profile/scroll-progress-indicator';
import { AnimationProvider } from '../../../contexts/animation-context';

import "./styles.css"

interface Props {
  children: ReactNode;
}

async function ProfileLayout(props: Props) {
  return (
    <AnimationProvider>
      <ScrollProgressIndicator />
      {props.children}
    </AnimationProvider>
  );
}

export default ProfileLayout;
