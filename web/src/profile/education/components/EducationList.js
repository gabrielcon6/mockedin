import React from 'react';

import CardMockedin from '../../../shared/components/UIElements/CardMockedin'
import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import '../../../places/components/PlaceList.css';
import { FaRegBuilding, FaPlus,FaPencilAlt } from 'react-icons/fa';
import EducationItem from './EducationItem';


const EducationList = props => {

  if (props.items.education.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No education found. Maybe create one?</h2>
          <Button to="/education/new">Share Education</Button>
        </Card>
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
               <FaPlus className='plus-icon-size'/> 
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
