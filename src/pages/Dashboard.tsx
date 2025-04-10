
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, MousePointer } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Mock data for the line chart (ROI Over Time)
const roiData = [
  { month: 'Jan', roi: 1.2 },
  { month: 'Feb', roi: 1.5 },
  { month: 'Mar', roi: 1.3 },
  { month: 'Apr', roi: 1.7 },
  { month: 'May', roi: 1.9 },
  { month: 'Jun', roi: 2.2 },
  { month: 'Jul', roi: 2.3 },
  { month: 'Aug', roi: 2.5 },
];

// Mock data for the bar chart (CTR Trends by Channel)
const ctrData = [
  { channel: 'Email', ctr: 3.8 },
  { channel: 'Social', ctr: 2.2 },
  { channel: 'Search', ctr: 4.5 },
  { channel: 'Display', ctr: 1.2 },
  { channel: 'Video', ctr: 3.1 },
];

// Mock alert data
const alertsData = [
  {
    id: 1,
    title: 'Campaign performance spike',
    message: 'Email campaign "Summer Sale" seeing 35% higher CTR than average.',
    timestamp: '20 min ago',
    type: 'success',
  },
  {
    id: 2,
    title: 'Budget alert',
    message: 'Search campaign "Product Launch" is 80% through budget with 10 days remaining.',
    timestamp: '45 min ago',
    type: 'warning',
  },
  {
    id: 3,
    title: 'New AI insight',
    message: 'Our AI detected a new audience segment responding well to your ads.',
    timestamp: '1 hour ago',
    type: 'info',
  },
  {
    id: 4,
    title: 'Engagement drop',
    message: 'Social media campaign "Brand Awareness" has seen a 15% drop in engagement.',
    timestamp: '2 hours ago',
    type: 'error',
  },
];

// Mock campaign data
const campaignData = [
  {
    id: 1,
    name: 'Summer Sale',
    platform: 'Email',
    status: 'Active',
    budget: 1500,
    spent: 845,
    roi: 2.3,
  },
  {
    id: 2,
    name: 'Product Launch',
    platform: 'Search',
    status: 'Active',
    budget: 5000,
    spent: 4100,
    roi: 1.8,
  },
  {
    id: 3,
    name: 'Brand Awareness',
    platform: 'Social',
    status: 'Active',
    budget: 3000,
    spent: 1890,
    roi: 1.2,
  },
  {
    id: 4,
    name: 'Retargeting',
    platform: 'Display',
    status: 'Paused',
    budget: 2000,
    spent: 1200,
    roi: 1.5,
  },
];

// Summary Card component
const SummaryCard = ({ title, value, trend, icon: Icon, trendLabel, trendDirection }: {
  title: string;
  value: string;
  trend: string;
  icon: React.ElementType;
  trendLabel: string;
  trendDirection: 'up' | 'down';
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {trendDirection === 'up' ? (
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm ${trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </span>
        <span className="text-sm text-muted-foreground ml-1">{trendLabel}</span>
      </div>
    </CardContent>
  </Card>
);

// Alert component
const AlertItem = ({ alert }: { alert: any }) => {
  const typeColors = {
    success: 'border-l-green-500 bg-green-50 dark:bg-green-950/20',
    warning: 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/20',
    error: 'border-l-red-500 bg-red-50 dark:bg-red-950/20',
    info: 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20',
  };

  return (
    <div className={`p-4 border-l-4 mb-3 rounded-r ${typeColors[alert.type as keyof typeof typeColors]}`}>
      <h4 className="font-medium">{alert.title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
      <p className="text-xs text-muted-foreground mt-2">{alert.timestamp}</p>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    roi: { value: '1.95x', trend: '12.3%', trendLabel: 'vs last month', trendDirection: 'up' as const },
    engagement: { value: '24.8%', trend: '5.7%', trendLabel: 'vs last month', trendDirection: 'up' as const },
    budget: { value: '$12,450', trend: '65.3%', trendLabel: 'utilized', trendDirection: 'up' as const },
    conversions: { value: '1,284', trend: '8.2%', trendLabel: 'vs last month', trendDirection: 'up' as const },
  });

  // Simulate API fetch
  useEffect(() => {
    // Placeholder for API call
    const fetchMetrics = async () => {
      console.log('Fetching dashboard metrics...');
      // In a real app, we would fetch from an API
      // const response = await fetch('/api/metrics');
      // const data = await response.json();
      // setMetrics(data);
    };

    fetchMetrics();
  }, []);

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI-Powered Marketing Optimization</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}. Here's your marketing performance at a glance.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard 
          title="ROI" 
          value={metrics.roi.value} 
          trend={metrics.roi.trend} 
          trendLabel={metrics.roi.trendLabel} 
          trendDirection={metrics.roi.trendDirection} 
          icon={DollarSign} 
        />
        <SummaryCard 
          title="Engagement Rate" 
          value={metrics.engagement.value} 
          trend={metrics.engagement.trend} 
          trendLabel={metrics.engagement.trendLabel} 
          trendDirection={metrics.engagement.trendDirection} 
          icon={Users} 
        />
        <SummaryCard 
          title="Budget Usage" 
          value={metrics.budget.value} 
          trend={metrics.budget.trend} 
          trendLabel={metrics.budget.trendLabel} 
          trendDirection={metrics.budget.trendDirection} 
          icon={DollarSign} 
        />
        <SummaryCard 
          title="Conversions" 
          value={metrics.conversions.value} 
          trend={metrics.conversions.trend} 
          trendLabel={metrics.conversions.trendLabel} 
          trendDirection={metrics.conversions.trendDirection} 
          icon={MousePointer} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* ROI Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign ROI Over Time</CardTitle>
              <CardDescription>Monthly return on investment for all campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={roiData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}x`, 'ROI']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="roi" 
                      stroke="#0077B6" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* CTR Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>CTR by Channel</CardTitle>
              <CardDescription>Click-through rates across different marketing channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ctrData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'CTR']}
                      labelFormatter={(label) => `Channel: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="ctr" name="Click-Through Rate" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Table */}
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Overview of your current marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Campaign</th>
                      <th className="text-left py-3 px-4 font-medium">Platform</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Budget</th>
                      <th className="text-right py-3 px-4 font-medium">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignData.map((campaign) => (
                      <tr key={campaign.id} className="border-b">
                        <td className="py-3 px-4">{campaign.name}</td>
                        <td className="py-3 px-4">{campaign.platform}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            campaign.status === 'Active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          ${campaign.budget.toLocaleString()}
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 dark:bg-gray-700">
                            <div 
                              className="bg-prismatech-blue h-1.5 rounded-full" 
                              style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          {campaign.roi}x
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section (1/3 width) */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Real-Time Alerts</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alertsData.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
