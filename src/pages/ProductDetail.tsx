import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Truck, ShieldCheck, RotateCcw, Share2, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/data';
import { Product } from '@/types';
import { useCart } from '@/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const foundProduct = PRODUCTS.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color');
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    toast.success(`Added ${product.name} to your cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={product.images[currentImageIndex] || product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {product.images.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full shadow-lg"
                  onClick={() => setCurrentImageIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                >
                  <ChevronLeft size={24} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full shadow-lg"
                  onClick={() => setCurrentImageIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                >
                  <ChevronRight size={24} />
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  currentImageIndex === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} ${i}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">{product.brand}</span>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full"><Share2 size={20} /></Button>
                <Button variant="ghost" size="icon" className="rounded-full"><Heart size={20} /></Button>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className={`h-4 w-4 ${i <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                ))}
                <span className="ml-2 text-sm font-bold">{product.rating}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-muted-foreground font-medium">{product.reviews} Reviews</span>
            </div>
            <div className="flex items-center gap-4">
              {product.sale ? (
                <>
                  <span className="text-4xl font-black text-primary">Rs. {product.discountPrice}</span>
                  <span className="text-xl text-muted-foreground line-through">Rs. {product.price}</span>
                  <Badge className="bg-red-600">Save Rs. {product.price - (product.discountPrice || 0)}</Badge>
                </>
              ) : (
                <span className="text-4xl font-black text-primary">Rs. {product.price}</span>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold uppercase tracking-wider text-sm">Select Color</h3>
                <span className="text-sm font-medium text-muted-foreground">{selectedColor}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-full border-2 text-sm font-bold transition-all ${
                      selectedColor === color ? 'border-primary bg-primary text-white' : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold uppercase tracking-wider text-sm">Select Size (US)</h3>
                <button className="text-sm font-bold text-primary hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 rounded-xl border-2 text-sm font-bold transition-all ${
                      selectedSize === size ? 'border-primary bg-primary text-white' : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleAddToCart} size="lg" className="flex-grow h-16 text-lg font-black uppercase tracking-widest">
              <ShoppingCart className="mr-3 h-6 w-6" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-8 flex items-center justify-center">
              <Heart className="h-6 w-6" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-muted/50">
              <Truck className="text-primary" size={24} />
              <span className="text-xs font-bold uppercase tracking-tighter">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-muted/50">
              <ShieldCheck className="text-primary" size={24} />
              <span className="text-xs font-bold uppercase tracking-tighter">100% Authentic</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-muted/50">
              <RotateCcw className="text-primary" size={24} />
              <span className="text-xs font-bold uppercase tracking-tighter">30-Day Returns</span>
            </div>
          </div>

          <Tabs defaultValue="description" className="mt-8">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-8">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-4 font-bold uppercase tracking-widest text-xs">Description</TabsTrigger>
              <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-4 font-bold uppercase tracking-widest text-xs">Details</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-4 font-bold uppercase tracking-widest text-xs">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6 text-muted-foreground leading-relaxed">
              {product.description}
            </TabsContent>
            <TabsContent value="details" className="py-6">
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between"><span className="font-bold text-foreground">Brand</span> <span>{product.brand}</span></li>
                <li className="flex justify-between"><span className="font-bold text-foreground">Category</span> <span>{product.category}</span></li>
                <li className="flex justify-between"><span className="font-bold text-foreground">Style Code</span> <span>FTW-{product.id}00X</span></li>
                <li className="flex justify-between"><span className="font-bold text-foreground">Release Date</span> <span>January 2026</span></li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-black">{product.rating} / 5.0</h4>
                    <p className="text-sm text-muted-foreground">Based on {product.reviews} reviews</p>
                  </div>
                  <Button variant="outline">Write a Review</Button>
                </div>
                <Separator />
                <div className="space-y-8">
                  {[1, 2].map(i => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs">JD</div>
                          <span className="font-bold text-sm">John Doe</span>
                        </div>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                      </div>
                      <p className="text-sm text-muted-foreground italic">"Absolutely love these sneakers! The comfort is unmatched and the style is perfect for everyday wear."</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
