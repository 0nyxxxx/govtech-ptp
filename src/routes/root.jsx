import { BrowserRouter as Router, Link, Route } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="  text-dark p-3 rounded d-flex justify-content-center flex-column" style={{backgroundColor:"#262626"}}>
          <Link
            to="/form"
            className="btn btn-lg text-white"
            style={{ marginBottom: "10px",backgroundColor:"#478547"}}
          >
            Health Declaration Form
          </Link>
          <Link
            to="/responses"
            className="btn btn-lg btn-info text-white "
            style={{backgroundColor:"#008080"}}
          >
            View Responses
          </Link>
        </div>
      </div>
    </>
  );
}
