import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

export const Togglable = forwardRef((props, ref) => {
  const [showing, setShowing] = useState(false);

  const initiallyShowing = { display: showing ? "" : "none" };
  const initiallyHidden = { display: showing ? "none" : "" };

  const toggleDisplay = () => {
    setShowing(!showing);
  };

  useImperativeHandle(ref, () => {
    return { toggleDisplay };
  });

  return (
    <div>
      <div style={initiallyHidden}>
        <button onClick={toggleDisplay}>{props.buttonLabel}</button>
      </div>
      <div style={initiallyShowing}>
        {props.children}
        <button onClick={toggleDisplay}>Close Blog creation</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
