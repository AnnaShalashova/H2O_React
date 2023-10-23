import { Link } from "react-router-dom";
import './AnotherPage.scss';


const AnotherPage = ({ title }) => {
    return (
        <div className="another">
            <h1>{title}</h1>
            <p>Click to <Link to="/reports">ReportPage</Link> for see details</p>
        </div>
    )

}

export default AnotherPage;