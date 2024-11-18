import features from "./Features.module.css";
import Title from "../Title/Title";
import data from "./FeaturesData";

const Features = () => {
  return (
    <div>
      <Title title={"Features"} />
      <div className={`${features["container"]}`}>
        {data.map((feature) => (
          <div key={feature.id} className={`${features["box"]}`}>
            <feature.icon className={`${features["icons"]}`} />
            <h2>{feature.name}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
