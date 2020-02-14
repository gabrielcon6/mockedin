import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import HeaderPage from '../header/pages/HeaderPage';
import ExperiencePage from '../experiences/pages/ExperiencePage';
import EducationPage from '../education/pages/EducationPage';
import OtherPage from '../others/pages/OtherPage';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';


const ProfilePage = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const history = useHistory();


  const sendAdminEmail = async () => {
  try {
    await sendRequest(
      '/api/users/' + auth.userId + '/send-to-admin',
      'POST',
    );
  } catch (err) {}
  history.push('/');
  history.push('/' + auth.userId + '/profile');
};

  return (
    <React.Fragment>
      <Button onClick={sendAdminEmail}>Send Email</Button>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && (
        <HeaderPage />
      )}
      {!isLoading && (
        <ExperiencePage userId={props.userId}/>
      )}
      {!isLoading && (
        <EducationPage userId={props.userId}/>
      )}
      {!isLoading && (
        <OtherPage userId={props.userId}/>
      )}
    </React.Fragment>
  );
};

export default ProfilePage;
