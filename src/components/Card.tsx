import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Avatar } from '@mui/material';

interface DataCardProps {
  title: string;
  imageUrl: string;
  date: string; 
  avatarUrl: string; 
  username: string; 
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  imageUrl,
  date,
  avatarUrl,
  username,
}) => {
  return (
    <Card sx={{ width: 280, padding: '16px', borderRadius: '8px', boxShadow: 6 }}> {/* Increased box shadow */}
      <Box position="relative">
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
          sx={{ borderRadius: '8px' }} // Rounded corners for the image
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: '#7B5AFF',
            color: 'white',
            padding: '6px 8px',
            borderRadius: '8px',
            fontSize: '0.75rem',
          }}
        >
          Checked In
        </Box>
      </Box>
      <Box sx={{ padding: '5px 0px 0px 0px' ,
        marginTop: '5px',
      }}>
        <Typography gutterBottom variant="h5" fontSize={16} fontWeight="bold" color="black" component="div"> {/* Made text bold */}
          {title}
        </Typography>
        <Typography variant="body2" color="black" mt={1}>
          Date: {new Date(date).toLocaleDateString()}
        </Typography>
        <Box display="flex" alignItems="center" mt={1} sx={{ paddingBottom: '0px' }}>
          <Avatar alt={username} src={avatarUrl} sx={{ width: 24, height: 24, mr: 1 }} />
          <Typography variant="body2" color="black">
            Owner: {username}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default DataCard;
