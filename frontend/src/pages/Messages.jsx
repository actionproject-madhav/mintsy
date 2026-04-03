import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as messageService from '../services/messageService';

export default function Messages() {
  const { user, loading: authLoading } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoadError(null);
      try {
        const list = await messageService.getConversations();
        if (!cancelled) setConversations(Array.isArray(list) ? list : []);
      } catch (e) {
        if (!cancelled) {
          setLoadError(
            e?.response?.data?.message || e?.message || 'Could not load conversations.'
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center text-zinc-600">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: '/messages' }} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-100px)]">
      <div className="bg-primary-accent h-full rounded-xl border border-gray-700 overflow-hidden flex shadow-card">
        <div className="w-80 border-r border-gray-700 flex flex-col bg-primary-dark/20">
          <header className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-black">Messages</h1>
          </header>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {loadError && (
              <p className="text-sm text-red-400" role="alert">
                {loadError}
              </p>
            )}
            {!loadError && conversations.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-sm text-gray-500 font-black uppercase tracking-widest">
                  No messages
                </p>
                <p className="text-xs text-gray-600 italic leading-relaxed mt-2">
                  Your conversations with buyers and sellers will appear here.
                </p>
              </div>
            )}
            {conversations.map((c) => (
              <div
                key={c._id}
                className="rounded-lg border border-white/5 bg-primary-dark/30 p-3 text-left text-sm"
              >
                <p className="font-semibold text-white truncate">
                  {c.listing?.title || 'Listing'}
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {c.lastMessageAt
                    ? new Date(c.lastMessageAt).toLocaleString()
                    : 'No activity'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-primary-darker/30">
          <div className="space-y-6 text-center max-w-sm">
            <div className="w-20 h-20 bg-primary-accent rounded-xl mx-auto flex items-center justify-center border border-white/5">
              <span className="text-gray-500 font-bold">…</span>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Select a conversation</h2>
              <p className="text-sm text-gray-light italic">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
