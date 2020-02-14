import React, { useState, useContext } from 'react';
import Moment from 'react-moment';

import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { FaPencilAlt,FaUniversity, FaTrash} from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import '../../../places/components/Experience.scss'
import '../../../places/components/PlaceItem.css';

const EducationItem = props => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  let educationId = props.id;

  const history = useHistory();

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
    history.push('/');
    history.push('/' + auth.userId + '/profile');
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
              <p className='card-items__job-title'>{props.school}</p>
              {auth.userId === props.creatorId && (
                <div className='icons-elements'>
                  <Link className='link-style' to={`/education/${props.id}`}>
                   <FaPencilAlt/>
                  </Link>
                  <Link  danger onClick={showDeleteWarningHandler}>
                   <FaTrash className='link-style'/>
                </Link>
              </div>
            )}
          </span>
          <div className="place-item__info">
                <p className='card-items__title'>{props.degree}</p>
                <p className='card-items__date '> &nbsp;	
                <Moment format="MMM YYYY">
                    {props.startDate}
                </Moment> 
                |&nbsp;	
                <Moment format="MMM YYYY">
                    {props.endDate}
                </Moment> 
                <br/>
               </p>
               <div className='card-items-description'>
                <p className='card-items-description'>{props.description}</p>
              </div>
          </div>
          <div className="place-item__actions">
            {/* {auth.userId === props.creatorId && (
              <Button to={`/education/${props.id}`}>EDIT</Button>
            )} */}
          </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default EducationItem;
