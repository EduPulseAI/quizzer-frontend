import { SessionMonitor } from "@edupulse/sse/components/session-monitor";

interface Props {
  params: Promise<{ studentId: string; sessionId: string; }>;
  searchParams: Promise<{}>;
}

async function SessionMonitorPage(props: Props) {
  const params = await props.params;

  return <SessionMonitor { ...params} />;
}

export default SessionMonitorPage;
