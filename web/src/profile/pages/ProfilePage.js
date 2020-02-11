import React from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import HeaderPage from '../header/pages/HeaderPage';
import ExperiencePage from '../experiences/pages/ExperiencePage';
import EducationPage from '../education/pages/EducationPage';
import OtherPage from '../others/pages/OtherPage';

const ProfilePage = (props) => {

  const { isLoading, error, clearError } = useHttpClient();


  return (
    <React.Fragment>
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
