import { useState, useEffect } from 'react';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { 
  Award, 
  BrainCircuit, 
  FileUp, 
  Timer, 
  TrendingUp, 
  Upload,
  Plus,
  Eye,
  Sparkles,
  FlaskConical,
  Check
} from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Component for the test form
const TestForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    testName: '',
    targetAudience: '',
    variantA: {
      title: '',
      content: '',
      image: null,
    },
    variantB: {
      title: '',
      content: '',
      image: null,
    },
  });
  
  const handleChange = (variant: 'variantA' | 'variantB', field: 'title' | 'content') => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [variant]: {
        ...prev[variant],
        [field]: e.target.value,
      },
    }));
  };
  
  const handleFileChange = (variant: 'variantA' | 'variantB') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you'd handle the file upload to a server
      setFormData(prev => ({
        ...prev,
        [variant]: {
          ...prev[variant],
          image: URL.createObjectURL(e.target.files![0]),
        },
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="testName">Test Name</Label>
          <Input
            id="testName"
            value={formData.testName}
            onChange={(e) => setFormData(prev => ({ ...prev, testName: e.target.value }))}
            placeholder="e.g. Summer Email Subject Line Test"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="targetAudience">Target Audience</Label>
          <Input
            id="targetAudience"
            value={formData.targetAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
            placeholder="e.g. New customers, aged 25-34"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Variant A */}
          <Card>
            <CardHeader>
              <CardTitle>Variant A</CardTitle>
              <CardDescription>The first version to test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="variantATitle">Title/Headline</Label>
                <Input
                  id="variantATitle"
                  value={formData.variantA.title}
                  onChange={handleChange('variantA', 'title')}
                  placeholder="e.g. Save 20% This Summer"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="variantAContent">Content</Label>
                <Textarea
                  id="variantAContent"
                  value={formData.variantA.content}
                  onChange={handleChange('variantA', 'content')}
                  placeholder="Enter the content for Variant A"
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="variantAImage">Image (Optional)</Label>
                <div className="mt-2">
                  {formData.variantA.image ? (
                    <div className="relative">
                      <img
                        src={formData.variantA.image as string}
                        alt="Variant A Preview"
                        className="object-cover rounded-md h-32 w-full"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          variantA: { ...prev.variantA, image: null }
                        }))}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-md p-4 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <Label
                        htmlFor="variantAImageInput"
                        className="cursor-pointer text-primary hover:underline"
                      >
                        Click to upload an image
                      </Label>
                      <Input
                        id="variantAImageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange('variantA')}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG, or GIF up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Variant B */}
          <Card>
            <CardHeader>
              <CardTitle>Variant B</CardTitle>
              <CardDescription>The second version to test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="variantBTitle">Title/Headline</Label>
                <Input
                  id="variantBTitle"
                  value={formData.variantB.title}
                  onChange={handleChange('variantB', 'title')}
                  placeholder="e.g. Limited Time: 20% Off Everything"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="variantBContent">Content</Label>
                <Textarea
                  id="variantBContent"
                  value={formData.variantB.content}
                  onChange={handleChange('variantB', 'content')}
                  placeholder="Enter the content for Variant B"
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="variantBImage">Image (Optional)</Label>
                <div className="mt-2">
                  {formData.variantB.image ? (
                    <div className="relative">
                      <img
                        src={formData.variantB.image as string}
                        alt="Variant B Preview"
                        className="object-cover rounded-md h-32 w-full"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          variantB: { ...prev.variantB, image: null }
                        }))}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-md p-4 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <Label
                        htmlFor="variantBImageInput"
                        className="cursor-pointer text-primary hover:underline"
                      >
                        Click to upload an image
                      </Label>
                      <Input
                        id="variantBImageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange('variantB')}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG, or GIF up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Start A/B Test
      </Button>
    </form>
  );
};

