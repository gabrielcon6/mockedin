import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import ExperienceList from '../components/ExperienceList';

const ExperiencePage = () => {
    const [loadedExperience, setLoadedExperience] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
    const userId = useParams().userId;
  
    useEffect(() => {
        const fetchExperience = async () => {
          try {
            const responseData = await sendRequest(
              `/api/experiences/user/${userId}`
            );
            setLoadedExperience(responseData.experience.experiences);
            console.log('response data',responseData.experience.experiences);
          } catch (err) {}
        };
        fetchExperience();
      }, [sendRequest, userId]);
    
      const experienceDeletedHandler = deletedExperienceId => {
        setLoadedExperience(prevExperience =>
          prevExperience.filter(experience => experience.id !== deletedExperienceId)
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
          {!isLoading && loadedExperience && (
            <ExperienceList items={loadedExperience} onDeleteExperience={experienceDeletedHandler} />
          )}
        </React.Fragment>
      );
    };
    

export default ExperiencePage;
