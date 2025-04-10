
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  Calendar, 
  Check, 
  Filter, 
  Plus, 
  Search, 
  SlidersHorizontal,
  Trash,
  Edit,
  Eye,
  Pause,
  Play,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Mock campaign data
const initialCampaigns = [
  {
    id: 1,
    name: 'Summer Sale',
    platform: 'Email',
    status: 'Active',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-08-31'),
    budget: 5000,
    spent: 1890,
    roi: 2.3,
    impressions: 45780,
    clicks: 3245,
    conversions: 287,
    segments: ['Age 25-34', 'Female', 'Urban'],
  },
  {
    id: 2,
    name: 'Product Launch',
    platform: 'Search',
    status: 'Active',
    startDate: new Date('2025-04-15'),
    endDate: new Date('2025-07-15'),
    budget: 12000,
    spent: 5640,
    roi: 1.8,
    impressions: 89240,
    clicks: 6729,
    conversions: 412,
    segments: ['Age 18-45', 'Tech Enthusiasts', 'High Income'],
  },
  {
    id: 3,
    name: 'Brand Awareness',
    platform: 'Social',
    status: 'Active',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-09-01'),
    budget: 8500,
    spent: 3960,
    roi: 1.2,
    impressions: 120345,
    clicks: 4567,
    conversions: 189,
    segments: ['Age 18-24', 'Students', 'Urban'],
  },
  {
    id: 4,
    name: 'Holiday Promotion',
    platform: 'Display',
    status: 'Scheduled',
    startDate: new Date('2025-11-15'),
    endDate: new Date('2025-12-31'),
    budget: 7500,
    spent: 0,
    roi: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    segments: ['Shoppers', 'Previous Customers'],
  },
  {
    id: 5,
    name: 'Loyalty Rewards',
    platform: 'Email',
    status: 'Paused',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-05-01'),
    budget: 3500,
    spent: 1200,
    roi: 2.1,
    impressions: 28450,
    clicks: 1890,
    conversions: 134,
    segments: ['Previous Customers', 'Frequent Buyers'],
  },
];

