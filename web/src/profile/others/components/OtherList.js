import React, {useContext} from 'react';


import CardMockedin from '../../../shared/components/UIElements/CardMockedin'
import Button from '../../../shared/components/FormElements/Button';
import '../../../places/components/PlaceList.css';
import OtherItem from './OtherItem';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../shared/context/auth-context';

const OtherList = props => {
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <div >
        <CardMockedin>
          <h2>No accomplishments found</h2>
          <div style={{margin:'3%'}}>
            <Button to="/others/new">Add Accomplishments</Button>
          </div>
         
        </CardMockedin>
      </div>
    );
  }

  return (
    <CardMockedin className="cardMocke">
    <div className='card-title__experience'>
      <div className='card-title__experience__position'>
        <h4 >Accomplishments</h4>
      </div> 
      {auth.userId === props.userId && ( <Link to="/others/new"><FaPlus className='plus-icon-size'/> </Link> )}      
       </div>
      {props.items.map(other => (
        <OtherItem
          key={other._id}
          id={other._id}
          title={other.title}
          description={other.description}
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