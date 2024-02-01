import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import assets from "../../assets";
import FormControl from "@mui/material/FormControl";
import GoogleIcon from "@mui/icons-material/Google";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Fix the import
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createStyles,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  withStyles,
  WithStyles,
} from "@material-ui/core";

const styles = (theme: { spacing: (arg0: number) => any }) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    dividerColor: {
      textDecoration: "underline",
    },
    button: {
      margin: theme.spacing(1),
    },
  });

interface LoginPageComponentProps extends WithStyles<typeof styles> {}

interface AppState {
  algorithm: string;
}

class LoginPage extends Component<LoginPageComponentProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      algorithm: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event: any) => {
    this.setState({ algorithm: event.target.value as string });
  };

  handleSubmit(event: any) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  }

  render() {
    const defaultTheme = createTheme();
    const { classes } = this.props;

    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={7}
            xl={8}
            component={Paper}
            elevation={6}
            square
          >
            {" "}
            <Typography
              sx={{
                my: 2,
                mx: 2,
                display: "flex",
              }}
            >
              {" "}
              Company Name
            </Typography>
            <Box
              sx={{
                my: 4,
                mx: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography component="h1" variant="h6">
                  Sign in
                </Typography>

                <Typography marginLeft={3} component="h1" variant="h6">
                  Login in
                  <Divider />
                </Typography>
              </Box>
              <TextField
                placeholder="Last Name"
                id="lastName"
                name="lastName"
                fullWidth
                autoComplete="lastName"
                margin="normal"
              />

<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
        <Select
          native
          // value={state.age}
          // onChange={handleChange}
          label="Age"
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
        </FormControl>
              <Box style={{ textAlign: "center" }}>
                <FormControl
                  sx={{ m: 1, minWidth: 200, border: "1px solid #949494" }}
                >
                  <InputLabel
                    style={{
                      position: "absolute",
                      display: "flex",
                      width: "100%",
                      border:'none',
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "6px",
                    }}
                    id="demo-simple-select-label"
                  >
                    {/* Age */}
                  </InputLabel>

                  <Select
                    style={{ border: "none" }}
                    labelId="demo-simple-select-label" 

                    id="demo-simple-select"
                    value={this.state.algorithm}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="Stack">Stack</MenuItem>
                    <MenuItem value="Queue">Queue</MenuItem>
                    <MenuItem value="Array">Array</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box
                component="form"
                noValidate
                onSubmit={this.handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      placeholder="First Name"
                      id="margin-normal"
                      name="firstName"
                      fullWidth
                      autoComplete="firstName"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      placeholder="Last Name"
                      id="lastName"
                      name="lastName"
                      fullWidth
                      autoComplete="lastName"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <TextField
                  placeholder="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  fullWidth
                  autoComplete="email"
                  margin="normal"
                />
                <TextField
                  placeholder="Create a password"
                  id="password"
                  name="password"
                  type="password"
                  fullWidth
                  autoComplete="password"
                  margin="normal"
                />
                <Typography
                  marginLeft={2}
                  variant="caption"
                  display="flex"
                  gutterBottom
                >
                  must be at least 8 characters
                </Typography>

                <Typography marginTop={3} display="flex" gutterBottom>
                  Date of Birth*
                </Typography>
                <Grid
                  container
                  marginTop={1}
                  spacing={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <InputLabel id="demo-simple-select-label">Date</InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item>
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
                <Box
                  display="flex"
                  marginTop={3}
                  width="100%"
                  alignItems="center"
                >
                  <Box
                    sx={{
                      height: "1px",
                      width: "100%",
                      backgroundColor: "#b2b8c3",
                      paddingRight: "10px",
                    }}
                  ></Box>
                  <Box sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    OR
                  </Box>
                  <Box
                    sx={{
                      height: "1px",
                      width: "100%",
                      backgroundColor: "#b2b8c3",
                    }}
                  ></Box>
                </Box>

                <Box marginTop={3} border="1px solid #b2b8c3">
                  <Button startIcon={<GoogleIcon />}>
                    <Typography marginLeft={8} color="black" fontWeight="600">
                      Sign Up with Google
                    </Typography>
                  </Button>
                </Box>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  marginTop={2}
                >
                  {"By clicking below you agree "}
                  <Link href="#" variant="body2">
                    {"Terms and Conditions"}
                  </Link>
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
                  sx={{ marginTop: 3, marginBottom: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            lg={5}
            xl={4}
            sx={{
              backgroundImage: `url(${assets.images.loginImg})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(LoginPage);
