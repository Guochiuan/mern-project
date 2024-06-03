import React from 'react';

function PopupLink() {
    const openPopup = () => {
        window.open('https://docs.google.com/document/d/1qPNIzPcCcPXI_WX4mXQg4zJDZ6zdVgBW8Be-BfDh930/edit?usp=sharing', '_blank');
    };

    return (
        <button onClick={openPopup}>
            Open Popup
        </button>
    );
}

export default PopupLink;