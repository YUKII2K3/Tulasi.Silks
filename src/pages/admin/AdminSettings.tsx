
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  SlidersHorizontal, Save, RotateCcw, Paintbrush, Home, 
  User, Layout, Layers, Image, FileText, 
  Navigation, ShoppingBag, PanelBottom, MapPin 
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

const fontOptions = [
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Raleway', label: 'Raleway' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Poppins', label: 'Poppins' },
];

const AdminSettings = () => {
  const { theme, updateTheme, resetTheme, isDirty, setIsDirty, storeInfo, updateStoreInfo } = useTheme();
  const { toast } = useToast();
  
  const [formValues, setFormValues] = useState({
    primaryColor: theme.primaryColor,
    secondaryColor: theme.secondaryColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    sectionSpacing: theme.sectionSpacing,
    heroHeight: theme.heroHeight,
  });

  const [activeSection, setActiveSection] = useState('hero');
  
  const [localStoreInfo, setLocalStoreInfo] = useState({
    storeName: storeInfo.storeName,
    storeAddress: storeInfo.storeAddress,
    storeCity: storeInfo.storeCity,
    storeState: storeInfo.storeState,
    storeZip: storeInfo.storeZip,
    storePhone: storeInfo.storePhone,
    storeEmail: storeInfo.storeEmail,
    storeDescription: storeInfo.storeDescription,
    googleMapsUrl: storeInfo.googleMapsUrl
  });

  useEffect(() => {
    setFormValues({
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      sectionSpacing: theme.sectionSpacing,
      heroHeight: theme.heroHeight,
    });
    
    setLocalStoreInfo({
      storeName: storeInfo.storeName,
      storeAddress: storeInfo.storeAddress,
      storeCity: storeInfo.storeCity,
      storeState: storeInfo.storeState,
      storeZip: storeInfo.storeZip,
      storePhone: storeInfo.storePhone,
      storeEmail: storeInfo.storeEmail,
      storeDescription: storeInfo.storeDescription,
      googleMapsUrl: storeInfo.googleMapsUrl
    });
  }, [theme, storeInfo]);

  const handleInputChange = (name: string, value: string | number) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
  };

  const handleFontFamilyChange = (value: string) => {
    handleInputChange('fontFamily', value);
  };

  const handleSliderChange = (name: string, value: number[]) => {
    handleInputChange(name, value[0]);
  };

  const handleStoreInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalStoreInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    updateTheme(formValues);
    setIsDirty(false);
    
    toast({
      title: "Settings saved",
      description: "Your settings have been applied to the site.",
    });

    updateStoreInfo(localStoreInfo);

    // Reload the page after a short delay to ensure all changes take effect
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleResetTheme = () => {
    resetTheme();
    toast({
      title: "Theme reset",
      description: "Theme settings have been reset to default values.",
    });
  };

  const renderSectionEditor = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div className="flex justify-between mb-2">
              <Label htmlFor="heroHeight">Hero Section Height: {formValues.heroHeight}vh</Label>
              <span className="text-sm text-muted-foreground">Range: 40vh - 100vh</span>
            </div>
            <Slider
              id="heroHeight"
              min={40}
              max={100}
              step={5}
              value={[formValues.heroHeight]}
              onValueChange={(value) => handleSliderChange('heroHeight', value)}
            />
            <div className="mt-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg border overflow-hidden">
              <div 
                className="relative flex items-center justify-center" 
                style={{ height: `${formValues.heroHeight * 2}px`, transition: 'height 0.3s ease' }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <Home className="h-8 w-8 mb-2" />
                  <div className="text-lg font-semibold">Hero Section</div>
                  <div className="text-sm">Height: {formValues.heroHeight}vh</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <h4 className="font-medium mb-2">Hero Section Tips:</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Taller hero sections create a dramatic first impression</li>
                <li>For mobile devices, heights will automatically adjust</li>
                <li>Consider your hero image dimensions when setting height</li>
              </ul>
            </div>
          </div>
        );
      
      case 'categories':
        return (
          <div className="space-y-4">
            <div className="flex justify-between mb-2">
              <Label>Category Section Appearance</Label>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="categoryImageSize" className="mb-2 block">Image Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="categoryLayout" className="mb-2 block">Layout Style</Label>
                <Select defaultValue="grid">
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg border">
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white rounded shadow-sm p-2 text-center">
                    <div className="bg-primary/20 h-24 mb-2 rounded flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-primary/70" />
                    </div>
                    <div className="text-xs font-medium">Category {item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <h4 className="font-medium mb-2">Category Section Tips:</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Use high-quality images that represent each category</li>
                <li>Keep category names short and descriptive</li>
                <li>Consider using a carousel on mobile devices</li>
              </ul>
            </div>
          </div>
        );
      
      case 'products':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="productsPerRow" className="mb-2 block">Products Per Row</Label>
                <Select defaultValue="3">
                  <SelectTrigger>
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Products</SelectItem>
                    <SelectItem value="3">3 Products</SelectItem>
                    <SelectItem value="4">4 Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="productImageRatio" className="mb-2 block">Image Ratio</Label>
                <Select defaultValue="4:5">
                  <SelectTrigger>
                    <SelectValue placeholder="Select ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1">Square (1:1)</SelectItem>
                    <SelectItem value="4:5">Portrait (4:5)</SelectItem>
                    <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="productInfoStyle" className="mb-2 block">Product Info Style</Label>
              <Select defaultValue="under">
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under">Below Image</SelectItem>
                  <SelectItem value="overlay">Overlay on Hover</SelectItem>
                  <SelectItem value="side">Beside Image</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg border">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white rounded shadow-sm overflow-hidden">
                    <div className="bg-secondary/20 h-32 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image className="h-8 w-8 text-secondary/70" />
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="text-xs font-medium truncate">Product Name</div>
                      <div className="text-xs text-primary/70">₹1,999</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <h4 className="font-medium mb-2">Product Display Tips:</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Consistent image ratios create a more professional look</li>
                <li>3-4 products per row works best on desktop</li>
                <li>Include essential info like price and quick-view options</li>
              </ul>
            </div>
          </div>
        );
      
      case 'footer':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="footerColumns" className="mb-2 block">Footer Columns</Label>
                <Select defaultValue="4">
                  <SelectTrigger>
                    <SelectValue placeholder="Select columns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Columns</SelectItem>
                    <SelectItem value="3">3 Columns</SelectItem>
                    <SelectItem value="4">4 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="footerStyle" className="mb-2 block">Footer Style</Label>
                <Select defaultValue="light">
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="colored">Colored</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="footerPadding">Footer Padding</Label>
            </div>
            <Slider
              id="footerPadding"
              min={20}
              max={80}
              step={5}
              value={[40]}
            />
            <div className="mt-4 bg-gray-100 rounded-lg border overflow-hidden">
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((col) => (
                    <div key={col} className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded w-16"></div>
                        <div className="h-2 bg-gray-200 rounded w-14"></div>
                        <div className="h-2 bg-gray-200 rounded w-18"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center">
                  <div className="h-2 bg-gray-300 rounded w-40"></div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <h4 className="font-medium mb-2">Footer Section Tips:</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Include important links and contact information</li>
                <li>Consider adding newsletter signup</li>
                <li>Make sure contact details are up to date</li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <div className="text-center py-8">
              <Layout className="h-12 w-12 mx-auto mb-4 text-primary/70" />
              <h3 className="text-lg font-medium">Select a section to edit</h3>
              <p className="text-sm text-muted-foreground">
                Click on one of the section buttons above to customize that part of your website
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <AdminLayout title="Settings">
      <Tabs defaultValue="theme" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Paintbrush className="h-4 w-4" />
            Theme Colors
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Layout Editor
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Store Information
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="theme" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Colors</CardTitle>
              <CardDescription>
                Customize the primary and secondary colors used throughout the site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="primaryColor"
                      name="primaryColor"
                      type="color" 
                      value={formValues.primaryColor}
                      onChange={handleColorChange}
                      className="w-16 h-10 p-1"
                    />
                    <Input 
                      value={formValues.primaryColor} 
                      readOnly
                      className="font-mono"
                    />
                  </div>
                  <div className="h-16 rounded flex items-center justify-center text-white" style={{ backgroundColor: formValues.primaryColor }}>
                    Primary Color Sample
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="secondaryColor"
                      name="secondaryColor"
                      type="color" 
                      value={formValues.secondaryColor}
                      onChange={handleColorChange}
                      className="w-16 h-10 p-1"
                    />
                    <Input 
                      value={formValues.secondaryColor} 
                      readOnly
                      className="font-mono"
                    />
                  </div>
                  <div className="h-16 rounded flex items-center justify-center text-white" style={{ backgroundColor: formValues.secondaryColor }}>
                    Secondary Color Sample
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select 
                    value={formValues.fontFamily} 
                    onValueChange={handleFontFamilyChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map(font => (
                        <SelectItem key={font.value} value={font.value}>
                          <span style={{ fontFamily: font.value }}>{font.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="h-16 rounded border p-4 flex items-center text-lg" style={{ fontFamily: formValues.fontFamily }}>
                    Sample Text in {formValues.fontFamily}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="fontSize">Base Font Size: {formValues.fontSize}px</Label>
                    <span className="text-sm text-muted-foreground">Range: 12px - 24px</span>
                  </div>
                  <Slider
                    id="fontSize"
                    min={12}
                    max={24}
                    step={1}
                    value={[formValues.fontSize]}
                    onValueChange={(value) => handleSliderChange('fontSize', value)}
                  />
                  <div className="mt-2 p-4 rounded border">
                    <p style={{ fontSize: `${formValues.fontSize}px` }}>This is how your text will appear on the website.</p>
                    <p className="text-sm mt-2 text-muted-foreground">Regular text will match this size</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="sectionSpacing">Section Spacing: {formValues.sectionSpacing}px</Label>
                    <span className="text-sm text-muted-foreground">Range: 20px - 120px</span>
                  </div>
                  <Slider
                    id="sectionSpacing"
                    min={20}
                    max={120}
                    step={5}
                    value={[formValues.sectionSpacing]}
                    onValueChange={(value) => handleSliderChange('sectionSpacing', value)}
                  />
                  <div className="mt-2 rounded border overflow-hidden">
                    <div className="bg-primary/20 h-8 w-full flex items-center justify-center text-xs">Section 1</div>
                    <div style={{ height: `${formValues.sectionSpacing}px` }} className="bg-gray-50 flex items-center justify-center">
                      <div className="text-xs text-center">
                        <div>Space between sections: {formValues.sectionSpacing}px</div>
                        <div className="mt-1">This padding will be applied to the top and bottom of each section</div>
                      </div>
                    </div>
                    <div className="bg-secondary/20 h-8 w-full flex items-center justify-center text-xs">Section 2</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="layout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Layout Editor</CardTitle>
              <CardDescription>
                Visually edit each section of your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <Button 
                  variant={activeSection === 'hero' ? 'default' : 'outline'} 
                  onClick={() => setActiveSection('hero')}
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Hero Section
                </Button>
                <Button 
                  variant={activeSection === 'categories' ? 'default' : 'outline'} 
                  onClick={() => setActiveSection('categories')}
                  className="flex items-center gap-2"
                >
                  <Layers className="h-4 w-4" />
                  Categories
                </Button>
                <Button 
                  variant={activeSection === 'products' ? 'default' : 'outline'} 
                  onClick={() => setActiveSection('products')}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Products
                </Button>
                <Button 
                  variant={activeSection === 'footer' ? 'default' : 'outline'} 
                  onClick={() => setActiveSection('footer')}
                  className="flex items-center gap-2"
                >
                  <PanelBottom className="h-4 w-4" />
                  Footer
                </Button>
              </div>
              
              <div className="border rounded-lg p-4">
                {renderSectionEditor()}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Enter your store details that will be displayed on the website and used for communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input 
                      id="storeName" 
                      name="storeName" 
                      value={localStoreInfo.storeName} 
                      onChange={handleStoreInfoChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="storeAddress">Address</Label>
                    <Input 
                      id="storeAddress" 
                      name="storeAddress" 
                      value={localStoreInfo.storeAddress} 
                      onChange={handleStoreInfoChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="storeCity">City</Label>
                      <Input 
                        id="storeCity" 
                        name="storeCity" 
                        value={localStoreInfo.storeCity} 
                        onChange={handleStoreInfoChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="storeState">State</Label>
                      <Input 
                        id="storeState" 
                        name="storeState" 
                        value={localStoreInfo.storeState} 
                        onChange={handleStoreInfoChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="storeZip">Postal Code</Label>
                    <Input 
                      id="storeZip" 
                      name="storeZip" 
                      value={localStoreInfo.storeZip} 
                      onChange={handleStoreInfoChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="storePhone">Phone Number</Label>
                    <Input 
                      id="storePhone" 
                      name="storePhone" 
                      value={localStoreInfo.storePhone} 
                      onChange={handleStoreInfoChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="storeEmail">Email Address</Label>
                    <Input 
                      id="storeEmail" 
                      name="storeEmail" 
                      value={localStoreInfo.storeEmail} 
                      onChange={handleStoreInfoChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="googleMapsUrl" className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> Google Maps URL
                    </Label>
                    <Input 
                      id="googleMapsUrl" 
                      name="googleMapsUrl" 
                      value={localStoreInfo.googleMapsUrl} 
                      onChange={handleStoreInfoChange}
                      placeholder="https://maps.app.goo.gl/..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Paste a Google Maps URL to your store's location
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="storeDescription">Store Description</Label>
                    <Textarea 
                      id="storeDescription" 
                      name="storeDescription" 
                      value={localStoreInfo.storeDescription} 
                      onChange={handleStoreInfoChange}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This description will be shown on your homepage and about page
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-md">
                <h3 className="text-sm font-medium mb-2">Preview:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>{localStoreInfo.storeName}</strong></p>
                  <p>{localStoreInfo.storeAddress}</p>
                  <p>{localStoreInfo.storeCity}, {localStoreInfo.storeState} {localStoreInfo.storeZip}</p>
                  <p>Phone: {localStoreInfo.storePhone}</p>
                  <p>Email: {localStoreInfo.storeEmail}</p>
                  <p className="italic">{localStoreInfo.storeDescription}</p>
                  {localStoreInfo.googleMapsUrl && (
                    <p>
                      <a 
                        href={localStoreInfo.googleMapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary flex items-center gap-1 hover:underline"
                      >
                        <MapPin className="h-3 w-3" /> View on Google Maps
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-4 mt-6">
        <Button 
          variant="outline" 
          onClick={handleResetTheme}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to Default
        </Button>
        <Button 
          onClick={handleSaveChanges} 
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
