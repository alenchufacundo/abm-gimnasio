import React from "react";
import * as TablerIcons from "tabler-icons-react";
import { SxProps } from "@mui/material";

type TablerIconProps = {
  icon: keyof typeof TablerIcons;
  sx?: SxProps;
  size?: number;
  color?: string;
};

const TablerIcon: React.FC<TablerIconProps> = ({ icon, sx, size = 24, color }) => {
  const IconComponent = TablerIcons[icon];
  if (!IconComponent) return null;
  return (
    <span style={sx as React.CSSProperties}>
      <IconComponent size={size} color={color} />
    </span>
  );
};

export default TablerIcon;