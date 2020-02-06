import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import HeaderList from '../components/HeaderList';

const HeaderPage = () => {
    const [loadedHeader, setLoadedHeader] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
    const userId = useParams().userId;
  
    useEffect(() => {
        const fetchHeader = async () => {
          try {
            const responseData = await sendRequest(
              `/api/header/user/${userId}`
            );
            setLoadedHeader(responseData.header);
          } catch (err) {}
        };
        fetchHeader();
      }, [sendRequest, userId]);
    
      const headerDeletedHandler = deletedHeaderId => {
        setLoadedHeader(prevHeader =>
          prevHeader.filter(header => header.id !== deletedHeaderId)
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
          {!isLoading && loadedHeader && (
            <HeaderList items={loadedHeader} onDeleteHeader={headerDeletedHandler} />
          )}
        </React.Fragment>
      );
    };
    

export default HeaderPage;
