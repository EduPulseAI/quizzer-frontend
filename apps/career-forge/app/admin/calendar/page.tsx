import CalendarHeader from "@edupulse/calendar/components/header";
import CalendarContent from "@edupulse/calendar/components/calendar-content";

interface Props {
  params: Promise<{}>;
  searchParams: Promise<{}>;
}

async function CalendarPage(props: Props) {
  const params = await props.params;

  return (
    <div  className="flex h-screen flex-col bg-background">
      <CalendarHeader />
      <main className="flex-1 overflow-hidden">
        <CalendarContent />
      </main>
    </div>
  );
}

export default CalendarPage;
