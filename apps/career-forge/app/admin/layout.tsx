import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

async function AdminLayout(props: Props) {
  //  verify admin role

  
  return <>{props.children}</>;
}

export default AdminLayout;
