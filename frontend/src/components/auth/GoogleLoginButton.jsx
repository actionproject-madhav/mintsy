import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';

function formatLoginError(error) {
  const msg = error?.response?.data?.message;
  if (typeof msg === 'string' && msg.trim()) return msg;
  if (error?.message === 'Network Error') {
    return 'Cannot reach the API. Check that the backend is running and VITE_API_URL in .env.local matches it (e.g. http://localhost:5001/api).';
  }
  return error?.message || 'Sign-in failed. Try again or check the browser console.';
}

export default function GoogleLoginButton() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSuccess = async (credentialResponse) => {
    setError(null);
    try {
      await login(credentialResponse.credential);
      navigate('/profile', { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      setError(formatLoginError(err));
    }
  };

  const handleError = () => {
    console.error('Google Login Error');
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="filled_blue"
        shape="pill"
      />
      {error && (
        <p className="text-left text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
