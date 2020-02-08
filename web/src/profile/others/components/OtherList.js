import React from 'react';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import '../../../places/components/PlaceList.css';
import OtherItem from './OtherItem';

const OtherList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No other found. Maybe create one?</h2>
          <Button to="/others/new">Share Other</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(other => (
        <OtherItem
          key={other._id}
          id={other._id}
          title={other.title}
          company={other.company}
          startDate={other.startDate}
          endDate={other.endDate}
          adminComments={other.adminComments}
          isOk={other.isOk}
          creatorId={other.creator}
          onDelete={props.onDeleteOther}
        />
      ))}
    </ul>
  );
};

export default OtherList;