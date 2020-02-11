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

const UpdateEducation = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEducation, setLoadedEducation] = useState();
  const educationId = useParams().educationId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      school: {
        value: '',
        isValid: false
      },
      degree: {
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
      },
      description: {
        value: null,
        isValid: false
      }
  
    },
    false
  );

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const responseData = await sendRequest(
          `/api/education/${educationId}`
        );
        setLoadedEducation(responseData.education);
        setFormData(
          {
            school: {
              value: responseData.education.name,
              isValid: true
            },
            degree: {
              value: responseData.education.jobTitle,
              isValid: true
            },
            startDate: {
              value: responseData.education.about,
              isValid: true
            },
            endDate: {
              value: responseData.education.image,
              isValid: true
            },
            description: {
              value: responseData.education.description,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchEducation();
  }, [sendRequest, educationId, setFormData]);

  const educationUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `/api/education/${educationId}`,
        'PATCH',
        JSON.stringify({
          school: formState.inputs.school.value,
          degree: formState.inputs.degree.value,
          startDate: formState.inputs.startDate.value,
          endDate: formState.inputs.endDate.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/' + auth.userId + '/education');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedEducation && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find education!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedEducation && (
        <form className="place-form" onSubmit={educationUpdateSubmitHandler}>
          <Input
            id="school"
            element="input"
            type="text"
            label="School"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your school name."
            onInput={inputHandler}
            initialValue={loadedEducation.school}
            initialValid={true}
          />
          <Input
            id="Degree"
            element="input"
            type="text"
            label="Degree"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your degree."
            onInput={inputHandler}
            initialValue={loadedEducation.degree}
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
            initialValue={loadedEducation.startDate}
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
            initialValue={loadedEducation.endDate}
            initialValid={true}
          />
           <Input
            id="description"
            element="text"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your about text."
            onInput={inputHandler}
            initialValue={loadedEducation.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE Education
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateEducation;
