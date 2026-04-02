import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center space-y-6">
        <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase">Your cart is empty</h1>
        <p className="text-muted-foreground max-w-sm">
          Looks like you haven't added any sneakers to your cart yet. Start exploring our collection!
        </p>
        <Link to="/shop">
          <Button size="lg" className="h-14 px-10 text-lg font-bold uppercase tracking-widest">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black tracking-tighter uppercase mb-12">Your Shopping Cart ({totalItems})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col sm:flex-row gap-6 p-6 rounded-3xl border bg-card/50 backdrop-blur-sm group"
              >
                <Link to={`/product/${item.id}`} className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-muted">
                  <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                </Link>
                
                <div className="flex flex-grow flex-col justify-between gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{item.brand}</span>
                      <h3 className="text-xl font-black uppercase tracking-tight leading-none mt-1">{item.name}</h3>
                      <div className="flex gap-4 mt-2 text-sm font-medium text-muted-foreground">
                        <span className="flex items-center gap-1">Size: <span className="text-foreground font-bold">{item.selectedSize}</span></span>
                        <span className="flex items-center gap-1">Color: <span className="text-foreground font-bold">{item.selectedColor}</span></span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive rounded-full"
                      onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 border rounded-full p-1 bg-background">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-primary">
                        Rs. {((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm space-y-6 shadow-xl">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Order Summary</h2>
              
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs. {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span>Rs. 0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-black uppercase tracking-tighter">
                  <span>Total</span>
                  <span className="text-primary">Rs. {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/checkout')} 
                  className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                >
                  Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/shop">
                  <Button variant="ghost" className="w-full h-12 font-bold uppercase tracking-widest text-xs">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <CreditCard size={16} className="text-primary" />
                  Secure Checkout Guaranteed
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <Truck size={16} className="text-primary" />
                  Free Express Shipping
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border bg-muted/30 space-y-4">
              <h3 className="font-bold uppercase tracking-widest text-xs">Apply Promo Code</h3>
              <div className="flex gap-2">
                <Input placeholder="Enter code" className="bg-background" />
                <Button variant="secondary">Apply</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
