import SessionFeedback from '@edupulse/session/components/session-feedback';
import SessionHeader from '@edupulse/session/components/session-header';
import SessionOptions from '@edupulse/session/components/session-options';
import SessionResults from '@edupulse/session/components/session-results';
import { getSession } from "@edupulse/session/lib/actions/get-session-api";
import SessionContextProvider from '@edupulse/session/stores/use-session-context';
import { SessionMonitor } from "@edupulse/sse/components/session-monitor";


interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{}>;
}

async function SessionPage(props: Props) {
  const sessionId = (await props.params).id;

  const { data } = await getSession(sessionId);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      {data.isComplete ? (
        <SessionResults data={data} />
      ) : (
        <SessionContextProvider session={data.session}>
          <SessionHeader />
          <SessionOptions />
          <SessionFeedback />
        </SessionContextProvider>
      )}
    </div>
  );
}

export default SessionPage;
