import React, { useState, useContext } from 'react';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { FaRegBuilding, FaPencilAlt,FaUniversity} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../../places/components/PlaceItem.css';

const EducationItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  let educationId = props.id;

  const confirmDeleteHandler = async (props) => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `/api/education/${educationId}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        education="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this education? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <div className='card-items'>
        <div className='card-items__icon-experience'>
          <FaUniversity className='icont-element' />
        </div> 
        <div className="sub__card">
        <div className="job-description">
          <span className='edit-job' >
          {/* {isLoading && <LoadingSpinner asOverlay />}
          {props.image && 
          <div className="place-item__image">
            <img src={`/${props.image}`} alt={props.title}/>
          </div>} */}
              <p className='card-items__job-title'>School: {props.school}</p>
              {auth.userId === props.creatorId && (
              <Link to={`/education/${props.id}`}><FaPencilAlt/></Link>
            )}
          </span>
          <div className="place-item__info">
                <p className='card-items__title'>Degree: {props.degree}</p>
                <p className='card-items__date '>{props.startDate} - {props.endDate}</p>
                <p>{props.description}</p>
          </div>
          {/* <div className="place-item__actions">
            {auth.userId === props.creatorId && (
              <Button to={`/education/${props.id}`}>EDIT</Button>
            )}

            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default EducationItem;
