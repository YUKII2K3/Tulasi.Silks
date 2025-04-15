
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Eye, Search, UserCheck, UserX, FilterX, Filter, Download, Mail, UserPlus
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  orders: number;
  status: 'active' | 'inactive' | 'blocked';
  lastLogin: string;
  joinDate: string;
  totalSpent: number;
}

const AdminCustomers = () => {
  // State for customers data
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 9876543210',
      orders: 5,
      status: 'active',
      lastLogin: '2025-03-28',
      joinDate: '2025-01-15',
      totalSpent: 12500
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+91 9876543211',
      orders: 3,
      status: 'active',
      lastLogin: '2025-04-01',
      joinDate: '2025-02-10',
      totalSpent: 7800
    },
    {
      id: '3',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 9876543212',
      orders: 8,
      status: 'active',
      lastLogin: '2025-04-05',
      joinDate: '2024-11-20',
      totalSpent: 24300
    },
    {
      id: '4',
      name: 'Raj Kumar',
      email: 'raj.kumar@example.com',
      phone: '+91 9876543213',
      orders: 1,
      status: 'inactive',
      lastLogin: '2025-03-10',
      joinDate: '2025-03-05',
      totalSpent: 3200
    },
    {
      id: '5',
      name: 'Meera Singh',
      email: 'meera.singh@example.com',
      phone: '+91 9876543214',
      orders: 0,
      status: 'blocked',
      lastLogin: '2025-02-15',
      joinDate: '2025-02-10',
      totalSpent: 0
    }
  ]);

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);

  // Apply filters whenever dependencies change
  useEffect(() => {
    let result = [...customers];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        customer => 
          customer.name.toLowerCase().includes(query) || 
          customer.email.toLowerCase().includes(query) ||
          (customer.phone && customer.phone.toLowerCase().includes(query))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(customer => customer.status === statusFilter);
    }
    
    setFilteredCustomers(result);
  }, [customers, searchQuery, statusFilter]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  // Toggle customer status
  const toggleCustomerStatus = (id: string, currentStatus: 'active' | 'inactive' | 'blocked') => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => {
        if (customer.id === id) {
          const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
          return {...customer, status: newStatus};
        }
        return customer;
      })
    );
  };

  return (
    <AdminLayout title="Customers">
      <div className="grid gap-4 md:gap-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Customers</CardTitle>
                <CardDescription>
                  Manage your customer accounts
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  Email All
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button className="bg-saree-maroon hover:bg-saree-maroon/90" size="sm">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add Customer
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row justify-between gap-2">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              {/* Filters */}
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <span>
                        {statusFilter === 'all' 
                          ? 'All Statuses' 
                          : `${statusFilter.charAt(0).toUpperCase()}${statusFilter.slice(1)}`}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
                
                {(searchQuery || statusFilter !== 'all') && (
                  <Button variant="ghost" onClick={resetFilters} size="icon">
                    <FilterX className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            {filteredCustomers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <div>{customer.email}</div>
                        <div className="text-xs text-gray-500">{customer.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div>{customer.orders}</div>
                        <div className="text-xs text-gray-500">₹{customer.totalSpent.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>{customer.lastLogin}</TableCell>
                      <TableCell>
                        <Badge variant={
                          customer.status === 'active' ? 'default' :
                          customer.status === 'inactive' ? 'secondary' :
                          'destructive'
                        }>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleCustomerStatus(
                              customer.id, 
                              customer.status as 'active' | 'inactive' | 'blocked'
                            )}
                          >
                            {customer.status === 'active' ? (
                              <UserX className="h-4 w-4 text-red-500" />
                            ) : (
                              <UserCheck className="h-4 w-4 text-green-500" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10">
                {searchQuery || statusFilter !== 'all' ? (
                  <>
                    <p className="text-muted-foreground">No customers match your search criteria</p>
                    <Button 
                      variant="link" 
                      onClick={resetFilters} 
                      className="mt-2 text-saree-maroon hover:text-saree-gold"
                    >
                      Clear filters
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground">No customers found</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Customers will appear here after they register or place orders
                    </p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
