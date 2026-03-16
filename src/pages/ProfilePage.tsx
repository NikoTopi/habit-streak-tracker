import { useState, useRef } from 'react';
import { useProfileContext } from '../context/ProfileContext';

export function ProfilePage() {
  const { profile, updateName, uploadAvatar, removeAvatar } = useProfileContext();
  const [name, setName] = useState(profile.name);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleNameSave() {
    updateName(name.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleFile(file: File) {
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, GIF, WebP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10 MB.');
      return;
    }
    setUploading(true);
    try {
      await uploadAvatar(file);
    } catch {
      setError('Failed to process image. Please try another file.');
    } finally {
      setUploading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const initials = (profile.name || 'U')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>

      {/* Avatar section */}
      <div className="mb-8 flex flex-col items-center gap-4">
        {/* Avatar display */}
        <div className="relative">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="Profile"
              className="h-28 w-28 rounded-2xl object-cover shadow-lg ring-4 ring-white dark:ring-gray-800"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 text-3xl font-bold text-white shadow-lg ring-4 ring-white dark:ring-gray-800">
              {initials}
            </div>
          )}

          {/* Camera overlay button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-600 text-gray-500 hover:text-indigo-600 transition-colors"
            aria-label="Upload photo"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {profile.avatar && (
          <button
            onClick={removeAvatar}
            className="text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            Remove photo
          </button>
        )}
      </div>

      {/* Drag-and-drop upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`mb-6 flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 transition-all ${
          dragging
            ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
            <p className="text-sm text-gray-500">Processing…</p>
          </div>
        ) : (
          <>
            <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              dragging ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
            }`}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {dragging ? 'Drop your photo here' : 'Upload a profile photo'}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">Drag & drop or click · JPG, PNG, GIF, WebP · max 10 MB</p>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 px-4 py-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* Name field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Display name</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setSaved(false); }}
            onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
            placeholder="Your name"
            className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleNameSave}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            {saved ? '✓ Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
