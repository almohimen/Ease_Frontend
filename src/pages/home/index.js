// import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import RightHome from "../../components/home/right";
// import useClickOutside from "../../helpers/clickOutside";
import './style.css'

export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div>
      <Header />
      <RightHome user={user} />
      <div className="home_middle">
        <CreatePost user={user}/>
      </div>
    </div>
  );
}

