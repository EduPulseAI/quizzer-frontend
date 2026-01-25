import { auth } from '@edupulse/profile';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

async function AuthLayout(props: Props) {
  if (await auth() !== null) {
    redirect("/dashboard")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-spin-slow" />
      </div>
      {props.children}
    </div>
  );
}

export default AuthLayout;
