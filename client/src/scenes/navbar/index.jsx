import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName } = useSelector((state) => state.user);
  const theme = useTheme();
  const fullName = `${firstName} ${lastName}`;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { neutral, background } = theme.palette;

  const commonMenu = (
    <>
      <Tooltip title="Toggle Dark/Light Mode" arrow>
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Messages" arrow>
        <IconButton>
          <Message />
        </IconButton>
      </Tooltip>

      <Tooltip title="Notifications" arrow>
        <IconButton>
          <Notifications />
        </IconButton>
      </Tooltip>

      <Tooltip title="Help" arrow>
        <IconButton>
          <Help />
        </IconButton>
      </Tooltip>

      <FormControl variant="standard" value={fullName}>
        <Select
          value={fullName}
          sx={{
            backgroundColor: neutral.light,
            width: "150px",
            p: "0.25rem 1rem",
            borderRadius: "5px",
          }}
          input={<InputBase />}
        >
          <MenuItem value={fullName}>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
        </Select>
      </FormControl>
    </>
  );

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={background.alt}>
      <FlexBetween gap="1.5rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{ cursor: "pointer" }}
        >
          Connectifys
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutral.light}
            borderRadius="10px"
            gap="1rem"
            padding="0.5rem 1.5rem"
          >
            <InputBase placeholder="Search..." sx={{ width: "100%" }} />
            <Tooltip title="Search" arrow>
              <IconButton>
                <Search />
              </IconButton>
            </Tooltip>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">{commonMenu}</FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="400px"
          minWidth="300px"
          backgroundColor={background}
          padding="1rem"
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => setIsMobileMenuToggled(false)}>
              <Close />
            </IconButton>
          </Box>
          <FlexBetween flexDirection="column" alignItems="center" gap="1rem">
            {commonMenu}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
