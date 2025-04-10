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
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Bell,
  User,
  Lock,
  Globe,
  Users,
  Shield,
  UserPlus,
  Mail,
  Phone,
  Badge as BadgeIcon,
  PenSquare,
  Building,
  Briefcase,
  Upload,
  Trash,
  Save,
  Download
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const TeamMember = ({ member, isAdmin }: { member: any, isAdmin: boolean }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-md">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{member.name}</p>
          <p className="text-sm text-muted-foreground">{member.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <BadgeIcon className={
          member.role === 'Admin' 
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
            : member.role === 'Analyst'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        }>
          {member.role}
        </BadgeIcon>
        
        {isAdmin && (
          <Button variant="ghost" size="sm">
            <PenSquare className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

const Settings = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(555) 123-4567',
    company: 'Acme Inc.',
    jobTitle: 'Marketing Manager',
    bio: 'Marketing professional focused on data-driven campaign optimization and ROI maximization.',
    avatar: null as string | null,
  });
  
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    campaignAlerts: true,
    performanceReports: true,
    productUpdates: false,
    teamActivity: true,
  });
  
  const [gdprSettings, setGdprSettings] = useState({
    dataCollection: true,
    cookieUsage: true,
    thirdPartySharing: false,
    marketingEmails: true,
  });
  
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'Admin',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'Analyst',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'Marketer',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      id: 4,
      name: 'Emily Wilson',
      email: 'emily@example.com',
      role: 'Marketer',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
  ];
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfile({
            ...profile,
            avatar: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
    
    toast({
      title: "Notification settings updated",
      description: `${key} notifications have been ${notifications[key] ? 'disabled' : 'enabled'}.`,
    });
  };
  
  const handleGdprToggle = (key: keyof typeof gdprSettings) => {
    setGdprSettings({
      ...gdprSettings,
      [key]: !gdprSettings[key],
    });
    
    toast({
      title: "Privacy settings updated",
      description: `${key} setting has been ${gdprSettings[key] ? 'disabled' : 'enabled'}.`,
    });
  };
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and configuration
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="w-full md:w-auto grid grid-cols-4 md:inline-flex mb-4">
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline-block">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline-block">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline-block">Privacy</span>
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="team" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline-block">Team</span>
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={profile.jobTitle}
                        onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  
                  <Button type="submit" className="mt-4">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>
                    Upload a profile picture to personalize your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    {profile.avatar ? (
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                    ) : (
                      <AvatarFallback className="text-2xl">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className="flex flex-col gap-2 w-full">
                    <Label
                      htmlFor="avatar-upload"
                      className="cursor-pointer text-center bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md px-4 py-2 flex items-center justify-center"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Label>
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    
                    {profile.avatar && (
                      <Button variant="outline" onClick={() => setProfile({ ...profile, avatar: null })}>
                        <Trash className="h-4 w-4 mr-2" />
                        Remove Photo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your account password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="w-full mt-2">Update Password</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove all of your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose which notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-digest">Email Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily summary of your account activity
                  </p>
                </div>
                <Switch
                  id="email-digest"
                  checked={notifications.emailDigest}
                  onCheckedChange={() => handleNotificationToggle('emailDigest')}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="campaign-alerts">Campaign Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when campaigns start, end, or require attention
                  </p>
                </div>
                <Switch
                  id="campaign-alerts"
                  checked={notifications.campaignAlerts}
                  onCheckedChange={() => handleNotificationToggle('campaignAlerts')}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="performance-reports">Performance Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly and monthly performance reports
                  </p>
                </div>
                <Switch
                  id="performance-reports"
                  checked={notifications.performanceReports}
                  onCheckedChange={() => handleNotificationToggle('performanceReports')}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="product-updates">Product Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about new features and platform changes
                  </p>
                </div>
                <Switch
                  id="product-updates"
                  checked={notifications.productUpdates}
                  onCheckedChange={() => handleNotificationToggle('productUpdates')}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="team-activity">Team Activity</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about team member actions and comments
                  </p>
                </div>
                <Switch
                  id="team-activity"
                  checked={notifications.teamActivity}
                  onCheckedChange={() => handleNotificationToggle('teamActivity')}
                />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 flex justify-between">
              <p className="text-sm text-muted-foreground">
                You can also manage notification delivery channels in your email settings.
              </p>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>GDPR Compliance Settings</CardTitle>
              <CardDescription>
                Manage your data privacy preferences and consents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-collection" className="text-base font-medium">Data Collection</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect data about your campaign performance and usage patterns
                  </p>
                </div>
                <Switch
                  id="data-collection"
                  checked={gdprSettings.dataCollection}
                  onCheckedChange={() => handleGdprToggle('dataCollection')}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cookie-usage" className="text-base font-medium">Cookie Usage</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow the use of cookies to improve your browsing experience
                  </p>
                </div>
                <Switch
                  id="cookie-usage"
                  checked={gdprSettings.cookieUsage}
                  onCheckedChange={() => handleGdprToggle('cookieUsage')}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="third-party-sharing" className="text-base font-medium">Third-Party Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to share anonymized data with trusted third parties for service improvement
                  </p>
                </div>
                <Switch
                  id="third-party-sharing"
                  checked={gdprSettings.thirdPartySharing}
                  onCheckedChange={() => handleGdprToggle('thirdPartySharing')}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails" className="text-base font-medium">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about our products, services, and industry insights
                  </p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={gdprSettings.marketingEmails}
                  onCheckedChange={() => handleGdprToggle('marketingEmails')}
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start space-y-4 bg-muted/30">
              <div className="text-sm">
                <p className="font-medium">Your Rights Under GDPR:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of incorrect data</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to restriction of processing</li>
                  <li>Right to data portability</li>
                </ul>
              </div>
              <div className="flex gap-4">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download My Data
                </Button>
                <Button variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Team Management</CardTitle>
                    <CardDescription>
                      Manage team members and their access levels
                    </CardDescription>
                  </div>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite User
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
                  <p className="text-sm text-muted-foreground">
                    {teamMembers.length} team members
                  </p>
                  <div className="flex gap-4">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                        <SelectItem value="marketer">Marketer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="Search users..." 
                      className="w-full sm:w-[250px]"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <TeamMember key={member.id} member={member} isAdmin={true} />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-between flex-col sm:flex-row gap-4">
                <div className="text-sm text-muted-foreground">
                  <p>Your organization plan: <span className="font-medium">Business</span></p>
                  <p>
                    {teamMembers.length} of 10 seats used
                  </p>
                </div>
                <Button>
                  Upgrade Plan
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Settings;
