import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

export const menuItems = {
  ADMIN: [
    { title: "Dashboard", to: "/dashboard", icon: <HomeOutlinedIcon /> },
    { title: "Profile", to: "/profile", icon: <PeopleOutlinedIcon /> },
    {
      title: "Manage users",
      to: "/manage-users",
      icon: <ManageAccountsOutlinedIcon />,
    },
    {
      title: "Create user",
      to: "/create-user",
      icon: <PersonAddAltOutlinedIcon />,
    },
    {
      title: "Approve Articles",
      to: "/approve-articles",
      icon: <ArticleOutlinedIcon />,
    },
  ],
  
  DATA_ENCODER: [
    { title: "Dashboard", to: "/dashboard", icon: <HomeOutlinedIcon /> },
    { title: "Profile", to: "/profile", icon: <PeopleOutlinedIcon /> },
    {
      title: "Write Reports",
      to: "/write-report",
      icon: <ArticleOutlinedIcon />,
    },
    {
      title: "Approved Reports",
      to: "/view-reports/approved",
      icon: <ArticleOutlinedIcon />,
    },
    {
      title: "rejected Reports",
      to: "/view-reports/rejected",
      icon: <ArticleOutlinedIcon />,
    },
    {
      title: "View Schedule",
      to: "/view-schedule",
      icon: <ArticleOutlinedIcon />,
    },
  ],

TABYA: [
  { title: "Dashboard", to: "/dashboard", icon: <HomeOutlinedIcon /> },
  { title: "Profile", to: "/profile", icon: <PeopleOutlinedIcon /> },
  {
    title: "Approved Reports",
    to: "/view-reports/approved",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Pending Reports",
    to: "/view-reports/pending",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "View Schedule",
    to: "/view-schedule",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Issues",
    to: "/view-issues",
    icon: <PersonAddAltOutlinedIcon />,
  },
],


UNION: [
  { title: "Dashboard", to: "/dashboard", icon: <HomeOutlinedIcon /> },
  { title: "Profile", to: "/profile", icon: <PeopleOutlinedIcon /> },
  {
    title: "Approved Reports",
    to: "/view-reports/approved",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Pending Reports",
    to: "/view-reports/pending",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Schedule",
    to: "/view-schedule",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Approve Reports",
    to: "/approve-reports",
    icon: <ArticleOutlinedIcon />,
  },
],

SUB_CITY: [
  { title: "Dashboard", to: "/dashboard", icon: <HomeOutlinedIcon /> },
  { title: "Profile", to: "/profile", icon: <PeopleOutlinedIcon /> },
  {
    title: "Approved Reports",
    to: "/view-reports/approved",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Rejected Reports",
    to: "/view-reports/rejected",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Schedule",
    to: "/view-schedule",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Issues",
    to: "/view-issues",
    icon: <PersonAddAltOutlinedIcon />,
  },
],

CITY: [
  { title: "Dashboard", to: "/dashboard", icon: <HomeOutlinedIcon /> },
  { title: "Profile", to: "/profile", icon: <PeopleOutlinedIcon /> },
  {
    title: "Approve Reports",
    to: "/view-reports/pending",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Rejected Reports",
    to: "/view-reports/rejected",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Schedule",
    to: "/view-schedule",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Issues",
    to: "/view-issues",
    icon: <PersonAddAltOutlinedIcon />,
  },
],
};