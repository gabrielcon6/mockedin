import React from 'react';


import CardMockedin from '../../../shared/components/UIElements/CardMockedin'
import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import '../../../places/components/PlaceList.css';
import OtherItem from './OtherItem';
import { FaRegBuilding, FaPlus,FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
    <CardMockedin className="cardMocke">
    <div className='card-title__experience'>
      <div className='card-title__experience__position'>
        <h4 >Accomplishments</h4>
      </div> 
      <Link to="/others/new"><FaPlus className='plus-icon-size'/> </Link>       
       </div>
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
    </CardMockedin>
  );
};

export default OtherList;