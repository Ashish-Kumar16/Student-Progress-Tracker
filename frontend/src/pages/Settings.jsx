import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Divider,
  Switch,
  TextField,
  Tabs,
  Tab,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../context/ToastContext";
import {
  fetchUserInfo,
  selectUser,
  selectLoading,
  selectError,
  updateProfile,
  updatePassword,
} from "../store/slices/authSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
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

  // Fetch user info on mount
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  // Update profileData when user data is loaded
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(profileData)).unwrap();
      showToast("Profile updated successfully!", "success");
    } catch (error) {
      showToast(error || "Failed to update profile", "error");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast("Passwords don't match", "error");
      return;
    }
    try {
      await dispatch(
        updatePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      ).unwrap();
      showToast("Password updated successfully!", "success");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      showToast(error || "Failed to update password", "error");
    }
  };

  const handleNotificationToggle = (setting) => {
    const updatedSettings = {
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    };
    setNotificationSettings(updatedSettings);
    showToast("Notification setting updated (fake)", "success");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Box sx={{ width: "100%", mb: 3 }}>
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
        <Skeleton
          variant="rectangular"
          width={300}
          height={40}
          sx={{ mb: 2 }}
        />
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={56}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={56}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={56}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" width={160} height={40} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography>Please log in to view settings</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Box sx={{ width: "100%", mb: 3 }}>
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
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Role"
                    value={user.role || "N/A"}
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
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="New Password"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="subtitle1">
                    Two-factor authentication
                  </Typography>
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">
                    Email Notifications
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Receive email notifications
                  </Typography>
                </Box>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onChange={() =>
                    handleNotificationToggle("emailNotifications")
                  }
                />
              </Box>

              <Divider />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">Submission Alerts</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Alerts for new assignment submissions
                  </Typography>
                </Box>
                <Switch
                  checked={notificationSettings.submissionAlerts}
                  onChange={() => handleNotificationToggle("submissionAlerts")}
                />
              </Box>

              <Divider />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">
                    Attendance Reports
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Daily attendance summary reports
                  </Typography>
                </Box>
                <Switch
                  checked={notificationSettings.attendanceReports}
                  onChange={() => handleNotificationToggle("attendanceReports")}
                />
              </Box>

              <Divider />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">Grade Updates</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Notifications when grades are updated
                  </Typography>
                </Box>
                <Switch
                  checked={notificationSettings.gradeUpdates}
                  onChange={() => handleNotificationToggle("gradeUpdates")}
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
