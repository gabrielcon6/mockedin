import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Checkbox } from '@thumbtack/thumbprint-react';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import Card from '../../../shared/components/UIElements/Card';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import ImageUpload from '../../../shared/components/FormElements/ImageUpload';
import { VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import '../../../places/pages/PlaceForm.css';

const UpdateHeader = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedHeader, setLoadedHeader] = useState();
  const [address, setAddress] = React.useState("");
  const [check, setCheck] = useState(false);
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });
  const headerId = useParams().headerId;
  const history = useHistory();

  const storedData = JSON.parse(localStorage.getItem('userData'));
  const isAdmin = storedData.isAdmin

  const searchOptions = {
    types: ['(cities)'],
    componentRestrictions: {country: "au"}
   }

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };


  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      jobTitle: {
        value: '',
        isValid: false
      },
      location: {
        value: '',
        isValid: false
      },
      about: {
        value: '',
        isValid: false
      },
      file: {
        value: null,
        isValid: false
      },
      adminComments: {
        value: null,
        isValid: false
      },
      isOk: {
        value: null,
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const responseData = await sendRequest(
          `/api/header/${headerId}`
        );
        setLoadedHeader(responseData.header);
        setFormData(
          {
            name: {
              value: responseData.header.name,
              isValid: true
            },
            jobTitle: {
              value: responseData.header.jobTitle,
              isValid: true
            },
            location: {
              value: responseData.header.location,
              isValid: true
            },
            about: {
              value: responseData.header.about,
              isValid: true
            },
            file: {
              value: responseData.header.fileLink,
              isValid: true
            },
            adminComments: {
              value: responseData.header.adminComments,
              isValid: true
            },
            isOk: {
              value: responseData.header.isOk,
              isValid: true
            }
          },
          true
        );
        setCheck(responseData.header.isOk);
      } catch (err) {}
    };
    fetchHeader();
  }, [sendRequest, headerId, setFormData]);

    //   vvvvvv Admin is OK checkbox logic here
    useEffect(() => {
      setCheck(check)
      }, [check])
  
    const handleCheck = (e) =>{
      setCheck(!check)
    }
  //   ^^^^^^^ Admin is OK checkbox logic up here

  const headerUpdateSubmitHandler = async event => {
    event.preventDefault();

  try {
    const formData = new FormData();
    formData.append('name', formState.inputs.name.value);
    // formData.append('file', formState.inputs.file.value);
    formData.append('jobTitle', formState.inputs.jobTitle.value);
    formData.append('location', address ? address : loadedHeader.location);
    formData.append('about', formState.inputs.about.value);
    formData.append('adminComments', formState.inputs.adminComments.value);
    formData.append('isOk', check);
    await sendRequest(
      `/api/header/${headerId}`,
      'PATCH', 
      formData, {
      Authorization: 'Bearer ' + auth.token
    });
    history.push('/');
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

  if (!loadedHeader && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find header!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedHeader && (
        <form className="place-form" onSubmit={headerUpdateSubmitHandler}>
          {!isAdmin && <div><Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name."
            onInput={inputHandler}
            initialValue={loadedHeader.name}
            initialValid={true}
          />
          <ImageUpload
            id="file"
            onInput={inputHandler}
            initialValue={loadedHeader.fileLink}
            errorText="Please provide a photo."
          />
          <Input
            id="jobTitle"
            element="textarea"
            label="Job Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your job title."
            onInput={inputHandler}
            initialValue={loadedHeader.jobTitle}
            initialValid={true}
          />

          <div>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            searchOptions={searchOptions}
            initialValue={loadedHeader.location}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <h2>Location</h2>
                <input {...getInputProps({ placeholder: "Type address" } ) } />
                
                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map(suggestion => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          </div>
          <Input
            id="about"
            element="textarea"
            label="About"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your about text."
            onInput={inputHandler}
            initialValue={loadedHeader.about}
            initialValid={true}
          />
      </div>}
          {isAdmin &&
          <div>
            <Input
              id="adminComments"
              element="textarea"
              label="Comments"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter cmments."
              onInput={inputHandler}
              initialValue={loadedHeader.adminComments}
              initialValid={true}
            />
            <Checkbox type="checkbox" onChange={handleCheck} hasError={!check} isChecked={check}>{check ? 'Session marked as done!' : 'Mark session as done.'}</Checkbox>
            </div>}
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE HEADER
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateHeader;
