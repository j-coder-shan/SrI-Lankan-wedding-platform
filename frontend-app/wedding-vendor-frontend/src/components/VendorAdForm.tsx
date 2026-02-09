import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type VendorAdFormData = {
    title: string;
    category: 'Saloon' | 'Dress Maker' | 'Hotel' | 'Photographer';
    price: number;
    description: string;
    features: string;
};

export default function VendorAdForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<VendorAdFormData>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Form submission handler
    const onSubmit = (data: VendorAdFormData) => {
        console.log('Form Data:', data);
        console.log('Image:', imagePreview);
        alert('Advertisement Submitted! Check console for data.');
    };

    // Image upload handler
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl duration-300">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6">
                <h2 className="text-2xl font-bold text-white text-center">
                    Create New Advertisement
                </h2>
                <p className="text-pink-100 text-center text-sm mt-1">
                    Showcase your services to thousands of couples
                </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                {/* Package Title Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Package Title
                    </label>
                    <input
                        {...register('title', { required: 'Package title is required' })}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        placeholder="e.g., Gold Wedding Package"
                    />
                    {errors.title && (
                        <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>
                    )}
                </div>

                {/* Category & Price Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            {...register('category', { required: 'Category is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all bg-white"
                        >
                            <option value="">Select Category</option>
                            <option value="Saloon">Saloon</option>
                            <option value="Dress Maker">Dress Maker</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Photographer">Photographer</option>
                        </select>
                        {errors.category && (
                            <span className="text-red-500 text-xs mt-1">{errors.category.message}</span>
                        )}
                    </div>

                    {/* Price Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Base Price (LKR)
                        </label>
                        <input
                            {...register('price', { required: 'Price is required', min: 0 })}
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                            placeholder="e.g., 150000"
                        />
                        {errors.price && (
                            <span className="text-red-500 text-xs mt-1">{errors.price.message}</span>
                        )}
                    </div>
                </div>

                {/* Description Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        placeholder="Describe what's included..."
                    />
                    {errors.description && (
                        <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>
                    )}
                </div>

                {/* Features Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Key Features (comma separated)
                    </label>
                    <input
                        {...register('features')}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        placeholder="e.g., Full Makeup, Saree Draping, Hair Styling"
                    />
                </div>

                {/* Image Upload Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Package Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-pink-300 border-dashed rounded-lg cursor-pointer bg-pink-50 hover:bg-pink-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-28 object-cover rounded-md"
                                    />
                                ) : (
                                    <>
                                        <svg
                                            className="w-8 h-8 mb-4 text-pink-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                    </>
                                )}
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-700 focus:ring-4 focus:ring-pink-300 transform transition-transform hover:-translate-y-0.5"
                >
                    Publish Advertisement
                </button>
            </form>
        </div>
    );
}
