import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type VendorAdFormData = {
    title: string;
    category: 'Saloon' | 'Dress Maker' | 'Hotel' | 'Photographer';
    price: number;
    description: string;
    features: string;
};

export default function VendorAdForm() {
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<VendorAdFormData>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const onSubmit = async (data: VendorAdFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            const payload = {
                title: data.title,
                category: data.category,
                priceMin: data.price,
                priceMax: data.price,
                description: data.description,
                details: JSON.stringify({ features: data.features }),
            };

            // Using relative path for proxy if configured, or absolute if not (assuming proxy set up in vite.config later or cross-origin)
            // For now, assuming relative '/api' works or will be configured.
            const response = await axios.post('/api/listings', payload, {
                headers: {
                    'X-Auth-User-Id': 1,
                }
            });

            if (response.status === 201) {
                setSubmitStatus('success');
                reset();
                setImagePreview(null);
                alert('Advertisement Published Successfully!');
            }
        } catch (error) {
            console.error('Error submitting advertisement:', error);
            setSubmitStatus('error');
            alert('Failed to publish advertisement. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
            <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-6">
                <h2 className="text-2xl font-bold text-white text-center">Create New Advertisement</h2>
                <p className="text-rose-100 text-center text-sm mt-1">Showcase your services to thousands of couples</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Package Title</Label>
                    <Input
                        id="title"
                        {...register('title', { required: 'Package title is required' })}
                        placeholder="e.g., Gold Wedding Package"
                    />
                    {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Controller
                            control={control}
                            name="category"
                            rules={{ required: 'Category is required' }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Saloon">Saloon</SelectItem>
                                        <SelectItem value="Dress Maker">Dress Maker</SelectItem>
                                        <SelectItem value="Hotel">Hotel</SelectItem>
                                        <SelectItem value="Photographer">Photographer</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Base Price (LKR)</Label>
                        <Input
                            id="price"
                            {...register('price', { required: 'Price is required', min: 0 })}
                            type="number"
                            placeholder="e.g., 150000"
                        />
                        {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        {...register('description', { required: 'Description is required' })}
                        rows={4}
                        placeholder="Describe what's included..."
                    />
                    {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="features">Key Features (comma separated)</Label>
                    <Input
                        id="features"
                        {...register('features')}
                        placeholder="e.g., Full Makeup, Saree Draping, Hair Styling"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Package Image</Label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-rose-300 border-dashed rounded-lg cursor-pointer bg-rose-50 hover:bg-rose-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="h-28 object-cover rounded-md" />
                                ) : (
                                    <>
                                        <svg className="w-8 h-8 mb-4 text-rose-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                    </>
                                )}
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold"
                >
                    {isSubmitting ? 'Publishing...' : 'Publish Advertisement'}
                </Button>

                {submitStatus === 'error' && (
                    <p className="text-center text-red-500 mt-2 text-sm">Something went wrong. ensure backend is running.</p>
                )}
            </form>
        </div>
    );
}
