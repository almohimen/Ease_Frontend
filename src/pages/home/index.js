// import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
// import Stories from "../../components/home/stories";
// import useClickOutside from "../../helpers/clickOutside";
import './style.css'

export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div>
      <Header />
      <LeftHome user={user} />
      <RightHome user={user} />
      <div className="home_middle">
        {/* <Stories/> */}
        <CreatePost/>
      </div>
    </div>
  );
}
