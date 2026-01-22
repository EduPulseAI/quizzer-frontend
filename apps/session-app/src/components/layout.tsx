import Header from "../../components/header";
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export function Layout(props: Props): React.ReactElement {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-obsidian-900 via-crimson-900 to-obsidian-800">
        <Header />
        {props.children}
      </div>
    </main>
  );
}

export default Layout;
