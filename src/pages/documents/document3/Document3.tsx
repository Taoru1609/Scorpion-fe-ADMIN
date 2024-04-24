import { FunctionComponent } from "react";
import Document3View from "./Document3.view";

export const Document3: FunctionComponent = (props: any) => {
  const list = [
    {
      id: 1,
      name: "dd",
    },
    {
      id: 2,
      name: "vvv",
    },
  ];

  let pageData = {
    props,
    list: list,
  };

  return Document3View(pageData);
};

export default Document3;
