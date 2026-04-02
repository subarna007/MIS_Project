import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle2, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '@/CartContext';
import { useAuth } from '@/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [formData, setFormData] = useState({
    email: user?.email || '',
    fullName: user?.name || 'Subarna Dahal',
    address: '',
    city: 'Kathmandu',
    zipCode: '44600',
    country: 'Nepal',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(prev => prev + 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: orderId,
      userId: user?.id || 'guest',
      items: cart,
      total: totalPrice,
      status: 'processing',
      createdAt: new Date().toISOString(),
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country
      },
      paymentMethod
    };
    
    localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
    clearCart();
    setStep(3);
    toast.success('Order placed successfully!');
  };

  if (cart.length === 0 && step !== 3) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center gap-4 mb-12">
        <Button variant="ghost" size="icon" onClick={() => step > 1 && step < 3 ? setStep(step - 1) : navigate('/cart')}>
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-4xl font-black tracking-tighter uppercase">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="p-8 rounded-3xl border bg-card space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <Truck className="text-primary" /> Shipping Information
                  </h2>
                  <form onSubmit={handleNextStep} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" name="fullName" required value={formData.fullName} onChange={handleInputChange} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" name="address" required value={formData.address} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" required value={formData.city} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input id="zipCode" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} />
                    </div>
                    <Button type="submit" className="md:col-span-2 h-14 text-lg font-black uppercase tracking-widest mt-4">
                      Continue to Payment
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="p-8 rounded-3xl border bg-card space-y-8">
                  <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <CreditCard className="text-primary" /> Payment Method
                  </h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Label
                      htmlFor="card"
                      className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-muted'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value="card" id="card" />
                        <div className="space-y-1">
                          <p className="font-bold uppercase tracking-widest text-xs">Credit / Debit Card</p>
                          <p className="text-xs text-muted-foreground">Visa, Mastercard, AMEX</p>
                        </div>
                      </div>
                      <CreditCard size={24} className="text-muted-foreground" />
                    </Label>

                    <Label
                      htmlFor="cod"
                      className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-muted'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value="cod" id="cod" />
                        <div className="space-y-1">
                          <p className="font-bold uppercase tracking-widest text-xs">Cash on Delivery</p>
                          <p className="text-xs text-muted-foreground">Pay when you receive</p>
                        </div>
                      </div>
                      <Truck size={24} className="text-muted-foreground" />
                    </Label>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-6 pt-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" required value={formData.cardNumber} onChange={handleInputChange} />
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" name="expiry" placeholder="MM/YY" required value={formData.expiry} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" name="cvv" placeholder="123" required value={formData.cvv} onChange={handleInputChange} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-6 space-y-4">
                    <Button 
                      onClick={handlePlaceOrder} 
                      disabled={isProcessing}
                      className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                    >
                      {isProcessing ? 'Processing...' : `Pay Rs. ${totalPrice.toFixed(2)}`}
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      <ShieldCheck size={16} className="text-green-600" />
                      Encrypted & Secure Payment
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center space-y-8 py-12"
              >
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 size={64} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Order Confirmed!</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thank you for your purchase. We've received your order and will notify you as soon as it's shipped.
                  </p>
                </div>
                <div className="p-6 rounded-2xl border bg-muted/30 w-full max-w-md">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Order ID</span>
                    <span className="font-bold">#FTW-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Delivery</span>
                    <span className="font-bold">2-3 Business Days</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => navigate('/orders')} variant="outline" className="h-12 px-8 font-bold uppercase tracking-widest text-xs">
                    View Orders
                  </Button>
                  <Button onClick={() => navigate('/')} className="h-12 px-8 font-bold uppercase tracking-widest text-xs">
                    Back to Home
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        {step < 3 && (
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-8 rounded-3xl border bg-card/50 backdrop-blur-sm space-y-6 shadow-xl">
              <h2 className="text-xl font-black uppercase tracking-tighter">In Your Bag</h2>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 rounded-xl bg-muted overflow-hidden">
                      <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <h4 className="text-sm font-bold uppercase tracking-tight leading-none">{item.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                        {item.selectedSize} US | {item.selectedColor}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs font-bold">Qty: {item.quantity}</span>
                        <span className="text-sm font-black text-primary">Rs. {((item.discountPrice || item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs. {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-black uppercase tracking-tighter">
                  <span>Total</span>
                  <span className="text-primary">Rs. {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
