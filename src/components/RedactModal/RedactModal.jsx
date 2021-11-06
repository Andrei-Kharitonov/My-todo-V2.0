import React, { useState } from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import TodoInput from "../TodoInput/TodoInput";
import { fetchRedactTodo } from "../../store/reducers/todoMiddleware";

let modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  minWidth: "225px",
  maxWidth: "600px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

let btnStyle = {
  width: "100%",
  margin: "5px 0"
};

function RedactModal({ title, text, id, completed }) {
  let [open, setOpen] = useState(false);
  let handleOpen = () => setOpen(true);
  let handleClose = () => setOpen(false);

  return (
    <>
      <Button
        className="todo__btn-redact"
        variant="outlined"
        color="primary"
        style={btnStyle}
        startIcon={<CreateIcon />}
        onClick={handleOpen}
      >
        Redact
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle} style={{ padding: "10px" }}>
            <div className="close-modal">
              <div style={{ cursor: "pointer" }} onClick={handleClose}>
                <CloseIcon />
              </div>
            </div>
            <TodoInput initialState={{ title, text, id, completed }} todoDispatch={fetchRedactTodo} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

RedactModal.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  completed: PropTypes.bool
};

export default RedactModal;