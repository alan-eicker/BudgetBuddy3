import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BrandLogo from '@/components/BrandLogo';

export default function RegisterUserForm() {
  return (
    <form>
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
      <TextField fullWidth required label="Email" name="email" />
      <TextField fullWidth required label="Username" name="username" />
      <TextField fullWidth required label="Password" name="password" />
      <Button variant="contained" size="large" fullWidth>
        Create User
      </Button>
    </form>
  );
}
