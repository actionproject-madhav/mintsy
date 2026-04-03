import { useState, useRef } from 'react';
import * as cloudinaryService from '../../services/cloudinaryService';

export default function ImageUpload({ images, setImages }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 6) {
      alert('Maximum 6 images allowed');
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = files.map(file => cloudinaryService.uploadImage(file));
      const uploadedImages = await Promise.all(uploadPromises);
      setImages([...images, ...uploadedImages]);
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (publicId) => {
    setImages(images.filter(img => img.publicId !== publicId));
  };

  const setMainImage = (publicId) => {
    setImages(images.map(img => ({
      ...img,
      isMain: img.publicId === publicId
    })));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.publicId} className="relative aspect-square rounded-lg overflow-hidden group">
            <img src={img.url} alt="Listing" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <button 
                type="button"
                onClick={() => setMainImage(img.publicId)}
                className={`text-[10px] px-2 py-1 rounded ${img.isMain ? 'bg-gold text-primary' : 'bg-white text-black'}`}
              >
                {img.isMain ? 'Main' : 'Set Main'}
              </button>
              <button 
                type="button"
                onClick={() => removeImage(img.publicId)}
                className="text-red-400 text-xs hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        {images.length < 6 && (
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
            className="aspect-square border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-gold hover:text-gold transition-colors text-gray-light"
          >
            {uploading ? (
              <span className="animate-spin text-2xl">⏳</span>
            ) : (
              <>
                <span className="text-2xl">📷</span>
                <span className="text-xs">Add Photo</span>
              </>
            )}
          </button>
        )}
      </div>
      <input 
        type="file" 
        multiple 
        hidden 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*"
      />
      <p className="text-[10px] text-gray-light italic">Max 6 photos. First photo is used as cover by default.</p>
    </div>
  );
}
