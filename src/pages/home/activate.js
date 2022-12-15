import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import RightHome from "../../components/home/right";
import ActivateForm from "./ActivateForm";
import "./style.css";

export default function Activate() {
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeeded."
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed."
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <div className="home_middle">
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}