import React, { useState, useCallback } from 'react';

interface ImageUploadProps {
    onImagesUploaded: (urls: string[]) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesUploaded }) => {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        setError(null);

        const files = Array.from(e.dataTransfer.files);
        if (files.length === 0) return;

        await uploadFiles(files);
    }, []);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            await uploadFiles(Array.from(e.target.files));
        }
    };

    const uploadFiles = async (files: File[]) => {
        setUploading(true);
        const uploadedUrls: string[] = [];

        try {
            for (const file of files) {
                if (!file.type.startsWith('image/')) {
                    setError('Only image files are allowed.');
                    continue;
                }

                const formData = new FormData();
                formData.append('file', file);

                // Use the ListingController upload endpoint
                // Note: Ensure this matches the backend port and path
                // Use relative path to leverage Vite Proxy or same-origin in production
                const response = await fetch('/api/listings/upload', {
                    method: 'POST',
                    headers: {
                        // 'Content-Type': 'multipart/form-data', // Do NOT set this manually, let fetch handle it
                        // Add Auth Token if needed
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData
                });

                if (response.ok) {
                    const url = await response.text();
                    uploadedUrls.push(url);
                } else {
                    console.error('Upload failed with status:', response.status);
                    setError('Failed to upload some images.');
                }
            }

            if (uploadedUrls.length > 0) {
                onImagesUploaded(uploadedUrls);
            }
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('An unexpected error occurred during upload.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragging ? 'border-rose-500 bg-rose-50' : 'border-gray-300 hover:border-rose-400'
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="file-upload"
                onChange={handleFileSelect}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600 font-medium">
                        {uploading ? 'Uploading...' : 'Drag & drop images or click to browse'}
                    </span>
                    <span className="text-xs text-gray-400">Supported formats: JPEG, PNG</span>
                </div>
            </label>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};
