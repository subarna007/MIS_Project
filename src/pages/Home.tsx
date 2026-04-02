import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '@/data';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const Home = () => {
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.newArrival).slice(0, 4);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>
        <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <Badge className="bg-primary/20 text-primary border-primary/50 text-sm py-1 px-4 backdrop-blur-md">
              New Collection 2026
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
              STEP INTO THE <br />
              <span className="text-vibrant">FUTURE.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-lg font-medium">
              Discover the latest in high-performance footwear. Engineered for comfort, designed for the streets of Kathmandu.
            </p>
            <div className="flex gap-4 pt-4">
              <Link to="/shop">
                <Button size="lg" className="h-14 px-8 text-lg font-bold vibrant-shadow hover:scale-105 transition-transform">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/shop?category=Lifestyle">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold text-white border-white hover:bg-white hover:text-black transition-all">
                  Explore Lifestyle
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On all orders over Rs. 5000" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
            { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
            { icon: Zap, title: "Fast Delivery", desc: "Get it within 2-3 days" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-6 rounded-2xl bg-muted/50 border border-transparent hover:border-primary/20 transition-all"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <feature.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Featured Drops</h2>
            <p className="text-muted-foreground">Handpicked styles for your collection.</p>
          </div>
          <Link to="/shop" className="text-primary font-bold flex items-center gap-1 hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="container mx-auto px-4">
        <div className="relative h-[400px] rounded-3xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1974&auto=format&fit=crop"
            alt="Promo"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center p-8 md:p-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              Summer Sale <br />
              <span className="text-red-500">Up to 40% Off</span>
            </h2>
            <p className="text-zinc-300 max-w-md">
              Don't miss out on the biggest sale of the season. Limited time offer on selected styles.
            </p>
            <Button size="lg" variant="destructive" className="w-fit font-bold h-12 px-8">
              Shop Sale
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter uppercase">New Arrivals</h2>
            <p className="text-muted-foreground">The latest heat just landed.</p>
          </div>
          <Link to="/shop?new=true" className="text-primary font-bold flex items-center gap-1 hover:underline">
            View New <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Highlights */}
      <section className="bg-zinc-100 py-20">
        <div className="container mx-auto px-4 text-center space-y-12">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Authorized Retailer</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma', 'Vans'].map(brand => (
              <span key={brand} className="text-4xl font-black tracking-tighter text-zinc-400 hover:text-zinc-900 cursor-default transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Badge component since it's used in Home
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);
