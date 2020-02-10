import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import OtherList from '../components/OtherList';

const OtherPage = (props) => {
    const [loadedOther, setLoadedOther] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
    const userId = useParams().userId;
  
    useEffect(() => {
        const fetchOther = async () => {
          try {
            const responseData = await sendRequest(
              `/api/others/user/${userId}`
            );
            setLoadedOther(responseData.other.others);
          } catch (err) {}
        };
        fetchOther();
      }, [sendRequest, userId]);
    
      const otherDeletedHandler = deletedOtherId => {
        setLoadedOther(prevOthers =>
          prevOthers.filter(other => other.id !== deletedOtherId)
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
          {!isLoading && loadedOther && (
            <OtherList userId={userId} items={loadedOther} onDeleteOther={otherDeletedHandler} />
          )}
        </React.Fragment>
      );
    };
    

export default OtherPage;
