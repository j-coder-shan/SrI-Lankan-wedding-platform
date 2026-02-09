import React, { useState, useRef } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

export function ContactPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formRef.current) return;

        // Validate environment variables
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            toast.error('Email service is not configured. Please contact the administrator.');
            console.error('EmailJS environment variables are missing');
            return;
        }

        setIsSubmitting(true);

        try {
            await emailjs.sendForm(
                serviceId,
                templateId,
                formRef.current,
                publicKey
            );

            toast.success('Message sent successfully! We will get back to you soon.');
            setSubmitted(true);
            formRef.current.reset();

            // Reset submitted state after 5 seconds to allow sending another message
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            toast.error('Failed to send message. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Card className="shadow-xl border-purple-100">
                            <CardHeader>
                                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Phone className="w-5 h-5 text-rose-500" />
                                    <span>+94 77 123 4567</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Mail className="w-5 h-5 text-rose-500" />
                                    <span>prabod.jay02@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <MapPin className="w-5 h-5 text-rose-500" />
                                    <span>123 Wedding Lane, Colombo 03, Sri Lanka</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Success Message Card */}
                        {submitted && (
                            <Card className="border-green-200 bg-green-50 shadow-xl">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3 text-green-700">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                        <div>
                                            <h3 className="font-semibold text-lg">Message Sent!</h3>
                                            <p className="text-sm">We'll get back to you as soon as possible.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <Card className="shadow-xl border-purple-100">
                        <CardHeader>
                            <CardTitle className="text-2xl">Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="from_name" className="text-sm font-medium">
                                        Name <span className="text-rose-500">*</span>
                                    </label>
                                    <Input
                                        id="from_name"
                                        name="from_name"
                                        placeholder="Your Name"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="reply_to" className="text-sm font-medium">
                                        Email <span className="text-rose-500">*</span>
                                    </label>
                                    <Input
                                        id="reply_to"
                                        name="reply_to"
                                        type="email"
                                        placeholder="your@email.com"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        Message <span className="text-rose-500">*</span>
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="How can we help you?"
                                        rows={4}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Submit Request'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
