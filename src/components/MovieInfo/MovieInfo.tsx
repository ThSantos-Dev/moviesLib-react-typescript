// Styles
import './MovieInfo.css';

// Type - Icon
import { IconType } from 'react-icons';

// Classes adicionais
export enum EAditionalClass {
    DESCRIPTION = "description"
}

// Props
type Props = {
  title: string;
  icon?: IconType | any;
  info: string;
  aditionalClass?: EAditionalClass;
};

const MovieInfo = ({ title, icon, info, aditionalClass }: Props) => {
  return (
    <div className={`info ${aditionalClass ? aditionalClass : ""}`}>
      <h3>
        {icon && icon} {title && title}
      </h3>
      <p>{info && info}</p>
    </div>
  );
};

export default MovieInfo;
