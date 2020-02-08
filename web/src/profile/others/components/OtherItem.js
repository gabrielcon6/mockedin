import React, { useState, useContext } from 'react';
import Moment from 'react-moment';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import '../../../places/components/PlaceItem.css';

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
  };

  // let endDate = Moment(`${props.endDate}`).format("MMMM D, YYYY");

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
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__info">
            <h1>Others</h1>
            <h2>Title: {props.title}</h2>
            <h3>Company: {props.company}</h3>
            <p>Start Date: &nbsp;	
              <Moment format="MMMM YYYY">
                  {props.startDate}
              </Moment> |
            End Date: &nbsp;	
              <Moment format="MMMM YYYY">
                  {props.endDate}
              </Moment>
            </p>
          </div>
          <div className="place-item__actions">
            {auth.userId === props.creatorId && (
              <Button to={`/other/${props.id}`}>EDIT</Button>
            )}

            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>

  );
};

export default OtherItem;
