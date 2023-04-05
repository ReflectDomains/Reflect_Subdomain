import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>home</p>

      <Button>demo</Button>

      <div>
        <Link to="/children">Go to children</Link>
      </div>
      <div>
        <Link to="/children/1">Go to children-1</Link>
      </div>
      <div>
        <Link to="/children/2">Go to children-2</Link>
      </div>
      <div>
        <Link to="/children/3">Go to children-3</Link>
      </div>
      <div>
        <Link to="/children/4">Go to children-4</Link>
      </div>
    </div>
  );
};

export default Home;
