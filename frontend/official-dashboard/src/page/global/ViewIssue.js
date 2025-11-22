import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const IssuesList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/issue/view/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        });
        setIssues(response.data);
      } catch (err) {
        setError('Failed to load issues. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center min-h-screen text-red-500">
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box backgroundColor={colors.primary[400]} className="p-4 mt-12 min-h-screen" sx={{ color: colors.grey[100] }}>
      <Typography variant="h4" className="text-center font-semibold mb-6">
        Resident Complaint's
      </Typography>
      <List>
        {issues.map((issue) => (
          <ListItem
            key={issue.id}
            className="mb-2 shadow-md rounded"
            sx={{
              backgroundColor: theme.palette.mode === 'light' ? "#cccccc" : "#141b2d",
              color: colors.grey[100],
              borderRadius: '8px',
              transition: 'transform 0.2s',
              height: '100px',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: theme.shadows[8],
              },
            }}
          >
            <ListItemAvatar>
              {issue.image ? (
                <Avatar
                  alt={issue.description}
                  src={`${process.env.REACT_APP_API_URL}${issue.image}`}
                  variant="rounded"
                  sx={{ width: 64, height: 64, marginRight: 3}}
                />
              ) : (
                <Avatar sx={{ bgcolor: colors.grey[400], width: 64, height: 64 }}>
                  {issue.description.charAt(0)}
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">{issue.description}</Typography>}
              secondary={
                <Box>
                  <Typography variant="body2" color={colors.grey[300]}>
                    Subcity: {issue.subcity_name}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    Tabya: {issue.tabya_name}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    Date: {issue.reported_date}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default IssuesList;
