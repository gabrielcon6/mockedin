import React from 'react';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import '../../../places/components/PlaceList.css';
import ExperienceItem from './ExperienceItem';

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

  console.log(props.items);
  return (
    <ul className="place-list">
      {props.items.map(experience => (
        <ExperienceItem
          key={experience._id}
          id={experience._id}
          title={experience.title}
          company={experience.company}
          startDate={experience.startDate}
          endDate={experience.endDate}
          adminComments={experience.adminComments}
          isOk={experience.isOk}
          creatorId={experience.creator}
          onDelete={props.onDeleteExperience}
        />
      ))}
    </ul>
  );
};

export default ExperienceList;