import { auth } from "@edupulse/profile"
import { redirect } from "next/navigation"

export default async function HomePage() {
  // In a real app, check auth status here
  const session = await auth();
  // For now, redirect to login
  if (session !== null) {
    redirect("/dashboard")
  } else {
    redirect("/login")
  }
}
