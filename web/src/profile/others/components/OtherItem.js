import React, { useState, useContext } from 'react';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import '../../../places/components/PlaceItem.css';
import { FaTrophy, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import '../../../places/components/Experience.scss'

const OtherItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const otherId = props.id;

  const history = useHistory();

  const confirmDeleteHandler = async (props) => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `/api/others/${otherId}`,
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
        other="Are you sure?"
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
          Do you want to proceed and delete this other? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <div className='card-items'>
          <div className='card-items__icon-experience'>
          <FaTrophy className='icont-element' />
        </div> 
        <div className="sub__card">
        <div className="job-description">
        <span className='edit-job' >
          <p className='card-items__job-title'>{props.title}</p>
        {auth.userId === props.creatorId && (
              <div className='icons-elements'>
                <Link  to={`/other/${props.id}`}>
                  <FaPencilAlt className='edit-job-icon'/>
                </Link>
                <Link danger onClick={showDeleteWarningHandler}>
                  <FaTrash className='edit-job-icon'/>
                </Link>
              </div>
            )}
        </span>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__info">
            <p className='card-items__title'> {props.title}</p>
            <p className='card-items__title'>{props.company}</p>
            <div className='card-items-description'>
              <p className='card-items-description'>{props.description}</p>
            </div>
          </div>
         </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default OtherItem;
