import { notFound } from 'next/navigation';
import SessionClientBoundary from '@edupulse/session/components/session-client-boundary';
import SessionResults from '@edupulse/session/components/session-results';
import { getSession } from '@edupulse/session/lib/actions/get-session-api';
import SessionFeedback from "@edupulse/session/components/session-feedback";
import SessionHeader from "@edupulse/session/components/session-header";
import SessionProgressBar from "@edupulse/session/components/session-progress-bar";
import SessionQuestion from "@edupulse/session/components/session-question";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function SessionPage(props: Props) {
  const sessionId = (await props.params).id;

  const { success, data, error } = await getSession(sessionId);

  if (!success || !data?.session) {
    notFound();
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      {data.isComplete ? (
        <SessionResults data={data} />
      ) : (
        <SessionClientBoundary session={data.session}>
          <SessionProgressBar />
          <SessionHeader />
          <SessionQuestion />
          <SessionFeedback />
        </SessionClientBoundary>
      )}
    </div>
  );
}

export default SessionPage;
