import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import Card from '../../../shared/components/UIElements/Card';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';

import { VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import '../../../places/pages/PlaceForm.css';

const UpdateOther = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedOther, setLoadedOther] = useState();
  const otherId = useParams().otherId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      company: {
        value: '',
        isValid: false
      },
      startDate: {
        value: '',
        isValid: false
      },
      endDate: {
        value: null,
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchOther = async () => {
      try {
        const responseData = await sendRequest(
          `/api/others/${otherId}`
        );
        setLoadedOther(responseData.other);
        setFormData(
          {
            title: {
              value: responseData.others.name,
              isValid: true
            },
            company: {
              value: responseData.others.jobTitle,
              isValid: true
            },
            startDate: {
              value: responseData.others.about,
              isValid: true
            },
            endDate: {
              value: responseData.others.image,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchOther();
  }, [sendRequest, otherId, setFormData]);

  const otherUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `/api/others/${otherId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          company: formState.inputs.company.value,
          startDate: formState.inputs.startDate.value,
          endDate: formState.inputs.endDate.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/' + auth.userId + '/profile');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedOther && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Other!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedOther && (
        <form className="place-form" onSubmit={otherUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your title."
            onInput={inputHandler}
            initialValue={loadedOther.title}
            initialValid={true}
          />
          <Input
            id="company"
            element="input"
            type="text"
            label="Company"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the name of the company."
            onInput={inputHandler}
            initialValue={loadedOther.company}
            initialValid={true}
          />
          <Input
            id="startDate"
            element="input"
            type="date"
            label="Start Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your about text."
            onInput={inputHandler}
            initialValue={loadedOther.startDate}
            initialValid={true}
          />
          <Input
            id="endDate"
            element="input"
            type="date"
            label="End Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your about text."
            onInput={inputHandler}
            initialValue={loadedOther.endDate}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE Other
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateOther;
