import React from 'react';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import '../../../places/components/PlaceList.css';
import CardMockedin from '../../../shared/components/UIElements/CardMockedin'
import HeaderItem from './HeaderItem';
import Comments from '../../../user/admin/Comments'
const HeaderList = props => {
  const storedData = JSON.parse(localStorage.getItem('userData'));
  const isAdmin = storedData.isAdmin
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card style={{width:'53vw'}}>
          <div className='' style={{width:'100%'}}>
            <h2>No header found</h2>
            <div style={{paddingBottom:'10px'}}>
              <Button  to="/header/new">Add Header</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  return (
    <>
    <Comments/>
    <CardMockedin className="cardMocke">
      {props.items.map(header => (
        <HeaderItem
          key={header._id}
          id={header._id}
          name={header.name}
          image={header.fileLink}
          jobTitle={header.jobTitle}
          location={header.location}
          about={header.about}
          adminComments={header.adminComments}
          isOk={header.isOk}
          creatorId={header.creator}
          onDelete={props.onDeleteHeader}
          isAdmin={isAdmin}
        />
      ))}
    </CardMockedin>
        
    </>
  );
};

export default HeaderList;
