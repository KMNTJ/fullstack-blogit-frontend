import PropTypes from "prop-types";

export const EventMessage = ({ message }) => {
  if (!message) return;

  const type = message.type;

  let color = "green";
  if (type === "error") color = "red";

  let style = {
    borderColor: color,
    borderStyle: "solid",
    borderWidth: "3px",
    borderRadius: "5px",
  };

  return <div style={style}>{message.content}</div>;
};

EventMessage.propTypes = {
  message: PropTypes.object,
};
