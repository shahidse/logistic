import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    width: 40,
    height: 40,
    border: "1px solid #ccc", // Default border color
    borderRadius: "8px", // Rounded corners
    transition: "all 0.2s ease-in-out",
    "&:hover": {
        borderColor: theme.palette.primary.main, // Hover effect
    },
    "&.Mui-checked": {
        borderColor: "var(--action)", // Active state border color
        backgroundColor: "var(--action)", // Active state background
        color: "#fff",
    },
    "& .MuiSvgIcon-root": {
        fontSize: 25, // Adjust icon size
    },
}));

function CustomizeCheckBox(props: CheckboxProps) {
    return <StyledCheckbox {...props} />;
}

export default CustomizeCheckBox;
