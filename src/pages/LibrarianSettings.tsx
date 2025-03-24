
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Settings,
  User,
  Bell,
  Clock,
  Lock,
  Mail,
  Shield,
  Save,
  RefreshCw,
  UserPlus,
  Trash,
  Upload,
  Download,
  PlusCircle,
  FileText,
} from 'lucide-react';
import {
  Switch
} from '@/components/ui/switch';

export default function LibrarianSettings() {
  const { toast } = useToast();
  const [libraryHours, setLibraryHours] = useState({
    openTime: '08:00',
    closeTime: '16:00',
    daysOpen: 'Monday to Friday',
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    bookRequests: true,
    seatReservations: true,
    paymentAlerts: true,
    systemUpdates: false,
  });
  
  const [fineSettings, setFineSettings] = useState({
    lateFeePerDay: 10,
    maxFineAmount: 500,
    gracePeriod: 3,
  });
  
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@edupulse.edu',
    phone: '+91 9876543210',
    department: 'Library Management',
    role: 'Head Librarian',
  });

  const handleSaveLibraryHours = () => {
    toast({
      title: 'Library Hours Updated',
      description: 'Library operating hours have been updated successfully.',
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: 'Notification Settings Updated',
      description: 'Your notification preferences have been saved.',
    });
  };

  const handleSaveFineSettings = () => {
    toast({
      title: 'Fine Settings Updated',
      description: 'Late fee and fine settings have been updated successfully.',
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been updated.',
    });
  };

  const handleExportData = () => {
    toast({
      title: 'Export Started',
      description: 'System data is being exported. This may take a few moments.',
    });
  };

  const handleImportData = () => {
    toast({
      title: 'Import Feature',
      description: 'Please select a file to import data from.',
    });
  };

  const handlePasswordReset = () => {
    toast({
      title: 'Password Reset Email Sent',
      description: 'Check your email for instructions to reset your password.',
    });
  };

  return (
    <DashboardLayout userType="librarian">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight hero-gradient">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and system preferences.
          </p>
        </div>

        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Library Hours</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="fines" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Fine Settings</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
          </TabsList>

          {/* Library Hours Tab */}
          <TabsContent value="library" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Library Operating Hours</CardTitle>
                <CardDescription>
                  Set the official operating hours for the library
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="daysOpen">Days Open</Label>
                  <Input
                    id="daysOpen"
                    value={libraryHours.daysOpen}
                    onChange={(e) => 
                      setLibraryHours({ ...libraryHours, daysOpen: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="openTime">Opening Time</Label>
                    <Input
                      id="openTime"
                      type="time"
                      value={libraryHours.openTime}
                      onChange={(e) => 
                        setLibraryHours({ ...libraryHours, openTime: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="closeTime">Closing Time</Label>
                    <Input
                      id="closeTime"
                      type="time"
                      value={libraryHours.closeTime}
                      onChange={(e) => 
                        setLibraryHours({ ...libraryHours, closeTime: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-md mt-2">
                  <p className="text-sm">
                    <strong>Current Library Hours:</strong> {libraryHours.openTime} to {libraryHours.closeTime}, {libraryHours.daysOpen}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Note: These hours will be displayed on the About page and Reservation page
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gradient-button" onClick={handleSaveLibraryHours}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Special Closures & Holidays</CardTitle>
                <CardDescription>
                  Manage upcoming library closures and holiday schedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h4 className="font-medium">Independence Day</h4>
                      <p className="text-sm text-muted-foreground">August 15, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h4 className="font-medium">Diwali</h4>
                      <p className="text-sm text-muted-foreground">November 12-13, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Maintenance Closure</h4>
                      <p className="text-sm text-muted-foreground">December 24-26, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add Holiday
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Book Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about new book requests from students
                    </p>
                  </div>
                  <Switch
                    checked={notifications.bookRequests}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, bookRequests: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Seat Reservations</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about new seat reservation requests
                    </p>
                  </div>
                  <Switch
                    checked={notifications.seatReservations}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, seatReservations: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about new payments and due fees
                    </p>
                  </div>
                  <Switch
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, paymentAlerts: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about system updates and maintenance
                    </p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, systemUpdates: checked })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gradient-button" onClick={handleSaveNotifications}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Fine Settings Tab */}
          <TabsContent value="fines" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fine & Fee Configuration</CardTitle>
                <CardDescription>
                  Configure late return fees and other payment settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="lateFeePerDay">Late Fee Per Day (₹)</Label>
                  <Input
                    id="lateFeePerDay"
                    type="number"
                    value={fineSettings.lateFeePerDay}
                    onChange={(e) =>
                      setFineSettings({
                        ...fineSettings,
                        lateFeePerDay: parseInt(e.target.value),
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Amount charged per day for late book returns
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="maxFineAmount">Maximum Fine Amount (₹)</Label>
                  <Input
                    id="maxFineAmount"
                    type="number"
                    value={fineSettings.maxFineAmount}
                    onChange={(e) =>
                      setFineSettings({
                        ...fineSettings,
                        maxFineAmount: parseInt(e.target.value),
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Cap on the maximum late fee that can accumulate per book
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="gracePeriod">Grace Period (Days)</Label>
                  <Input
                    id="gracePeriod"
                    type="number"
                    value={fineSettings.gracePeriod}
                    onChange={(e) =>
                      setFineSettings({
                        ...fineSettings,
                        gracePeriod: parseInt(e.target.value),
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Number of days after due date before late fees start accumulating
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="gradient-button" onClick={handleSaveFineSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Configuration
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Other Fee Types</CardTitle>
                <CardDescription>
                  Manage other types of fees collected by the library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <h4 className="font-medium">Membership Fee</h4>
                      <p className="text-sm text-muted-foreground">₹800 per year</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <h4 className="font-medium">Seat Reservation Fee</h4>
                      <p className="text-sm text-muted-foreground">₹50 per session</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <h4 className="font-medium">Lost Book Fee</h4>
                      <p className="text-sm text-muted-foreground">Book price + ₹200 processing fee</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add Fee Type
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                  Manage your personal information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profile.department}
                      onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePasswordReset} className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Reset Password
                </Button>
                <Button className="gradient-button" onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Operations</CardTitle>
                <CardDescription>
                  Manage database operations and system maintenance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Data Management</h3>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <Button 
                      variant="outline" 
                      className="h-auto py-4 justify-start"
                      onClick={handleExportData}
                    >
                      <Download className="h-5 w-5 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">Export All Data</div>
                        <div className="text-xs text-muted-foreground">
                          Download all library data as backup
                        </div>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto py-4 justify-start"
                      onClick={handleImportData}
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">Import Data</div>
                        <div className="text-xs text-muted-foreground">
                          Import data from file backup
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">User Management</h3>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <UserPlus className="h-5 w-5 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">Add Administrator</div>
                        <div className="text-xs text-muted-foreground">
                          Add a new admin account
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <Shield className="h-5 w-5 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">Manage Permissions</div>
                        <div className="text-xs text-muted-foreground">
                          Configure access levels
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">System Maintenance</h3>
                    <p className="text-sm text-muted-foreground">
                      Tools for system maintenance and optimization
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <RefreshCw className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Run System Check</div>
                        <div className="text-xs text-muted-foreground">
                          Verify system integrity and performance
                        </div>
                      </div>
                    </Button>
                    <Button variant="destructive" className="flex items-center gap-2 justify-start">
                      <Trash className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Clear Temporary Data</div>
                        <div className="text-xs">
                          Remove cached data and temporary files
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>
                  Details about your library management system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h4 className="text-sm font-medium">Version</h4>
                      <p className="text-sm">EduPulse Library v2.5.1</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Last Update</h4>
                      <p className="text-sm">March 15, 2025</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h4 className="text-sm font-medium">Database Status</h4>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <p className="text-sm">Connected</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Storage Used</h4>
                      <p className="text-sm">2.1 GB / 5 GB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
