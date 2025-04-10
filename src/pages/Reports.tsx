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
import { Input } from '@/components/ui/input';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import {
  Calendar,
  Download,
  Search,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Check,
  X,
  MessageSquareText,
  ArrowRight,
  Lightbulb,
  FileText,
  Mail,
  Copy,
  Sparkles
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const ActivityItem = ({ activity }: { activity: any }) => {
  const statusColors = {
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400',
  };
  
  const statusIcons = {
    success: <Check className="h-5 w-5 text-green-600 dark:text-green-400" />,
    warning: <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
    error: <X className="h-5 w-5 text-red-600 dark:text-red-400" />,
    info: <MessageSquareText className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  };
  
  const activityTypeColors = {
    campaign: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    audience: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    system: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    metric: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };
  
  return (
    <div className="flex gap-4 py-4 border-b last:border-0">
      <div className="flex-shrink-0 mt-1">
        {statusIcons[activity.status as keyof typeof statusIcons]}
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className={activityTypeColors[activity.type as keyof typeof activityTypeColors]}>
            {activity.type}
          </Badge>
          <span className="text-sm text-muted-foreground">{activity.time}</span>
        </div>
        <p className="font-medium">{activity.title}</p>
        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
        {activity.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
            {activity.metrics.map((metric: any, index: number) => (
              <div key={index}>
                <p className="text-sm text-muted-foreground">{metric.name}</p>
                <div className="flex items-center mt-1">
                  <span className="text-lg font-semibold mr-1">{metric.value}</span>
                  {metric.change !== 0 && (
                    <span className={`text-xs flex items-center ${
                      metric.change > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {metric.change > 0 ? (
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-0.5" />
                      )}
                      {Math.abs(metric.change)}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {activity.actions && (
          <div className="flex gap-2 mt-3">
            {activity.actions.map((action: any, index: number) => (
              <Button key={index} variant="outline" size="sm">
                {action}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const AISummaryCard = ({ summary }: { summary: any }) => {
  return (
    <Card className="border-prismatech-lime/30 bg-prismatech-lime/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-prismatech-lime" />
          <CardTitle className="text-lg">AI Campaign Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">What Worked Well</h3>
            <ul className="space-y-2">
              {summary.positives.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Areas for Improvement</h3>
            <ul className="space-y-2">
              {summary.negatives.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {summary.recommendations.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-2 bg-background border rounded-md p-2">
                  <Lightbulb className="h-4 w-4 text-prismatech-lime mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t">
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          <span>Full Report</span>
        </Button>
        <Button variant="outline" size="sm">
          <Mail className="h-4 w-4 mr-2" />
          <span>Share via Email</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Reports = () => {
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const activityData = [
    {
      id: 1,
      type: 'campaign',
      status: 'success',
      title: 'Summer Sale Campaign Completed',
      description: 'Campaign ran for 45 days and achieved 128% of target ROAS.',
      time: '2 hours ago',
      metrics: [
        { name: 'Impressions', value: '1.2M', change: 15 },
        { name: 'Clicks', value: '85.4K', change: 23 },
        { name: 'Conversions', value: '3,241', change: 18 },
        { name: 'ROAS', value: '2.8x', change: 12 },
      ],
      actions: ['View Details', 'Download Report'],
    },
    {
      id: 2,
      type: 'audience',
      status: 'info',
      title: 'New Audience Segment Identified',
      description: 'AI detected a high-performing audience segment: Urban professionals, age 28-35.',
      time: '4 hours ago',
      actions: ['Create Segment', 'Analyze Further'],
    },
    {
      id: 3,
      type: 'metric',
      status: 'warning',
      title: 'Conversion Rate Declining',
      description: 'Product Launch campaign showing 12% lower conversion rate over the past week.',
      time: '8 hours ago',
      metrics: [
        { name: 'Previous', value: '4.8%', change: 0 },
        { name: 'Current', value: '4.2%', change: -12 },
      ],
      actions: ['Investigate', 'Adjust Campaign'],
    },
    {
      id: 4,
      type: 'system',
      status: 'error',
      title: 'API Connection Error',
      description: 'Connection to analytics service was interrupted. Some data may be delayed.',
      time: '11 hours ago',
      actions: ['Check Status', 'Reconnect'],
    },
    {
      id: 5,
      type: 'campaign',
      status: 'success',
      title: 'A/B Test Completed',
      description: 'Email subject line test completed with clear winner: Variant B outperformed by 23%.',
      time: '1 day ago',
      metrics: [
        { name: 'Variant A CTR', value: '3.2%', change: 0 },
        { name: 'Variant B CTR', value: '3.9%', change: 23 },
      ],
      actions: ['View Results', 'Apply to Campaigns'],
    },
    {
      id: 6,
      type: 'metric',
      status: 'info',
      title: 'ROI Milestone Reached',
      description: 'Brand Awareness campaign has surpassed 200% ROI target.',
      time: '2 days ago',
      metrics: [
        { name: 'Target ROI', value: '2.0x', change: 0 },
        { name: 'Current ROI', value: '2.3x', change: 15 },
      ],
      actions: ['View Campaign'],
    },
  ];
  
  const metricsData = [
    { month: 'Jan', impressions: 320000, clicks: 16000, conversions: 1200 },
    { month: 'Feb', impressions: 350000, clicks: 17500, conversions: 1300 },
    { month: 'Mar', impressions: 410000, clicks: 20500, conversions: 1550 },
    { month: 'Apr', impressions: 450000, clicks: 22500, conversions: 1700 },
    { month: 'May', impressions: 520000, clicks: 26000, conversions: 1950 },
    { month: 'Jun', impressions: 480000, clicks: 24000, conversions: 1800 },
    { month: 'Jul', impressions: 560000, clicks: 28000, conversions: 2100 },
  ];
  
  const roiData = [
    { month: 'Jan', roi: 1.8 },
    { month: 'Feb', roi: 1.9 },
    { month: 'Mar', roi: 2.0 },
    { month: 'Apr', roi: 2.1 },
    { month: 'May', roi: 2.3 },
    { month: 'Jun', roi: 2.2 },
    { month: 'Jul', roi: 2.4 },
  ];
  
  const aiSummary = {
    positives: [
      'Email campaigns consistently outperformed industry benchmarks by 18%',
      'Social media targeting improvements led to 32% higher CTR',
      'Retargeting campaigns achieved 2.7x ROI, up from 2.1x last quarter'
    ],
    negatives: [
      'Mobile ad performance lagging behind desktop by 24%',
      'Video completion rates declining month-over-month',
      'Weekend campaign performance consistently underperforms weekdays'
    ],
    recommendations: [
      'Increase budget allocation to email retargeting by 20%',
      'Test new creative formats for mobile ad placements',
      'Develop specific weekend promotions to boost engagement',
      'Expand high-performing lookalike audiences to more campaigns'
    ]
  };
  
  const filteredActivities = activityData.filter(activity => {
    const matchesPeriod = filterPeriod === 'all' || 
      (filterPeriod === 'today' && activity.time.includes('hours')) ||
      (filterPeriod === 'week' && !activity.time.includes('month'));
    
    const matchesType = filterType === 'all' || activity.type === filterType;
    
    const matchesSearch = searchQuery === '' || 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesPeriod && matchesType && matchesSearch;
  });
  
  const handleExport = (format: string) => {
    toast({
      title: "Report exported",
      description: `Your report has been downloaded as ${format}`,
    });
  };
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Performance metrics and campaign activity logs
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Metrics</CardTitle>
            <CardDescription>Key performance indicators over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={metricsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      value.toLocaleString(), 
                      typeof name === 'string' 
                        ? name.charAt(0).toUpperCase() + name.slice(1)
                        : name.toString()
                    ]}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="impressions"
                    name="Impressions"
                    fill="#0077B6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="clicks"
                    name="Clicks"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="conversions"
                    name="Conversions"
                    fill="#34D399"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ROI Trend</CardTitle>
            <CardDescription>Return on investment over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={roiData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[1.5, 2.5]} />
                  <Tooltip formatter={(value) => [`${value}x`, 'ROI']} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="roi"
                    name="ROI"
                    stroke="#0077B6"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <AISummaryCard summary={aiSummary} />
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Campaign Activity Timeline</CardTitle>
              <CardDescription>
                Recent actions and updates from your campaigns
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search activities..."
                  className="pl-10 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Activity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="campaign">Campaign</SelectItem>
                  <SelectItem value="audience">Audience</SelectItem>
                  <SelectItem value="metric">Metrics</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No activities found with the current filters.</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setFilterPeriod('all');
                  setFilterType('all');
                  setSearchQuery('');
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredActivities.length} of {activityData.length} activities
          </p>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={filteredActivities.length === activityData.length}>
              Load More
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              <span>Export Log</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Reports;
