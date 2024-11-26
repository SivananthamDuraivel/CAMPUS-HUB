import features from "./AdminLanding.module.css";
import Title from "../../components/Title/Title";
import data from "./FeaturesData";
import {Link} from "react-router-dom"
const Features = () => {
  return (
    <div>
        <header className={features["header"]}>
        <h2>Welcome, Admin</h2>
        <p>Manage your college efficiently with these tools.</p>
      </header>
      <div className={`${features["container"]}`}>
        {data.map((feature) => (
          <Link to={feature.route}>
            <div key={feature.id} className={`${features["box"]}`}>
            <feature.icon className={`${features["icons"]}`} />
            <h2>{feature.name}</h2>
            <p>{feature.description}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Features;
