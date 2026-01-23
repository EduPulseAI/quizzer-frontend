
import { auth } from '@edupulse/profile';
import { getRecentSessions } from '@edupulse/session';
import { ReactNode } from 'react';
import RecentSessionInfo from "./recent-session-info"

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export async function RecentSessionsCardContent(props: Props) {
  const session = await auth();
  const userId = session?.user?.id ?? "";
  const { success, data, error } = await getRecentSessions(userId);

  if (!success || error) {
    console.log("RecentSessionsCardContent#error", error);
  }
  return (
    <div className="space-y-4">
      {data.map((session) => (
        <RecentSessionInfo
          key={session.id}
          session={session}
        />
      ))}
    </div>
  );
}

export default RecentSessionsCardContent;
