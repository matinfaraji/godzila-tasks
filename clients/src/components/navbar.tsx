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
      setCurrentDate(`${formattedDate}`);
    };

    updateDate();
    const intervalId = setInterval(updateDate, 1000); 

    return () => clearInterval(intervalId);
  }, []);
  return (
    
      <div className="flex justify-around gap-8  text-1xl my-9">
        <form>
          <TextField
            id="search-bar"
            label="Search"
            variant="outlined"
            size="small"
          />
          <IconButton type="submit" aria-label="search ">
            <SearchIcon />
          </IconButton>
        </form>
        <p>{currentDate}</p>
        <div>
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
  );
}