import React, { useRef, useState } from "react";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import useClickOutside from "../../helpers/clickOutside";

export default function Home() {
  const [visible, setVisible] = useState(true);
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
  });
  return (
    <div>
      <Header />
      <LeftHome/>
      {visible && <div className="card" ref={el}></div>}
    </div>
  );
}
