import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const BreadcrumbNav = ({ links }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {links.map((link, index) =>
        link.active ? (
          <Typography key={index} color="textPrimary">
            {link.label}
          </Typography>
        ) : (
          <Link
            key={index}
            color="inherit"
            href={link.href}
            style={{ textDecoration: "none" }}
          >
            {link.label}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
