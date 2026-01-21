import { getSession } from "@edupulse/session/lib/actions/get-session-api";
import { SessionMonitor } from "@edupulse/sse/components/session-monitor";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{}>;
}

async function SessionMonitorPage(props: Props) {
  const sessionId = (await props.params).id;

  const { data } = await getSession(sessionId);

  return <SessionMonitor
    sessionId={sessionId}
    studentId={data.session.studentId}
  />;
}

export default SessionMonitorPage;
