import { Button,   Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";


import SimpleDialogDemo from "./createTask";
import Weaders from "./weader";
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
      <Weaders/>
      </form>
      <Typography variant="body1">{currentDate}</Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "darkblue",
            "&:hover": { backgroundColor: "#5500CC" },textAlign:"center"
          }}
        >
          new task
          <SimpleDialogDemo />
        </Button>
      </Box>
    </Box>
  );
}
