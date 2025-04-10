
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BrainCircuit, 
  TrendingUp, 
  LineChart, 
  BarChart3, 
  PieChart, 
  Zap, 
  MousePointer, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  BadgeCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  // Features data
  const features = [
    {
      title: 'AI-Powered Optimization',
      description: 'Our machine learning algorithms analyze your campaign data to provide actionable insights and optimization recommendations.',
      icon: BrainCircuit,
    },
    {
      title: 'A/B Testing Platform',
      description: 'Compare creative variants with our advanced A/B testing tools to determine the highest-performing content for your audience.',
      icon: MousePointer,
    },
    {
      title: 'Audience Segmentation',
      description: 'Identify and target specific audience segments based on demographics, behavior, and engagement patterns.',
      icon: Users,
    },
    {
      title: 'Real-time Analytics',
      description: 'Track performance metrics in real-time with customizable dashboards and alerts for immediate optimization.',
      icon: TrendingUp,
    },
  ];
  
  // Testimonials data
  const testimonials = [
    {
      quote: "Prismatech's AI optimization technology increased our campaign ROI by 47% in just three months. The insights provided were game-changing for our marketing strategy.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "E-commerce Tech",
    },
    {
      quote: "The audience segmentation tools helped us identify untapped markets we weren't previously targeting. Our conversion rates have improved significantly.",
      author: "Michael Chen",
      role: "Digital Marketing Lead",
      company: "GlobalRetail Inc.",
    },
    {
      quote: "The A/B testing platform is intuitive yet powerful. We're making data-driven decisions faster than ever before.",
      author: "Alex Rodriguez",
      role: "Growth Marketing Manager",
      company: "SaaS Solutions",
    },
  ];
  
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                AI-Powered Marketing Campaign Optimization
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Maximize ROI and engagement with data-driven insights powered by advanced artificial intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button asChild size="lg" className="font-medium">
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg" className="font-medium">
                      <Link to="/signup">Get Started</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>
              <div className="flex items-center mt-8">
                <p className="text-sm text-muted-foreground">Trusted by marketing teams at</p>
                <div className="flex ml-4 gap-4">
                  <div className="w-6 h-6 bg-primary/10 rounded-full"></div>
                  <div className="w-6 h-6 bg-primary/10 rounded-full"></div>
                  <div className="w-6 h-6 bg-primary/10 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="bg-gradient-to-br from-prismatech-blue to-purple-600 p-1 rounded-2xl shadow-xl">
                  <div className="bg-background rounded-xl p-6">
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium">Campaign Performance</h3>
                        <p className="text-sm text-muted-foreground">Last 30 days</p>
                      </div>
                      <span className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">+24.3%</span>
                      </span>
                    </div>
                    
                    <div className="h-40 mb-6 bg-muted/40 rounded-lg flex items-center justify-center">
                      <LineChart className="h-20 w-20 text-muted-foreground/50" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">CTR</p>
                        <p className="text-xl font-bold">4.8%</p>
                        <span className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +0.6%
                        </span>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Conversions</p>
                        <p className="text-xl font-bold">1,248</p>
                        <span className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +12.5%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-1/4 -right-4 md:-right-10 bg-white dark:bg-card p-3 rounded-xl shadow-lg rotate-6">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-prismatech-lime flex items-center justify-center text-prismatech-text">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">AI Insight</p>
                      <p className="text-xs text-muted-foreground">Adjust bid strategy</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 -left-4 md:-left-10 bg-white dark:bg-card p-3 rounded-xl shadow-lg -rotate-6">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Segment</p>
                      <p className="text-xs text-muted-foreground">High-value users</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Optimize Every Campaign with AI</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform provides the tools and insights you need to maximize marketing performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Button asChild size="lg" className="font-medium">
              <Link to={isAuthenticated ? "/dashboard" : "/signup"} className="flex items-center">
                <span>Start Optimizing Today</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Analytics Section */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Analytics Dashboard</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Access all your marketing metrics in one intuitive dashboard. Track performance in real-time and make data-driven decisions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-prismatech-lime mt-0.5" />
                  <div>
                    <h3 className="font-medium">Custom Reports</h3>
                    <p className="text-muted-foreground">Create and save custom reports for your specific metrics</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-prismatech-lime mt-0.5" />
                  <div>
                    <h3 className="font-medium">Multi-platform Integration</h3>
                    <p className="text-muted-foreground">Connect with all major ad platforms and marketing tools</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-prismatech-lime mt-0.5" />
                  <div>
                    <h3 className="font-medium">Export & Share</h3>
                    <p className="text-muted-foreground">Export data in multiple formats and easily share with your team</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Button variant="outline" asChild>
                  <Link to="/features" className="flex items-center">
                    <span>Learn More</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-card shadow-lg rounded-xl overflow-hidden border">
                <div className="bg-muted/50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Campaign Analytics</h3>
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-background p-3 rounded-lg border">
                      <p className="text-xs text-muted-foreground">Impressions</p>
                      <p className="text-xl font-semibold">1.2M</p>
                    </div>
                    <div className="bg-background p-3 rounded-lg border">
                      <p className="text-xs text-muted-foreground">Clicks</p>
                      <p className="text-xl font-semibold">68K</p>
                    </div>
                    <div className="bg-background p-3 rounded-lg border">
                      <p className="text-xs text-muted-foreground">Conv.</p>
                      <p className="text-xl font-semibold">3.2K</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium">Channel Performance</p>
                        <p className="text-xs text-muted-foreground">Last 30 days</p>
                      </div>
                      <div className="h-32 bg-background border rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium">Audience Breakdown</p>
                        <p className="text-xs text-muted-foreground">By demographics</p>
                      </div>
                      <div className="h-32 bg-background border rounded-lg flex items-center justify-center">
                        <PieChart className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join hundreds of marketing teams optimizing their campaigns with Prismatech
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-sm border relative">
                <div className="absolute top-6 right-6 text-prismatech-lime">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <p className="mb-6 text-muted-foreground">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-prismatech-blue to-purple-600 rounded-2xl p-10 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Marketing?</h2>
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
              Join innovative marketing teams using AI to drive better results and higher ROI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="default" className="bg-white text-prismatech-blue hover:bg-gray-100">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-80">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
