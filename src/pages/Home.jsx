import { Link } from "react-router-dom";
import "../stylesheets/home.css";

export function Home() {
  return (
    <div className="container">
      <img
        className="hero-img p-2"
        src="assets/hero-image.gif"
        alt="Cakeopedia"
      />
      <div className="hero-content p-2">
        <h2 className="heading h1">Cakeopedia</h2>
        <h2 className="heading h2 txt-gray">
          One stop note taking destination
        </h2>
        <p className=" txt-md py-2 my-4">
          Never miss a brilliant recipe, note it down with{" "}
          <strong className="txt-primary">Cakeopedia</strong>! Keep a track of
          all your orders at one place.
        </p>
        <Link to="/notes" className="link btn-basic btn-primary">
          Try Cakeopedia, it's free!
        </Link>
      </div>
    </div>
  );
}
