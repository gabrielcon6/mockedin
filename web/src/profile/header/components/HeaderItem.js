import React, { useState, useContext } from 'react';

import CardMockedin from '../../../shared/components/UIElements/CardMockedin'
import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import '../../../places/components/PlaceItem.css';
import '../../../places/components/PlaceItemMockedin.scss';
import '../../../places/components/About.scss'
import { FaPencilAlt } from 'react-icons/fa';
import Background from '../../../shared/components/UIElements/Background'
import { Link } from 'react-router-dom';
const HeaderItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  let headerId = props.id;

  const confirmDeleteHandler = async (props) => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `/api/header/${headerId}`,
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
      header="Are you sure?"
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
        Do you want to proceed and delete this header? Please note that it
        can't be undone thereafter.
      </p>
    </Modal>
      <div>
        <div className='card-background'>
              <Background/>
        </div>
          <div className='icon-edit'>
              <div className='icon-test'>
              {auth.userId === props.creatorId && (
                <Link to={`/header/${props.id}`}><FaPencilAlt/></Link>
              )}
               </div>
          </div>
          <div className='card-content-container'>
            {isLoading && <LoadingSpinner asOverlay />}
            {props.image && 
            <div className="card-avatar">
            <img src={`/${props.image}`} className="avatar" alt={props.title}/>
            </div>
          }
          <div className='card-content__subcontainer'>
            <div className='card-headline'>
              <p className='card-user__name'>Name:{props.name}</p>
              <p>Job Title: {props.jobTitle}</p>
              <p className='card-user__sub'>Location: {props.location}</p>
              <p className='card-user__sub'></p>
              {/* <p className='headline__location'>About</p> */}
            {/* <div className="place-item__actions"> */}
            {/* <div className='card-action'>
              {auth.userId === props.creatorId && (
                <Button to={`/header/${props.id}`}>EDIT</Button>
              )}

              {auth.userId === props.creatorId && (
                <Button className='button-header' danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              )}
              </div> */}
             </div>
          </div>     
          </div>
          <>
        <div>
          <div className='about-title'>
            <h4 className='about-title__box'>About</h4> 
            <span className='about-icon'>
            {auth.userId === props.creatorId && (
                <Link to={`/header/${props.id}`}><FaPencilAlt/></Link>
              )}
            </span>
          </div>
            <div className='about-text__box'>
                <div className='about-text__content'>
                    <p className='about-text__content-element'>{props.about}</p>
                </div>
            </div>
            </div>
            </>
        </div> 

    </React.Fragment>

  );
};

export default HeaderItem;