// Component for test results
const TestResults = ({ test }: { test: any }) => {
  const winnerVariant = test.variantA.ctr > test.variantB.ctr ? 'A' : 'B';
  const winningPercentage = Math.round(
    Math.abs(test.variantA.ctr - test.variantB.ctr) / 
    Math.min(test.variantA.ctr, test.variantB.ctr) * 100
  );
  
  // Data for pie chart
  const conversionData = [
    { name: 'Variant A', value: test.variantA.conversions },
    { name: 'Variant B', value: test.variantB.conversions },
  ];
  
  // Data for bar chart
  const performanceData = [
    { name: 'Impressions', A: test.variantA.impressions, B: test.variantB.impressions },
    { name: 'Clicks', A: test.variantA.clicks, B: test.variantB.clicks },
    { name: 'Conversions', A: test.variantA.conversions, B: test.variantB.conversions },
  ];
  
  // Data for CTR comparison
  const ctrData = [
    { name: 'Variant A', value: test.variantA.ctr },
    { name: 'Variant B', value: test.variantB.ctr },
  ];
  
  const COLORS = ['#0077B6', '#8B5CF6'];
  
  return (
    <div className="space-y-8">
      {/* Winner Banner */}
      <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-800 dark:text-green-400 font-medium">
          We have a winner!
        </AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-300">
          Variant {winnerVariant} outperformed by {winningPercentage}% with a {test[`variant${winnerVariant}`].ctr}% click-through rate.
        </AlertDescription>
      </Alert>
      
      {/* AI Insights */}
      <Card className="border-prismatech-lime/30 bg-prismatech-lime/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-prismatech-lime" />
            <CardTitle className="text-lg">AI Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {test.aiInsights}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {test.aiTags.map((tag: string, index: number) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 rounded-full bg-prismatech-lime/20 px-2.5 py-0.5 text-xs font-medium text-prismatech-text"
              >
                <BrainCircuit className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Test Details and Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Variant Details */}
        <Card>
          <CardHeader>
            <CardTitle>Test Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Variant A</h4>
                <div className="border rounded-md p-3">
                  <p className="font-medium">{test.variantA.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{test.variantA.content}</p>
                  {test.variantA.image && (
                    <img 
                      src={test.variantA.image} 
                      alt="Variant A" 
                      className="mt-2 rounded-md h-24 w-full object-cover"
                    />
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Variant B</h4>
                <div className="border rounded-md p-3">
                  <p className="font-medium">{test.variantB.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{test.variantB.content}</p>
                  {test.variantB.image && (
                    <img 
                      src={test.variantB.image} 
                      alt="Variant B" 
                      className="mt-2 rounded-md h-24 w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Target Audience:</span> {test.targetAudience}
              </div>
              <div className="flex items-center">
                <Timer className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>Test ran for {test.duration} days</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>Total impressions: {test.variantA.impressions + test.variantB.impressions}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Click-Through Rate Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Click-Through Rate</CardTitle>
            <CardDescription>
              Percentage of viewers who clicked on each variant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ctrData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" unit="%" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => [`${value}%`, 'CTR']} />
                  <Bar dataKey="value" name="Click-Through Rate">
                    {ctrData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-sm font-medium">Variant A</p>
                <p className="text-2xl font-bold text-[#0077B6]">{test.variantA.ctr}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Variant B</p>
                <p className="text-2xl font-bold text-[#8B5CF6]">{test.variantB.ctr}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Comparing key metrics between both variants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="A" name="Variant A" fill="#0077B6" />
                    <Bar dataKey="B" name="Variant B" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="table">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Metric</th>
                      <th className="text-right py-3 px-4 font-medium">Variant A</th>
                      <th className="text-right py-3 px-4 font-medium">Variant B</th>
                      <th className="text-right py-3 px-4 font-medium">Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Impressions</td>
                      <td className="py-3 px-4 text-right">{test.variantA.impressions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{test.variantB.impressions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        {Math.abs(test.variantA.impressions - test.variantB.impressions) === 0 ? (
                          <span>Equal</span>
                        ) : (
                          <span className={test.variantA.impressions > test.variantB.impressions ? 'text-green-600' : 'text-amber-600'}>
                            {Math.abs(test.variantA.impressions - test.variantB.impressions).toLocaleString()} {' '}
                            {test.variantA.impressions > test.variantB.impressions ? 'more in A' : 'more in B'}
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Clicks</td>
                      <td className="py-3 px-4 text-right">{test.variantA.clicks.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{test.variantB.clicks.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        {Math.abs(test.variantA.clicks - test.variantB.clicks) === 0 ? (
                          <span>Equal</span>
                        ) : (
                          <span className={test.variantA.clicks > test.variantB.clicks ? 'text-green-600' : 'text-amber-600'}>
                            {Math.abs(test.variantA.clicks - test.variantB.clicks).toLocaleString()} {' '}
                            {test.variantA.clicks > test.variantB.clicks ? 'more in A' : 'more in B'}
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">CTR</td>
                      <td className="py-3 px-4 text-right">{test.variantA.ctr}%</td>
                      <td className="py-3 px-4 text-right">{test.variantB.ctr}%</td>
                      <td className="py-3 px-4 text-right">
                        {Math.abs(test.variantA.ctr - test.variantB.ctr) === 0 ? (
                          <span>Equal</span>
                        ) : (
                          <span className={test.variantA.ctr > test.variantB.ctr ? 'text-green-600' : 'text-amber-600'}>
                            {Math.abs(test.variantA.ctr - test.variantB.ctr).toFixed(1)}% {' '}
                            {test.variantA.ctr > test.variantB.ctr ? 'higher in A' : 'higher in B'}
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Conversions</td>
                      <td className="py-3 px-4 text-right">{test.variantA.conversions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{test.variantB.conversions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        {Math.abs(test.variantA.conversions - test.variantB.conversions) === 0 ? (
                          <span>Equal</span>
                        ) : (
                          <span className={test.variantA.conversions > test.variantB.conversions ? 'text-green-600' : 'text-amber-600'}>
                            {Math.abs(test.variantA.conversions - test.variantB.conversions).toLocaleString()} {' '}
                            {test.variantA.conversions > test.variantB.conversions ? 'more in A' : 'more in B'}
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Conversion Rate</td>
                      <td className="py-3 px-4 text-right">{(test.variantA.conversions / test.variantA.clicks * 100).toFixed(1)}%</td>
                      <td className="py-3 px-4 text-right">{(test.variantB.conversions / test.variantB.clicks * 100).toFixed(1)}%</td>
                      <td className="py-3 px-4 text-right">
                        {Math.abs((test.variantA.conversions / test.variantA.clicks) - (test.variantB.conversions / test.variantB.clicks)) < 0.0001 ? (
                          <span>Equal</span>
                        ) : (
                          <span className={(test.variantA.conversions / test.variantA.clicks) > (test.variantB.conversions / test.variantB.clicks) ? 'text-green-600' : 'text-amber-600'}>
                            {Math.abs((test.variantA.conversions / test.variantA.clicks) - (test.variantB.conversions / test.variantB.clicks) * 100).toFixed(1)}% {' '}
                            {(test.variantA.conversions / test.variantA.clicks) > (test.variantB.conversions / test.variantB.clicks) ? 'higher in A' : 'higher in B'}
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {test.recommendations.map((recommendation: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 dark:bg-green-900">
                  <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                </div>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline">Download Report</Button>
          <Button>Apply to Campaign</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Component for test history
const TestHistory = ({ tests, onSelectTest }: { tests: any[]; onSelectTest: (test: any) => void }) => {
  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <Card key={test.id} className="hover:border-primary/50 cursor-pointer transition-colors" onClick={() => onSelectTest(test)}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="font-medium">{test.testName}</h3>
                <p className="text-sm text-muted-foreground">{test.targetAudience}</p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <Timer className="h-3 w-3 mr-1" />
                  <span>{test.startDate} ({test.duration} days)</span>
                </div>
              </div>
              
              <div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-1">Winner:</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      test.winner === 'A' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                      Variant {test.winner}
                    </span>
                  </div>
                  <div className="text-xs flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600">{test.improvement}% improvement</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Main A/B Testing page component
const ABTesting = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Mock test history data
  const [testHistory, setTestHistory] = useState([
    {
      id: 1,
      testName: 'Email Subject Line Test',
      targetAudience: 'Previous customers, aged 25-54',
      startDate: 'Apr 1, 2025',
      duration: 14,
      winner: 'B',
      improvement: 23,
      variantA: {
        title: 'Last Chance: 20% Off Summer Collection',
        content: 'Don\'t miss our biggest sale of the season. Shop now before items sell out!',
        image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2215&auto=format&fit=crop',
        impressions: 5000,
        clicks: 350,
        ctr: 7.0,
        conversions: 52,
      },
      variantB: {
        title: 'Summer Collection: 20% Off Ends Tomorrow',
        content: 'Shop our summer collection with 20% off everything. Offer ends tomorrow!',
        image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2215&auto=format&fit=crop',
        impressions: 5000,
        clicks: 430,
        ctr: 8.6,
        conversions: 74,
      },
      aiInsights: 'Variant B performed better by creating a sense of urgency with "Ends Tomorrow" while being specific about the offer. The straightforward product-focused approach resonated better with the audience than the "Last Chance" messaging.',
      aiTags: ['Urgency', 'Specificity', 'Product Focus', 'Clear Timeline'],
      recommendations: [
        'Apply the winning variant to your upcoming summer campaign',
        'Test adding a specific percentage in future subject lines',
        'Consider A/B testing the email layout next',
        'Run a follow-up test with segment breakdown by previous purchase behavior'
      ]
    },
    {
      id: 2,
      testName: 'Call-to-Action Button Test',
      targetAudience: 'Website visitors, all demographics',
      startDate: 'Mar 15, 2025',
      duration: 7,
      winner: 'A',
      improvement: 15,
      variantA: {
        title: 'Get Started Free',
        content: 'Start your 14-day free trial today. No credit card required.',
        impressions: 8500,
        clicks: 425,
        ctr: 5.0,
        conversions: 85,
      },
      variantB: {
        title: 'Sign Up Now',
        content: 'Create your account and start using our platform today.',
        impressions: 8500,
        clicks: 365,
        ctr: 4.3,
        conversions: 62,
      },
      aiInsights: 'The "Get Started Free" CTA had a stronger performance, likely because it emphasized the free trial and eliminated friction by mentioning "No credit card required." This addresses the common concern about unexpected charges.',
      aiTags: ['Friction Reduction', 'Value Proposition', 'Clear Benefit'],
      recommendations: [
        'Update all CTAs to use "Get Started Free" messaging',
        'Emphasize "no credit card required" in proximity to sign-up buttons',
        'Test variations of free-focused CTAs in different colors',
        'Add this messaging to paid ad campaigns'
      ]
    },
  ]);
  
  // Function to handle creating new test
  const handleCreateTest = async (formData: any) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log the form data (in a real app, this would be sent to an API)
    console.log('POST /api/ab-test', formData);
    
    // Show success notification
    toast({
      title: "A/B Test Created",
      description: `Your test "${formData.testName}" has been set up and will start running shortly.`,
    });
    
    setIsLoading(false);
    setActiveTab('history');
  };
  
  // Function to handle selecting a test from history
  const handleSelectTest = (test: any) => {
    setSelectedTest(test);
    setActiveTab('results');
  };
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">A/B Testing</h1>
        <p className="text-muted-foreground">
          Compare different versions of your marketing content to see what resonates best with your audience.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full md:w-auto grid grid-cols-3 md:inline-flex">
          <TabsTrigger value="create" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Create Test</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <FlaskConical className="h-4 w-4" />
            <span>Test History</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-1" disabled={!selectedTest}>
            <Award className="h-4 w-4" />
            <span>Results</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New A/B Test</CardTitle>
              <CardDescription>
                Set up two variants to test against each other
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-prismatech-blue"></div>
                </div>
              ) : (
                <TestForm onSubmit={handleCreateTest} />
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>A/B Testing Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Test One Variable at a Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Change only one element between variants to clearly identify what affects performance.
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Use Statistically Significant Sample</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow tests to run until you have enough data for reliable conclusions.
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Set Clear Success Metrics</h3>
                  <p className="text-sm text-muted-foreground">
                    Define up front what metrics will determine the winner (clicks, conversions, etc).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test History</CardTitle>
              <CardDescription>
                {testHistory.length} completed test{testHistory.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TestHistory tests={testHistory} onSelectTest={handleSelectTest} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6">
          {selectedTest && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{selectedTest.testName}</h2>
                <Button variant="outline" onClick={() => setActiveTab('history')}>
                  Back to History
                </Button>
              </div>
              <TestResults test={selectedTest} />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ABTesting;
