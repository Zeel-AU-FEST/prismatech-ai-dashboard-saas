
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  LineChart, 
  Line,
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar
} from 'recharts';
import {
  Download,
  Filter,
  Lightbulb,
  Users,
  Zap,
  ArrowRight,
  TrendingUp,
  Share2,
  Star,
  Clock,
  Copy,
  BookmarkCheck
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Segment chip component
const SegmentChip = ({ segment, active, onClick }: { segment: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm transition-colors ${
      active 
        ? 'bg-prismatech-blue text-white'
        : 'bg-secondary hover:bg-secondary/80 text-foreground'
    }`}
  >
    {segment}
  </button>
);

// Recommendation card component
const RecommendationCard = ({ title, description, impact, effort, tags }: {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
  tags: string[];
}) => {
  const impactColors = {
    High: 'text-green-600 dark:text-green-400',
    Medium: 'text-amber-600 dark:text-amber-400',
    Low: 'text-blue-600 dark:text-blue-400',
  };
  
  const effortColors = {
    Low: 'text-green-600 dark:text-green-400',
    Medium: 'text-amber-600 dark:text-amber-400',
    High: 'text-red-600 dark:text-red-400',
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-secondary/50">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <div>
            <span className="text-muted-foreground mr-1">Impact:</span>
            <span className={impactColors[impact]}>{impact}</span>
          </div>
          <div>
            <span className="text-muted-foreground mr-1">Effort:</span>
            <span className={effortColors[effort]}>{effort}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-2">
        <Button variant="ghost" className="w-full flex items-center justify-center gap-1">
          <BookmarkCheck className="h-4 w-4" />
          <span>Save to Strategy</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Performance table component
const PerformanceTable = ({ data }: { data: any[] }) => {
  const [sortField, setSortField] = useState('roi');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const sortedData = [...data].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Campaign</th>
            <th 
              className="text-left py-3 px-4 font-medium cursor-pointer hover:text-primary"
              onClick={() => handleSort('segment')}
            >
              Segment
              {sortField === 'segment' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th 
              className="text-right py-3 px-4 font-medium cursor-pointer hover:text-primary"
              onClick={() => handleSort('ctr')}
            >
              CTR
              {sortField === 'ctr' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th 
              className="text-right py-3 px-4 font-medium cursor-pointer hover:text-primary"
              onClick={() => handleSort('convRate')}
            >
              Conv. Rate
              {sortField === 'convRate' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th 
              className="text-right py-3 px-4 font-medium cursor-pointer hover:text-primary"
              onClick={() => handleSort('roi')}
            >
              ROI
              {sortField === 'roi' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 px-4">{item.campaign}</td>
              <td className="py-3 px-4">{item.segment}</td>
              <td className="py-3 px-4 text-right">{item.ctr}%</td>
              <td className="py-3 px-4 text-right">{item.convRate}%</td>
              <td className="py-3 px-4 text-right font-medium">
                <span className={item.roi >= 2 ? 'text-green-600 dark:text-green-400' : ''}>
                  {item.roi.toFixed(1)}x
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Insights = () => {
  const [activeSegment, setActiveSegment] = useState('All Segments');
  const { toast } = useToast();
  
  // Demographic segments
  const segments = [
    'All Segments',
    'Age 18-24',
    'Age 25-34',
    'Age 35-44',
    'Age 45+',
    'Male',
    'Female',
    'Urban',
    'Suburban',
    'High Income',
    'Previous Customers',
  ];
  
  // Mock insights recommendations
  const recommendations = [
    {
      title: 'Increase Social Ad Frequency for Age 25-34',
      description: 'This demographic shows 2.3x higher engagement but current frequency is below optimal levels.',
      impact: 'High' as const,
      effort: 'Low' as const,
      tags: ['Social Media', 'Frequency Optimization', 'Young Adults'],
    },
    {
      title: 'Create Loyalty Program for High-Value Customers',
      description: 'Analysis shows repeat purchase rate could increase by 20% with structured loyalty incentives.',
      impact: 'High' as const,
      effort: 'Medium' as const,
      tags: ['Customer Retention', 'Loyalty', 'High LTV'],
    },
    {
      title: 'Adjust Email Send Times for Urban Segment',
      description: 'Open rates peak 2-3 hours later than suburban segment. Adjust send time to 8PM local time.',
      impact: 'Medium' as const,
      effort: 'Low' as const,
      tags: ['Email Marketing', 'Timing Optimization', 'Urban'],
    },
    {
      title: 'Develop Video Content for Product Tutorials',
      description: 'Analysis shows 45% higher conversion when prospects view tutorial content before purchase.',
      impact: 'Medium' as const,
      effort: 'High' as const,
      tags: ['Content Strategy', 'Video', 'Conversion Optimization'],
    },
  ];
  
  // Audience distribution data for pie chart
  const audienceData = [
    { name: 'Age 18-24', value: 20 },
    { name: 'Age 25-34', value: 35 },
    { name: 'Age 35-44', value: 25 },
    { name: 'Age 45+', value: 20 },
  ];
  
  // Engagement data for radar chart
  const engagementData = [
    { subject: 'Social Media', A: 120, B: 110, fullMark: 150 },
    { subject: 'Email', A: 98, B: 130, fullMark: 150 },
    { subject: 'Web', A: 86, B: 130, fullMark: 150 },
    { subject: 'Mobile App', A: 99, B: 100, fullMark: 150 },
    { subject: 'Search', A: 85, B: 90, fullMark: 150 },
    { subject: 'Display', A: 65, B: 85, fullMark: 150 },
  ];
  
  // Performance data for table
  const performanceData = [
    { campaign: 'Summer Sale', segment: 'Age 25-34', ctr: 4.2, convRate: 3.8, roi: 2.7 },
    { campaign: 'Summer Sale', segment: 'Age 35-44', ctr: 3.1, convRate: 2.9, roi: 1.8 },
    { campaign: 'Product Launch', segment: 'High Income', ctr: 5.7, convRate: 4.2, roi: 3.1 },
    { campaign: 'Product Launch', segment: 'Previous Customers', ctr: 7.3, convRate: 5.8, roi: 3.6 },
    { campaign: 'Brand Awareness', segment: 'Age 18-24', ctr: 3.8, convRate: 1.5, roi: 1.2 },
    { campaign: 'Brand Awareness', segment: 'Urban', ctr: 4.5, convRate: 2.3, roi: 1.7 },
    { campaign: 'Retargeting', segment: 'Abandoned Cart', ctr: 8.2, convRate: 6.1, roi: 4.3 },
    { campaign: 'Retargeting', segment: 'Product Viewers', ctr: 6.5, convRate: 4.2, roi: 3.2 },
  ];
  
  // Channel preference data for bar chart
  const channelData = [
    { name: 'Email', value: 45 },
    { name: 'Social', value: 65 },
    { name: 'Search', value: 35 },
    { name: 'Display', value: 25 },
    { name: 'Video', value: 55 },
  ];
  
  // Time series data for line chart
  const timeSeriesData = [
    { month: 'Jan', engagement: 20 },
    { month: 'Feb', engagement: 25 },
    { month: 'Mar', engagement: 30 },
    { month: 'Apr', engagement: 35 },
    { month: 'May', engagement: 45 },
    { month: 'Jun', engagement: 40 },
    { month: 'Jul', engagement: 50 },
  ];
  
  const COLORS = ['#0077B6', '#8B5CF6', '#34D399', '#F59E0B', '#EF4444'];
  
  // Handle exporting data
  const handleExport = (format: string) => {
    toast({
      title: "Report exported",
      description: `Your insights report has been downloaded as ${format}`,
    });
  };
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Audience Insights</h1>
          <p className="text-muted-foreground">
            Discover patterns and opportunities across your marketing segments
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex gap-2 items-center">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Export Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleExport('PDF')}>
              <Copy className="h-4 w-4 mr-2" />
              <span>PDF Report</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('Excel')}>
              <Copy className="h-4 w-4 mr-2" />
              <span>Excel Spreadsheet</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('CSV')}>
              <Copy className="h-4 w-4 mr-2" />
              <span>CSV Raw Data</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Audience Segments Chips */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 mr-2 text-muted-foreground" />
            <h2 className="text-lg font-medium">Audience Segments</h2>
            <Button variant="ghost" size="icon" className="ml-auto" title="Filter segments">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {segments.map((segment) => (
              <SegmentChip
                key={segment}
                segment={segment}
                active={activeSegment === segment}
                onClick={() => setActiveSegment(segment)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Data Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* Audience Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Audience Age Distribution</CardTitle>
            <CardDescription>Breakdown of audience by age</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {audienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Channel Preference */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Preference</CardTitle>
            <CardDescription>Engagement level across channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" unit="%" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Engagement']} />
                  <Bar dataKey="value" fill="#0077B6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Engagement Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
            <CardDescription>Monthly engagement patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis unit="%" />
                  <Tooltip formatter={(value) => [`${value}%`, 'Engagement']} />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#8B5CF6" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Channel Engagement Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Channel Engagement Comparison</CardTitle>
          <CardDescription>Current vs Previous Quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={engagementData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar
                  name="Current Quarter"
                  dataKey="A"
                  stroke="#0077B6"
                  fill="#0077B6"
                  fillOpacity={0.5}
                />
                <Radar
                  name="Previous Quarter"
                  dataKey="B"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.5}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* AI Strategy Recommendations */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-prismatech-lime" />
              <span>AI Strategy Recommendations</span>
            </CardTitle>
            <CardDescription>
              Personalized suggestions based on your audience data
            </CardDescription>
          </div>
          
          <Button variant="outline" className="ml-auto" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            <span>Share</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <RecommendationCard
                key={index}
                title={rec.title}
                description={rec.description}
                impact={rec.impact}
                effort={rec.effort}
                tags={rec.tags}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Past Campaign Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance by Segment</CardTitle>
          <CardDescription>
            Compare metrics across different audience segments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="visual">Visual Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="table">
              <PerformanceTable data={performanceData} />
            </TabsContent>
            
            <TabsContent value="visual">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="segment" 
                      angle={-45} 
                      textAnchor="end" 
                      height={80} 
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ctr" name="CTR (%)" fill="#0077B6" />
                    <Bar dataKey="convRate" name="Conversion Rate (%)" fill="#34D399" />
                    <Bar dataKey="roi" name="ROI (x)" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/30 px-6 py-4">
          <div className="flex items-center text-sm">
            <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
            <span className="text-muted-foreground">
              <span className="font-medium">Pro Tip:</span> Focus on segments with high conversion but low exposure.
            </span>
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Star className="h-4 w-4 mr-2" />
            <span>Create Lookalike Audience</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Insights;
