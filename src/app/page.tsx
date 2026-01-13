import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to dashboard, the layout will handle auth check and redirect to login if needed.
  redirect('/dashboard');
}
