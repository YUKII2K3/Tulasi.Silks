
import React from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AdminOrders = () => {
  // Placeholder for orders data
  const orders = [];

  // Function to determine badge variant based on order status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'outline';
      case 'processing':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <AdminLayout title="Orders">
      <div className="grid gap-4 md:gap-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Manage your store orders here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>₹{order.amount}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">View Details</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No orders found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Orders will appear here when customers make purchases
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
