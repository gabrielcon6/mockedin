import React, { useState, useContext } from 'react';
import Moment from 'react-moment';

import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import '../../../places/components/Experience.scss'
import { FaRegBuilding, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

const ExperienceItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const experienceId = props.id;

  const history = useHistory();

  const confirmDeleteHandler = async (props) => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `/api/experiences/${experienceId}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      props.onDelete();
    } catch (err) {}
    history.push('/');
    history.push('/' + auth.userId + '/profile');
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        experience="Are you sure?"
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
          Do you want to proceed and delete this experience? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <div className='card-items'>
          <div className='card-items__icon-experience'>
          <FaRegBuilding className='icont-element' />
        </div> 
        <div className="sub__card">
        <div className="job-description">
          <span className='edit-job' >
            <p className='card-items__job-title'>{props.title}</p>
              {auth.userId === props.creatorId && (
                <div className='icons-elements' >
                  <Link to={`/experience/${props.id}`}> 
                    <FaPencilAlt className='edit-job-icon'/>
                  </Link>
                  <Link danger className='edit-job-icon' onClick={showDeleteWarningHandler}>
                    <FaTrash/>
                  </Link>
                </div>
                )}
          </span>
          {isLoading && <LoadingSpinner asOverlay />}
            <div className="place-item__info">
            <p className='card-items__title'>{props.company}</p>
            <p className='card-items__date '> &nbsp;	
            {props.startDate && (
                <Moment format="MMM YYYY">
                    {props.startDate}
                </Moment> 
                )}
                {!props.startDate && (
                    'Present'
                )} |&nbsp;	
                {props.endDate && (
                <Moment format="MMM YYYY">
                    {props.endDate}
                </Moment> 
                )}
                {!props.endDate && (
                    'Present'
                )}
            </p>
            <div className='card-items-description'>
              <p className='card-items-description'>{props.description}</p>
            </div>
            
            </div>
            <div className="place-item__actions">

          </div>
         </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default ExperienceItem;
