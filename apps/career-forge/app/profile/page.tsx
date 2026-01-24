import { auth } from "@edupulse/profile";
import { notFound, redirect } from 'next/navigation';

interface Props {
  params: Promise<{}>;
  searchParams: Promise<{}>;
}

async function ProfileRootPage(props: Props) {
  const session = await auth();
  if (session === null || session.user === undefined) {
    notFound();
  }

  redirect("/profile/" + session.user.id)
}

export default ProfileRootPage;
