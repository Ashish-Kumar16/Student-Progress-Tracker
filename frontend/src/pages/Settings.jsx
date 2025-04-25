
import { useState } from "react";
import { 
  Box, Button, Card, CardContent, Container, Grid, Typography,
  Divider, Switch, FormControlLabel, TextField, Tabs, Tab, Paper
} from '@mui/material';
import { mockUsers } from "@/data/mockData";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const Settings = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");
  const currentUser = mockUsers[0]; // Admin user for demo
  
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    submissionAlerts: true,
    attendanceReports: true,
    gradeUpdates: true,
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Updating profile:", profileData);
    toast.success("Profile updated successfully!");
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    console.log("Updating password");
    toast.success("Password updated successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  
  const handleNotificationToggle = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast.success(`Notification setting updated`);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      
      <Box sx={{ width: '100%', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="profile" label="Profile" />
          <Tab value="security" label="Security" />
          <Tab value="notifications" label="Notifications" />
        </Tabs>
      </Box>
      
      {activeTab === "profile" && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <form onSubmit={handleProfileSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    fullWidth
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    fullWidth
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Role"
                    value={currentUser.role}
                    fullWidth
                    disabled
                    helperText="Your assigned role cannot be changed"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
      
      {activeTab === "security" && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <form onSubmit={handlePasswordSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Current Password"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    fullWidth
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="New Password"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    fullWidth
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    fullWidth
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </form>
            
            <Divider sx={{ my: 4 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Two-Factor Authentication
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1">Two-factor authentication</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add an extra layer of security to your account
                  </Typography>
                </Box>
                <Button variant="outlined">Enable</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
      
      {activeTab === "notifications" && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                py: 2 
              }}>
                <Box>
                  <Typography variant="subtitle1">Email Notifications</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Receive email notifications
                  </Typography>
                </Box>
                <Switch 
                  checked={notificationSettings.emailNotifications} 
                  onChange={() => handleNotificationToggle('emailNotifications')}
                />
              </Box>
              
              <Divider />
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                py: 2 
              }}>
                <Box>
                  <Typography variant="subtitle1">Submission Alerts</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Alerts for new assignment submissions
                  </Typography>
                </Box>
                <Switch 
                  checked={notificationSettings.submissionAlerts} 
                  onChange={() => handleNotificationToggle('submissionAlerts')}
                />
              </Box>
              
              <Divider />
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                py: 2 
              }}>
                <Box>
                  <Typography variant="subtitle1">Attendance Reports</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Daily attendance summary reports
                  </Typography>
                </Box>
                <Switch 
                  checked={notificationSettings.attendanceReports} 
                  onChange={() => handleNotificationToggle('attendanceReports')}
                />
              </Box>
              
              <Divider />
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                py: 2 
              }}>
                <Box>
                  <Typography variant="subtitle1">Grade Updates</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Notifications when grades are updated
                  </Typography>
                </Box>
                <Switch 
                  checked={notificationSettings.gradeUpdates} 
                  onChange={() => handleNotificationToggle('gradeUpdates')}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Settings;
