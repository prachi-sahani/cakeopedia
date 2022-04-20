import { Link } from "react-router-dom";
import "../stylesheets/page-not-found.css";

export function PageNotFound() {
  return (
    <div className="page-not-found my-5 heading h2 txt-center">
      <p className="my-2 txt-gray">
        <span className="txt-primary">OOPS!</span> Page not found
        <br />
        <Link className="link" to="/">
          <span className="txt-primary">Go to Home</span>
        </Link>
      </p>
    </div>
  );
}
