import React, { memo } from "react";
import {
  Button,
  PopupBody,
  PopupContainer,
  PopupFooter,
  PopupHeader,
} from "../../style";

const Popup = memo((props) => {
  const { showPopup, objPopup } = props;

  const closePopup = () => {
    showPopup({ show: false, msg: "", header: "", action: null });
  };

  if (!objPopup.show) return null;
  return (
    <PopupContainer>
      <PopupHeader>{objPopup.header} </PopupHeader>
      <PopupBody>{objPopup.msg} </PopupBody>
      <PopupFooter>
        <Button className="popup-btn secondary" onClick={closePopup}>
          Cancel
        </Button>
        <Button className="popup-btn" onClick={objPopup.action}>
          {objPopup.primaryText}
        </Button>
      </PopupFooter>
    </PopupContainer>
  );
});

export default Popup;
