import { auth } from '@edupulse/profile';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { type NavigationRoute, Sidebar } from '../../components/sidebar';
import { TopBar } from '../../components/top-bar';

interface Props {
  children: ReactNode;
}

async function AppLayout({ children }: Props) {
  const pathname = (await headers()).get('x-pathname') as NavigationRoute;

  const session = await auth();
  if (session === null) {
    redirect("/login")
  }

  const user = session.user;

 return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="flex h-screen relative z-10">
        <Sidebar pathname={pathname} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar user={user} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
