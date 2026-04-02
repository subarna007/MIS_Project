import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight,
  Edit,
  Trash2
} from 'lucide-react';
import { PRODUCTS } from '@/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

export const AdminDashboard = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const [orders] = useState(JSON.parse(localStorage.getItem('orders') || '[]'));

  const stats = [
    { title: 'Total Revenue', value: `Rs. ${orders.reduce((acc: number, o: any) => acc + o.total, 0).toFixed(2)}`, icon: DollarSign, trend: '+12.5%', color: 'text-green-600' },
    { title: 'Total Orders', value: orders.length, icon: ShoppingBag, trend: '+8.2%', color: 'text-blue-600' },
    { title: 'Active Products', value: products.length, icon: Package, trend: '+2', color: 'text-amber-600' },
    { title: 'Total Customers', value: '1,284', icon: Users, trend: '+15.3%', color: 'text-purple-600' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your store's inventory, orders, and customers.</p>
        </div>
        <Button className="h-12 px-6 font-bold uppercase tracking-widest text-xs">
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
                <p className="text-xs font-bold text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> {stat.trend} <span className="text-muted-foreground font-medium">vs last month</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="products" className="space-y-8">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-8">
          <TabsTrigger value="products" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-4 font-bold uppercase tracking-widest text-xs">Products</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-4 font-bold uppercase tracking-widest text-xs">Orders</TabsTrigger>
          <TabsTrigger value="customers" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-4 font-bold uppercase tracking-widest text-xs">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10 h-11 rounded-xl" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl"><Edit size={18} /></Button>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl text-destructive"><Trash2 size={18} /></Button>
            </div>
          </div>

          <Card className="border-none shadow-xl">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b-2">
                  <TableHead className="font-bold uppercase tracking-widest text-[10px]">Product</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px]">Category</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px]">Price</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px]">Stock</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                  <TableHead className="text-right font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden">
                          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm leading-none">{product.name}</span>
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">{product.brand}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{product.category}</TableCell>
                    <TableCell className="text-sm font-bold">Rs. {product.price}</TableCell>
                    <TableCell className="text-sm font-medium">45 units</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Product</DropdownMenuItem>
                          <DropdownMenuItem>View Analytics</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete Product</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="border-none shadow-xl">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b-2">
                  <TableHead className="font-bold uppercase tracking-widest text-[10px]">Order ID</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px]">Customer</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px]">Date</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px]">Total</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                  <TableHead className="text-right font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length > 0 ? orders.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-bold text-sm">#{order.id}</TableCell>
                    <TableCell className="text-sm font-medium">{order.shippingAddress.fullName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm font-bold">Rs. {order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none uppercase text-[10px] font-black tracking-widest">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="font-bold text-xs uppercase tracking-widest">Details</Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic">No orders found yet.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
