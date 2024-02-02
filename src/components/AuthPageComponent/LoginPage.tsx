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
  OutlinedInput,
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
  isLoginPage: boolean;
}

class LoginPage extends Component<LoginPageComponentProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      algorithm: "",
      isLoginPage: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event: any) => {
    this.setState({ algorithm: event.target.value as string });
  };

  switchPage = (isLoginPage: boolean) => {
    this.setState({ isLoginPage });
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
    const { isLoginPage } = this.state;

    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={6}
            xl={6}
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
                my: 2,
                mx: 15,
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
                <Typography
                  component="h1"
                  variant="h6"
                  onClick={() => this.switchPage(true)}
                  sx={{
                    cursor: "pointer",
                    color: this.state.isLoginPage ? "#3677f1" : "#b2b8c3",
                  }}
                >
                  Log  in 

                  <Box
                    sx={{
                      height: "1px",
                      width: "100%",
                      backgroundColor: this.state.isLoginPage ? "#3677f1" : "#b2b8c3",
                      paddingRight: "10px",
                    }}
                  ></Box>
                </Typography>
                <Typography
                  marginLeft={3}
                  component="h1"
                  variant="h6"
                  onClick={() => this.switchPage(false)}
                  sx={{
                    cursor: "pointer",
                    color: this.state.isLoginPage ? "#b2b8c3" : "#3677f1",
                  }}
                >
                  Sign Up
                  <Box
                    sx={{
                      height: "1px",
                      width: "100%",
                      backgroundColor: this.state.isLoginPage ? "#b2b8c3" : "#3677f1",
                      paddingRight: "10px",
                    }}
                  ></Box>
                </Typography>
              </Box>
              <Box
                component="form"
                noValidate
                onSubmit={this.handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      placeholder="First Name"
                      id="margin-normal"
                      name="firstName"
                      sx={{ "& input": { height: "10px" } }}
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
                      sx={{ "& input": { height: "10px" } }}
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
                  sx={{ "& input": { height: "10px" } }}
                  autoComplete="email"
                  margin="normal"
                />
                <TextField
                  placeholder="Create a password"
                  id="password"
                  name="password"
                  type="password"
                  fullWidth
                  sx={{ "& input": { height: "10px" } }}
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

                <Typography marginTop={2} display="flex" gutterBottom>
                  Date of Birth*
                </Typography>
                <Grid
                  style={{
                    display: "flex",
                    marginTop: "15px",
                  }}
                >
                  <Grid item>
                    <FormControl variant="outlined">
                      <InputLabel>Date</InputLabel>
                      <Select
                        style={{ height: "41px", width: "122px" }}
                        // value={selectedValue}
                        onChange={this.handleChange}
                        input={<OutlinedInput label="Date" />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item style={{ marginLeft: "16px" }}>
                    <FormControl variant="outlined">
                      <InputLabel>Month</InputLabel>
                      <Select
                        style={{ height: "41px", width: "122px" }}
                        // value={selectedValue}
                        onChange={this.handleChange}
                        input={<OutlinedInput label="Month" />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item style={{ marginLeft: "16px" }}>
                    <FormControl variant="outlined">
                      <InputLabel>Year</InputLabel>
                      <Select
                        style={{ height: "41px", width: "122px" }}
                        // value={selectedValue}
                        onChange={this.handleChange}
                        input={<OutlinedInput label="Year" />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                      </Select>
                    </FormControl>
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

                <Box
                  marginTop={3}
                  border="1px solid #b2b8c3"
                  style={{
                    display: "flex",
                  }}
                >
                  <Button>
                    <Grid marginLeft={2} display="flex">
                      {<GoogleIcon />}
                    </Grid>
                    <Grid marginLeft={12} color="black" fontWeight="600">
                      Sign Up with Google
                    </Grid>
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
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            lg={6}
            xl={6}
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
