import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import EducationList from '../components/EducationList';

const EducationPage = (props) => {
    const [loadedEducation, setLoadedEducation] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
    const userId = useParams().userId;
  
    useEffect(() => {
        const fetchEducation = async () => {
          try {
            const responseData = await sendRequest(
              `/api/education/user/${userId}`
            );
            setLoadedEducation(responseData.education);
          } catch (err) {}
        };
        fetchEducation();
      }, [sendRequest, userId]);
    
      const educationDeletedHandler = deletedEducationId => {
        setLoadedEducation(prevEducation =>
          prevEducation.filter(education => education.id !== deletedEducationId)
        );
      };
      return (
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && loadedEducation && (
            <EducationList userId={userId} items={loadedEducation} onDeleteEducation={educationDeletedHandler} />
          )}
        </React.Fragment>
      );
    };
    

export default EducationPage;
