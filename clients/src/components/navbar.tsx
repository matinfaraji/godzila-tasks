import { Button, IconButton, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Navbar() {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      setCurrentDate(`${formattedDate}`); // اصلاح شده
    };

    updateDate();
    const intervalId = setInterval(updateDate, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <form className="flex items-center">
        <TextField
          id="search-bar"
          label="Search"
          variant="outlined"
          size="small"
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>
      <p>{currentDate}</p>
      <div className="flex items-center space-x-2">
        <IconButton aria-label="notifications" sx={{ color: "#7700FF" }}>
          <NotificationsIcon />
        </IconButton>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7700FF",
            "&:hover": { backgroundColor: "#5500CC" },
          }}
        >
          Purple Button
        </Button>
      </div>
    </div>
  )}