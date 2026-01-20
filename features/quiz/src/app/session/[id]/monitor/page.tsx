interface Props {
  params: Promise<{}>;
  searchParams: Promise<{}>;
}

async function SessionMonitorPage(props: Props) {
  const params = await props.params;

  return <>SessionMonitor Page</>;
}

export default SessionMonitorPage;
