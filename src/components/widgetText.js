import React from "react";

function widgetText(props) {
  return (
    <div className="Widget-Wrap">
      <div className="Widget-Title">{props.title}</div>
      <div className="Widget-Value">
        <div className="value">{props.value}</div>
        <div className="description">{props.description}</div>
      </div>
    </div>
  );
}

export default widgetText;
