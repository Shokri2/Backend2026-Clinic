
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Chip,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@mui/material";

import {
  People,
  Person,
  AdminPanelSettings,
  MedicalServices,
  Delete,
  Edit,
  Search,
  Visibility,
  VisibilityOff,
  Lock,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const API_URL = "http://localhost:3000";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in");
        setUsers([]);
        return;
      }

      const res = await axios.get(`${API_URL}/api/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(Array.isArray(res.data.users) ? res.data.users : []);
    } catch (error) {
      console.error("Get users error:", error);

      if (error.response?.status === 401) {
        toast.error("Please login again");
      } else if (error.response?.status === 403) {
        toast.error("Admin access required");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load users",
        );
      }

      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getRoleLabel = (role) => {
    if (role === "user") return "Patient";
    if (role === "doctor") return "Doctor";
    if (role === "admin") return "Administrator";

    return role || "Unknown";
  };

  const getRoleColor = (role) => {
    if (role === "admin") return "error";
    if (role === "doctor") return "info";
    if (role === "user") return "success";

    return "default";
  };

  const getRoleIcon = (role) => {
    if (role === "admin") {
      return <AdminPanelSettings fontSize="small" />;
    }

    if (role === "doctor") {
      return <MedicalServices fontSize="small" />;
    }

    return <Person fontSize="small" />;
  };

  const handleEdit = (user) => {
    setSelectedUser(user);

    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "user",
    });

    setShowPassword(false);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedUser(null);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
    });

    setShowPassword(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      await axios.put(
        `${API_URL}/api/update-user/${selectedUser._id}`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (formData.role !== selectedUser.role) {
        await axios.put(
          `${API_URL}/api/update-user-role/${selectedUser._id}`,
          {
            role: formData.role,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      toast.success("User updated successfully");

      handleCloseEdit();

      await getUsers();
    } catch (error) {
      console.error("UPDATE USER ERROR:", error);

      toast.error(
        error.response?.data?.message || "Failed to update user",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.name}?`,
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      await axios.delete(`${API_URL}/api/delete-user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User deleted successfully");

      await getUsers();
    } catch (error) {
      console.error("Delete user error:", error);

      toast.error(
        error.response?.data?.message || "Failed to delete user",
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue);

    const matchesRole =
      roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const totalUsers = users.length;

  const totalPatients = users.filter(
    (user) => user.role === "user",
  ).length;

  const totalDoctors = users.filter(
    (user) => user.role === "doctor",
  ).length;

  const totalAdmins = users.filter(
    (user) => user.role === "admin",
  ).length;

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const StatCard = ({ title, value, icon }) => {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: 2,
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 3,
            backgroundColor: "#e5f4ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#12372A",
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography
            color="text.secondary"
            fontSize={14}
            sx={{
              fontFamily: "Poppins",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#12372A",
              fontFamily: "Poppins",
            }}
          >
            {value}
          </Typography>
        </Box>
      </Paper>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#12372A",
            fontFamily: "Poppins",
          }}
        >
          Manage Users
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 0.5,
            fontFamily: "Poppins",
          }}
        >
          Manage patients, doctors and administrators
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={<People />}
        />

        <StatCard
          title="Patients"
          value={totalPatients}
          icon={<Person />}
        />

        <StatCard
          title="Doctors"
          value={totalDoctors}
          icon={<MedicalServices />}
        />

        <StatCard
          title="Administrators"
          value={totalAdmins}
          icon={<AdminPanelSettings />}
        />
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 4,
          border: "1px solid #e5e7eb",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search
                  sx={{
                    mr: 1,
                    color: "text.secondary",
                  }}
                />
              ),
            }}
          />

          <FormControl
            sx={{
              minWidth: {
                xs: "100%",
                md: 220,
              },
            }}
          >
            <InputLabel>Role</InputLabel>

            <Select
              value={roleFilter}
              label="Role"
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <MenuItem value="all">All Users</MenuItem>
              <MenuItem value="user">Patients</MenuItem>
              <MenuItem value="doctor">Doctors</MenuItem>
              <MenuItem value="admin">Administrators</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "#12372A",
              fontFamily: "Poppins",
            }}
          >
            Registered Users
          </Typography>

          <Typography color="text.secondary" fontSize={14}>
            {filteredUsers.length} users found
          </Typography>
        </Box>

        {loading ? (
          <Box
            sx={{
              py: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              sx={{
                color: "#12372A",
              }}
            />
          </Box>
        ) : filteredUsers.length === 0 ? (
          <Box
            sx={{
              py: 10,
              textAlign: "center",
            }}
          >
            <People
              sx={{
                fontSize: 65,
                color: "#b8c9c1",
                mb: 2,
              }}
            />

            <Typography variant="h6" fontWeight="bold">
              No Users Found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              Try changing your search or filter.
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
                overflowX: "auto",
              }}
            >
              <Box
                component="table"
                sx={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <Box component="thead">
                  <Box component="tr">
                    {[
                      "User",
                      "Email",
                      "Role",
                      "Joined",
                      "Actions",
                    ].map((title) => (
                      <Box
                        component="th"
                        key={title}
                        sx={{
                          textAlign: "left",
                          p: 2,
                          color: "text.secondary",
                          fontSize: 14,
                          fontWeight: 600,
                          borderBottom: "1px solid #e5e7eb",
                        }}
                      >
                        {title}
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box component="tbody">
                  {filteredUsers.map((user) => (
                    <Box
                      component="tr"
                      key={user._id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f8faf9",
                        },
                      }}
                    >
                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Avatar
                            sx={{
                              backgroundColor: "#12372A",
                            }}
                          >
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </Avatar>

                          <Typography fontWeight={600}>
                            {user.name || "Unknown"}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <Typography color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>

                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <Chip
                          icon={getRoleIcon(user.role)}
                          label={getRoleLabel(user.role)}
                          color={getRoleColor(user.role)}
                          size="small"
                        />
                      </Box>

                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        {formatDate(user.createdAt)}
                      </Box>

                      <Box
                        component="td"
                        sx={{
                          p: 2,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <IconButton
                          onClick={() => handleEdit(user)}
                          sx={{
                            color: "#16704f",
                            backgroundColor: "#e5f4ed",
                            mr: 1,
                          }}
                        >
                          <Edit />
                        </IconButton>

                        <IconButton
                          onClick={() => handleDelete(user)}
                          sx={{
                            color: "#c62828",
                            backgroundColor: "#fde2e2",
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
                p: 2,
              }}
            >
              {filteredUsers.map((user) => (
                <Paper
                  key={user._id}
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                      }}
                    >
                      <Avatar
                        sx={{
                          backgroundColor: "#12372A",
                        }}
                      >
                        {user.name
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </Avatar>

                      <Box>
                        <Typography fontWeight="bold">
                          {user.name || "Unknown"}
                        </Typography>

                        <Typography
                          color="text.secondary"
                          fontSize={13}
                        >
                          {user.email}
                        </Typography>

                        <Chip
                          icon={getRoleIcon(user.role)}
                          label={getRoleLabel(user.role)}
                          color={getRoleColor(user.role)}
                          size="small"
                          sx={{
                            mt: 1,
                          }}
                        />
                      </Box>
                    </Box>

                    <Box>
                      <IconButton
                        onClick={() => handleEdit(user)}
                        sx={{
                          color: "#16704f",
                        }}
                      >
                        <Edit />
                      </IconButton>

                      <IconButton
                        onClick={() => handleDelete(user)}
                        sx={{
                          color: "#c62828",
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography
                    color="text.secondary"
                    fontSize={13}
                    sx={{
                      mt: 2,
                    }}
                  >
                    Joined: {formatDate(user.createdAt)}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </>
        )}
      </Paper>

      <Dialog
        open={editOpen}
        onClose={handleCloseEdit}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontFamily: "Poppins",
            fontWeight: "bold",
          }}
        >
          Edit User
        </DialogTitle>

        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                  p: 2,
                  backgroundColor: "#f5f7fa",
                  borderRadius: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: 52,
                    height: 52,
                    backgroundColor: "#12372A",
                  }}
                >
                  {formData.name?.charAt(0)?.toUpperCase()}
                </Avatar>

                <Box>
                  <Typography fontWeight="bold">
                    Edit Account
                  </Typography>

                  <Typography
                    color="text.secondary"
                    fontSize={13}
                  >
                    ID: {selectedUser._id}
                  </Typography>
                </Box>
              </Box>

              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="New Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                placeholder="Leave empty to keep current password"
                helperText="Leave empty if you don't want to change the password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock
                        sx={{
                          color: "text.secondary",
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Role</InputLabel>

                <Select
                  name="role"
                  value={formData.role}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value="user">Patient</MenuItem>

                  <MenuItem value="doctor">Doctor</MenuItem>

                  <MenuItem value="admin">
                    Administrator
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
          }}
        >
          <Button
            onClick={handleCloseEdit}
            disabled={saving}
            sx={{
              textTransform: "none",
              color: "#666",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleUpdateUser}
            disabled={saving}
            sx={{
              backgroundColor: "#12372A",
              textTransform: "none",
              px: 3,
              "&:hover": {
                backgroundColor: "#0d2b21",
              },
            }}
          >
            {saving ? (
              <CircularProgress
                size={22}
                sx={{
                  color: "white",
                }}
              />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

