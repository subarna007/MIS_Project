import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]);
    toast.success(`Added ${product.name} to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col gap-3 rounded-xl border bg-card p-3 transition-all hover:vibrant-shadow hover:-translate-y-1"
    >
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.newArrival && <Badge className="bg-blue-600 hover:bg-blue-700">New</Badge>}
          {product.sale && <Badge className="bg-red-600 hover:bg-red-700">Sale</Badge>}
          {product.featured && <Badge className="bg-amber-500 hover:bg-amber-600">Hot</Badge>}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/20 backdrop-blur-[2px]">
          <Button 
            onClick={handleQuickAdd}
            className="rounded-full shadow-lg vibrant-gradient border-none"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" /> Quick Add
          </Button>
        </div>
      </Link>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{product.brand}</span>
          <div className="flex items-center gap-1 text-xs font-semibold">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`} className="font-bold text-lg leading-tight hover:text-primary transition-colors">
          {product.name}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-1">{product.category}</p>
        <div className="mt-2 flex items-center gap-2">
          {product.sale ? (
            <>
              <span className="text-xl font-black text-primary">Rs. {product.discountPrice}</span>
              <span className="text-sm text-muted-foreground line-through">Rs. {product.price}</span>
            </>
          ) : (
            <span className="text-xl font-black text-primary">Rs. {product.price}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
