import { Row } from "react-bootstrap";
import DestinationList from "./DestinationList";
function Grid() {
  return (
    <div className="col-11 mx-auto">


      <Row xs={1} md={1} className="g-4 mt-4">
        <h1 className="home-title">Trips</h1>
        <DestinationList />
      </Row>
    </div>
  );
}
export default Grid;