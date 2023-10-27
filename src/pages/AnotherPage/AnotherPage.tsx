import { Link } from 'react-router-dom';
import './AnotherPage.scss';

type AnotherPageProps = {
  title: string;
};

const AnotherPage = ({ title }: AnotherPageProps) => {
  return (
    <section className="another">
      <h1>{title}</h1>
      <p>
        Click to <Link to="/reports">ReportPage</Link> for see details
      </p>
    </section>
  );
};

export default AnotherPage;
