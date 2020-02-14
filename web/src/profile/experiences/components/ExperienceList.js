import React, {useContext} from 'react';
import CardMockedin from '../../../shared/components/UIElements/CardMockedin'
import Button from '../../../shared/components/FormElements/Button';
import '../../../places/components/PlaceList.css';
import ExperienceItem from './ExperienceItem';
import '../../../places/components/Experience.scss'
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../shared/context/auth-context';

const ExperienceList = props => {
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <div >
        <CardMockedin >
          <h2>No experience found</h2>
          <div style={{margin:'3%'}}>
            <Button to="/experiences/new">Add Experience</Button>
          </div>
        </CardMockedin>
      </div>
    );
  }

  return (
    <CardMockedin  className="cardMocke">
     <div className='card-title__experience'>
      <div className='card-title__experience__position'>
        <h4 >Experience</h4>
      </div>
      {auth.userId === props.userId && ( <Link to="/experiences/new"><FaPlus className='plus-icon-size'/> </Link> )}      
       </div>
      {props.items.map(experience => (
        <ExperienceItem
          key={experience._id}
          id={experience._id}
          title={experience.title}
          company={experience.company}
          startDate={experience.startDate}
          endDate={experience.endDate}
          adminComments={experience.adminComments}
          description={experience.description}
          isOk={experience.isOk}
          creatorId={experience.creator}
          onDelete={props.onDeleteExperience}
        />
      ))}
   </CardMockedin>
  );
};

export default ExperienceList;