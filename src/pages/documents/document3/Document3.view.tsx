import React from "react";

export const Document3View = (props: any) => {
  console.log(props);

  return (
    <div>
      {props.list.map((item: any) => (
        <div>{item.id}</div>
      ))}
    </div>
  );
};

export default Document3View;
