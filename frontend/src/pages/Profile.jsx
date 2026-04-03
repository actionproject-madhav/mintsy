import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as authService from '../services/authService';

export default function Profile() {
  const { user, logout, applyServerUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: { city: '', state: '' },
    isStudent: false,
    college: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setFormData({
      name: user.name || '',
      email: user.email || '',
      bio: user.bio || '',
      location: {
        city: user.location?.city || '',
        state: user.location?.state || '',
      },
      isStudent: Boolean(user.isStudent),
      college: user.studentCollegeName || '',
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      const updated = await authService.patchProfile({
        name: formData.name.trim(),
        bio: formData.bio,
        location: {
          city: formData.location.city,
          state: formData.location.state,
        },
        isStudent: formData.isStudent,
        studentCollegeName: formData.college,
      });
      applyServerUser(updated);
      setMessage('Profile saved.');
    } catch (err) {
      const msg =
        typeof err?.response?.data?.message === 'string'
          ? err.response.data.message
          : 'Could not save profile. Try again.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <div className="text-center py-20 italic">Please login to view profile</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black">Profile</h1>
          <p className="text-gray-light italic">Manage your account information</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-red-400 hover:text-red-300 font-bold border border-red-400/20 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </header>

      {message && (
        <p className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-primary-accent p-8 rounded-2xl border border-gray-700">
          <div className="flex items-center gap-6 mb-8">
            <img
              src={user.profilePicture || '/images/placeholders/no-image.svg'}
              alt=""
              className="w-24 h-24 rounded-full border-4 border-primary object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-light">{user.email}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.isPremium ? 'bg-gold text-primary' : 'bg-primary text-white'}`}
              >
                {user.isPremium ? 'Premium Member' : 'Standard Account'}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="input-field opacity-70 cursor-not-allowed" value={formData.email} readOnly title="Email is managed by your Google account" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location (City)</label>
              <input
                type="text"
                className="input-field"
                value={formData.location.city}
                onChange={(e) =>
                  setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                className="input-field"
                value={formData.location.state}
                onChange={(e) =>
                  setFormData({ ...formData, location: { ...formData.location, state: e.target.value } })
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                className="input-field h-24"
                placeholder="Tell buyers about yourself..."
                value={formData.bio}
                maxLength={500}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="bg-primary-accent p-8 rounded-xl border border-gray-700 shadow-card">
          <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-gold pb-2 border-b border-white/5">
            Student Verification
          </h3>
          <div className="space-y-6">
            <label className="flex items-center gap-4 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="w-6 h-6 rounded border-2 border-gray-600 bg-transparent checked:bg-gold checked:border-gold transition-all cursor-pointer appearance-none"
                  checked={formData.isStudent}
                  onChange={(e) => setFormData({ ...formData, isStudent: e.target.checked })}
                />
                {formData.isStudent && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-2.5 h-2.5 bg-primary rounded-sm" />
                  </div>
                )}
              </div>
              <span className="font-bold text-lg">I am a current college student</span>
            </label>
            <p className="text-sm text-gray-light leading-relaxed">
              Add your college to access the exclusive student marketplace and connect with fellow students on campus.
            </p>
            {formData.isStudent && (
              <input
                type="text"
                placeholder="Your University / College Name"
                className="input-field py-4"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              />
            )}
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-gold w-full py-4 text-lg font-black shadow-xl disabled:opacity-60">
          {saving ? 'Saving…' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
}
