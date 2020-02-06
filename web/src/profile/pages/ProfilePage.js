import React from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import HeaderPage from '../header/pages/HeaderPage';
import ExperiencePage from '../experience/pages/ExperiencePage';

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
        <ExperiencePage userId={props.id}/>
      )}
    </React.Fragment>
  );
};

export default ProfilePage;
