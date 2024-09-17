import { Button, IconButton, TextField, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

import SimpleDialogDemo from "./createTask";

export default function Navbar() {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      setCurrentDate(formattedDate);
    };

    updateDate();
    const intervalId = setInterval(updateDate, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
      my={2}
      mx={5}
      mb={10}
    >
      <form style={{ display: "flex", alignItems: "center" }}>
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
      <Typography variant="body1">{currentDate}</Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "darkblue",
            "&:hover": { backgroundColor: "#5500CC" },
          }}
        >
          new task
          <SimpleDialogDemo />
        </Button>
      </Box>
    </Box>
  );
}
