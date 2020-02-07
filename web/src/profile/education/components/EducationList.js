import React from 'react';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import '../../../places/components/PlaceList.css';

import EducationItem from './EducationItem';


const EducationList = props => {
  console.log(props.items.education);

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
      <ul className="place-list">
        {props.items.education.map(education => (
          <EducationItem
            key={education._id}
            id={education._id}
            name={education.name}
            image={education.image}
            jobTitle={education.jobTitle}
            about={education.about}
            adminComments={education.adminComments}
            isOk={education.isOk}
            creatorId={education.creator}
            onDelete={props.onDeleteEducation}
          />
        ))}
      </ul>
      </React.Fragment>
  );
};

export default EducationList;
