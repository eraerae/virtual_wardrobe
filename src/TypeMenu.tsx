import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

const TypeMenu = ({ imageUrl }: string) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const supabase = useSupabaseClient();

  async function insertRow(typeName: string) {
    const {} = await supabase
      .from("wardrobe")
      .insert([{ name: imageName, type: typeName, image_url: imageUrl }])
      .select();
    alert("Name and Type successfully added");
  }
  const [imageName, setImageName] = useState("");

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={anchorEl ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? "true" : undefined}
        onClick={handleClick}
      >
        + Add type and name
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <label>name&nbsp;</label>

          <input
            onChange={(e) => setImageName(e.target.value)}
            placeholder="name your item"
          ></input>
        </MenuItem>
        <MenuItem
          onClick={() => {
            insertRow("top");
            handleClose();
          }}
        >
          top
        </MenuItem>
        <MenuItem
          onClick={() => {
            insertRow("bottom");
            handleClose();
          }}
        >
          bottom
        </MenuItem>
        <MenuItem
          onClick={() => {
            insertRow("shoes");
            handleClose();
          }}
        >
          shoes
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TypeMenu;
