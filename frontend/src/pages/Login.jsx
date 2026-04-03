import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';

export default function Login() {
  const { user, loading } = useAuth();

  if (!loading && user) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/90 bg-white/90 p-8 shadow-glass backdrop-blur-xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Sign in</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Use your Google account. We create your Mintsy profile on first sign-in.
        </p>
        <div className="mt-8">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}
