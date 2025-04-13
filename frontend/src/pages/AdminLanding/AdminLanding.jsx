import features from "./AdminLanding.module.css";
import Title from "../../components/Title/Title";
import data from "./FeaturesData";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import shape from "../Landing/assets/logo.png";


const Features = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    console.log("Hello");
    logout();
  };

  const getFilteredFeatures = () => {
    if (!user) return [];
    if (user.role === "admin") return data;
    if (user.role === "teacher") return data.filter(feature => feature.access.includes("teacher"));
    if (user.role === "student") return data.filter(feature => feature.access.includes("student"));
    return [];
  };

  const getWelcomeMessage = () => {
    if (!user) return "Welcome!";
    if (user.role === "admin") return "Welcome, Admin! Manage your college efficiently.";
    if (user.role === "teacher") return "Welcome, Teacher! Access your teaching tools.";
    if (user.role === "student") return "Welcome, Student! Explore your learning resources.";
    return "Welcome!";
  };

  return (
    <>
      <div className={features["navbar"]}>
        <div className={features["logo"]}>
          <img src={shape} alt="" className={features["logo-icon"]} />
          <p className={features["app-name"]}>
            Campus Grid
          </p>
        </div>
        <div className={features["logout-btn"]}>
          <button onClick={handleClick}>Logout</button>
        </div>
      </div>
      <div>
        <header className={features["header"]}>
          <h2>{getWelcomeMessage()}</h2>
        </header>
        <div className={`${features["container"]}`}>
          {getFilteredFeatures().map((feature) => (
            <Link to={feature.route} key={feature.id} className={features["noUnderline"]}>
              <div key={feature.id} className={`${features["box"]}`}>
                <feature.icon className={`${features["icons"]}`} />
                <h2>{feature.name}</h2>
                <p>{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Features;
