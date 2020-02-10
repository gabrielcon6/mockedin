import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import SearchBox from '../../search/components/SearchBox';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const [filteredUsers, setFilteredUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          '/api/users'
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  let filterUsers = (searchField) => {
    if (loadedUsers) {
      let filterResult = loadedUsers.filter(user => {
        return user.name.toLowerCase().includes(searchField.toLowerCase());
        }
      )
    setFilteredUsers(filterResult)
    }
    else {
      return [{name: 'no one'}]
    }
  };

  return (
    <React.Fragment>
      <SearchBox filterUsers={filterUsers}/>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && filteredUsers && <UsersList items={filteredUsers} />}
    </React.Fragment>
  );
};

export default Users;
