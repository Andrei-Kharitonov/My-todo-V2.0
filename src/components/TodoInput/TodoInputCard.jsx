import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function TodoInputCard({ title, text }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div" style={{ fontWeight: 500, marginBottom: "15px" }}>
              {title}
            </Typography>
            <Typography variant="p" component="p" style={{ fontSize: "16px" }}>
              {text}
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </Card>
  );
}

TodoInputCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
};

export default TodoInputCard;