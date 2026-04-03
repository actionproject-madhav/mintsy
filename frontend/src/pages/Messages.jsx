export default function Messages() {
  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-100px)]">
      <div className="bg-primary-accent h-full rounded-xl border border-gray-700 overflow-hidden flex shadow-card">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-700 flex flex-col bg-primary-dark/20">
          <header className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-black">Messages</h1>
          </header>
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div className="space-y-4">
              <p className="text-sm text-gray-500 font-black uppercase tracking-widest">No messages</p>
              <p className="text-xs text-gray-600 italic leading-relaxed">Your conversations with buyers and sellers will appear here.</p>
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col items-center justify-center bg-primary-darker/30">
          <div className="space-y-6 text-center max-w-sm">
            <div className="w-20 h-20 bg-primary-accent rounded-xl mx-auto flex items-center justify-center border border-white/5">
              <span className="text-gray-500 font-bold">...</span>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Select a conversation</h2>
              <p className="text-sm text-gray-light italic">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