// Campaign Form Component
const CampaignForm = ({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    budget: '',
    startDate: '',
    endDate: '',
    segments: {
      age: [],
      gender: [],
      location: [],
      behavior: [],
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (value: string) => {
    setFormData(prev => ({ ...prev, platform: value }));
  };

  const handleSegmentChange = (category: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      segments: {
        ...prev.segments,
        [category]: prev.segments[category as keyof typeof prev.segments].includes(value)
          ? (prev.segments[category as keyof typeof prev.segments] as string[]).filter(item => item !== value)
          : [...(prev.segments[category as keyof typeof prev.segments] as string[]), value],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: 'Scheduled',
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      budget: Number(formData.budget),
      spent: 0,
      roi: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      segments: [
        ...formData.segments.age,
        ...formData.segments.gender,
        ...formData.segments.location,
        ...formData.segments.behavior,
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Campaign Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Summer Promotion"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="platform">Platform</Label>
          <Select onValueChange={handlePlatformChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="Social">Social Media</SelectItem>
              <SelectItem value="Search">Search</SelectItem>
              <SelectItem value="Display">Display</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="budget">Budget ($)</Label>
          <Input
            id="budget"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. 5000"
            min="1"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div>
          <Label className="block mb-2">Audience Segments</Label>
          <Tabs defaultValue="age">
            <TabsList className="w-full">
              <TabsTrigger value="age" className="flex-1">Age</TabsTrigger>
              <TabsTrigger value="gender" className="flex-1">Gender</TabsTrigger>
              <TabsTrigger value="location" className="flex-1">Location</TabsTrigger>
              <TabsTrigger value="behavior" className="flex-1">Behavior</TabsTrigger>
            </TabsList>
            
            <TabsContent value="age" className="p-4 border rounded-md mt-2">
              <div className="grid grid-cols-2 gap-2">
                {['Age 18-24', 'Age 25-34', 'Age 35-44', 'Age 45-54', 'Age 55+'].map(age => (
                  <div key={age} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={age}
                      checked={formData.segments.age.includes(age)}
                      onChange={() => handleSegmentChange('age', age)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor={age}>{age}</Label>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="gender" className="p-4 border rounded-md mt-2">
              <div className="grid grid-cols-2 gap-2">
                {['Male', 'Female', 'Non-binary'].map(gender => (
                  <div key={gender} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={gender}
                      checked={formData.segments.gender.includes(gender)}
                      onChange={() => handleSegmentChange('gender', gender)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor={gender}>{gender}</Label>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="location" className="p-4 border rounded-md mt-2">
              <div className="grid grid-cols-2 gap-2">
                {['Urban', 'Suburban', 'Rural', 'International'].map(location => (
                  <div key={location} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={location}
                      checked={formData.segments.location.includes(location)}
                      onChange={() => handleSegmentChange('location', location)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor={location}>{location}</Label>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="behavior" className="p-4 border rounded-md mt-2">
              <div className="grid grid-cols-2 gap-2">
                {['Shoppers', 'Tech Enthusiasts', 'Previous Customers', 'High Income', 'Students', 'Frequent Buyers'].map(behavior => (
                  <div key={behavior} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={behavior}
                      checked={formData.segments.behavior.includes(behavior)}
                      onChange={() => handleSegmentChange('behavior', behavior)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor={behavior}>{behavior}</Label>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Campaign</Button>
      </DialogFooter>
    </form>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Completed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  };
  
  return (
    <Badge variant="outline" className={`${statusStyles[status as keyof typeof statusStyles]}`}>
      {status}
    </Badge>
  );
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false);
  const { toast } = useToast();
  
  // Handle creating a new campaign
  const handleCreateCampaign = (data: any) => {
    const newCampaign = {
      id: Math.max(...campaigns.map(c => c.id)) + 1,
      ...data,
    };
    
    setCampaigns([...campaigns, newCampaign]);
    setShowNewCampaignDialog(false);
    
    toast({
      title: "Campaign created",
      description: `Campaign "${data.name}" has been scheduled.`,
    });
    
    // In a real app, we would post to an API
    console.log('POST /api/campaign', newCampaign);
  };
  
  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter(campaign => {
    // Search filter
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = filterStatus === 'All' || campaign.status === filterStatus;
    
    // Platform filter
    const matchesPlatform = filterPlatform === 'All' || campaign.platform === filterPlatform;
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Campaigns</h1>
          <p className="text-muted-foreground">
            Create, manage, and analyze your marketing campaigns
          </p>
        </div>
        
        <Dialog open={showNewCampaignDialog} onOpenChange={setShowNewCampaignDialog}>
          <DialogTrigger asChild>
            <Button className="ml-auto">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new marketing campaign.
              </DialogDescription>
            </DialogHeader>
            <CampaignForm 
              onSubmit={handleCreateCampaign} 
              onCancel={() => setShowNewCampaignDialog(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filters and search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="w-40">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-40">
                <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      <span>Platform</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Platforms</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Search">Search</SelectItem>
                    <SelectItem value="Display">Display</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Campaign Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign List</CardTitle>
          <CardDescription>
            {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium">Platform</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Period</th>
                  <th className="text-right py-3 px-4 font-medium">Budget</th>
                  <th className="text-right py-3 px-4 font-medium">ROI</th>
                  <th className="text-center py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {campaign.segments.slice(0, 2).join(', ')}
                          {campaign.segments.length > 2 && `+${campaign.segments.length - 2} more`}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{campaign.platform}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={campaign.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {format(campaign.startDate, 'MMM d')} - {format(campaign.endDate, 'MMM d, yyyy')}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div>
                        <div className="font-medium">${campaign.budget.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          ${campaign.spent.toLocaleString()} spent
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 dark:bg-gray-700">
                          <div 
                            className="bg-prismatech-blue h-1.5 rounded-full" 
                            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="font-medium">
                        {campaign.roi ? `${campaign.roi}x` : '-'}
                      </div>
                      {campaign.roi > 0 && (
                        <div className="text-xs text-green-600 dark:text-green-400 flex items-center justify-end mt-1">
                          <Check className="mr-1 h-3 w-3" />
                          Positive
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="ghost" size="icon" title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {campaign.status === 'Active' ? (
                          <Button variant="ghost" size="icon" title="Pause">
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : campaign.status === 'Paused' ? (
                          <Button variant="ghost" size="icon" title="Resume">
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" title="Delete">
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredCampaigns.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No campaigns found. Try adjusting your filters or create a new campaign.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Campaigns;
