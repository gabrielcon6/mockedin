import React from 'react';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import '../../../places/components/PlaceList.css';

import HeaderItem from './HeaderItem';

const HeaderList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No header found. Maybe create one?</h2>
          <Button to="/header/new">Share Header</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map(header => (
        <HeaderItem
          key={header._id}
          id={header._id}
          name={header.name}
          image={header.image}
          jobTitle={header.jobTitle}
          location={header.location}
          about={header.about}
          adminComments={header.adminComments}
          isOk={header.isOk}
          creatorId={header.creator}
          onDelete={props.onDeleteHeader}
        />
      ))}
    </ul>
  );
};

export default HeaderList;
