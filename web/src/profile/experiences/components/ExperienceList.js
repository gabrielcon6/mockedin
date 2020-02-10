import React from 'react';
import CardMockedin from '../../../shared/components/UIElements/CardMockedin'
import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import '../../../places/components/PlaceList.css';
import ExperienceItem from './ExperienceItem';
import '../../../places/components/Experience.scss'
import { FaRegBuilding, FaPlus,FaPencilAlt } from 'react-icons/fa';

const ExperienceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No experience found. Maybe create one?</h2>
          <Button to="/experiences/new">Share Experience</Button>
        </Card>
      </div>
    );
  }

  return (
    <CardMockedin  className="cardMocke">
     <div className='card-title__experience'>
               <div className='card-title__experience__position'>
               <h4 >Experience</h4>
               </div> 
               <FaPlus className='plus-icon-size'/> 
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