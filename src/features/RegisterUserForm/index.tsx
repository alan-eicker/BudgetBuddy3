import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BrandLogo from '@/components/BrandLogo';

export default function RegisterUserForm() {
  return (
    <form>
      <Box padding={4}>
        <Typography
          sx={{ marginBottom: 2, textAlign: 'center' }}
          variant="h5"
          component="div"
        >
          <BrandLogo size={60} />
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
        </Typography>
        <Box marginBottom={2}>
          <TextField fullWidth required label="Email" name="email" />
        </Box>
        <Box marginBottom={2}>
          <TextField fullWidth required label="Username" name="username" />
        </Box>
        <Box marginBottom={2}>
          <TextField fullWidth required label="Password" name="password" />
        </Box>
        <Button variant="contained" size="large" fullWidth>
          Create User
        </Button>
      </Box>
    </form>
  );
}
