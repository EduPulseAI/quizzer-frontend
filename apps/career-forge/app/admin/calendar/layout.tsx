import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

async function CalendarLayout(props: Props) {
  return <>{props.children}</>;
}

export default CalendarLayout;
