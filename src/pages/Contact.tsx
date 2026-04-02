import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question about your order or our latest drops? Our team is here to help you step up your game.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Contact Info</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-1">Email Us</h4>
                    <p className="text-muted-foreground font-medium">support@footwears.com</p>
                    <p className="text-muted-foreground font-medium">press@footwears.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-1">Call Us</h4>
                    <p className="text-muted-foreground font-medium">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground font-medium">Mon-Fri: 9am - 6pm EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-1">Visit Us</h4>
                    <p className="text-muted-foreground font-medium">123 Sneaker Street</p>
                    <p className="text-muted-foreground font-medium">Fashion District, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-none shadow-xl bg-primary text-primary-foreground">
              <CardContent className="p-8 space-y-4">
                <MessageSquare size={32} className="mb-2" />
                <h3 className="text-xl font-black uppercase tracking-tighter">Live Chat</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Need immediate assistance? Our sneaker experts are available via live chat during business hours.
                </p>
                <Button variant="secondary" className="w-full font-bold uppercase tracking-widest text-xs h-12">
                  Start Chatting
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="p-8 md:p-12 rounded-3xl border bg-card shadow-2xl space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Send a Message</h2>
                <p className="text-muted-foreground">We typically respond within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" required className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" required className="h-12 rounded-xl" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required className="h-12 rounded-xl" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" required className="h-12 rounded-xl" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us more about your inquiry..." className="min-h-[150px] rounded-2xl p-4" required />
                </div>
                <Button type="submit" className="md:col-span-2 h-14 text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                  Send Message <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
