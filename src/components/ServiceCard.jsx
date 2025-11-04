import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

function ServiceCard({ icon, title, desc }) {
  return (
    <Paper elevation={2} sx={{ p: 2, textAlign: 'center', minHeight: 170 }}>
      <Avatar sx={{ width: 56, height: 56, margin: "0 auto", bgcolor: "#e3f2fd" }}>
        {icon}
      </Avatar>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{desc}</Typography>
    </Paper>
  );
}
export default ServiceCard;
