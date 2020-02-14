import React, {useContext} from 'react';

import CardMockedin from '../../../shared/components/UIElements/CardMockedin'
import Button from '../../../shared/components/FormElements/Button';
import '../../../places/components/PlaceList.css';
import { FaPlus } from 'react-icons/fa';
import EducationItem from './EducationItem';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../shared/context/auth-context';

const EducationList = props => {
  const auth = useContext(AuthContext);

  if (props.items.education.length === 0) {
    return (
      <div>
        <CardMockedin>
          <h2>No education found</h2>
          <div style={{margin:'3%'}}>
          <Button to="/education/new">Add Education</Button>
          </div>
        </CardMockedin>
      </div>
    );
  }
  return (
    <React.Fragment>
       <CardMockedin  className="cardMocke">
     <div className='card-title__experience'>
        <div className='card-title__experience__position'>
          <h4 >Education</h4>
        </div> 
        {auth.userId === props.userId && ( <Link to="/education/new"><FaPlus className='plus-icon-size'/> </Link> )}      
       </div>
        {props.items.education.map(education => (
          <EducationItem
            key={education._id}
            id={education._id}
            school={education.school}
            degree={education.degree}
            startDate={education.startDate}
            endDate={education.endDate}
            description={education.description}
            adminComments={education.adminComments}
            isOk={education.isOk}
            creatorId={education.creator}
            onDelete={props.onDeleteEducation}
          />
        ))}
      </CardMockedin>
      </React.Fragment>
  );
};

export default EducationList;
