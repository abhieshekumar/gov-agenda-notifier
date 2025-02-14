import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Subscribe.scss';
import classnames from 'classnames';
import { useLocation, useHistory } from 'react-router-dom';
import BackNavigation from '../BackNavigation/BackNavigation';
import Spinner from '../Spinner/Spinner';
import CustomInput from '../CustomInput/CustomInput';
import SubscribeConfirmation from './SubscribeConfirmation';
import {
  validatePhone,
  validateEmail,
} from './validation';
import { convertQueryStringToServerFormat } from './subscribeQueryString';

/**
 * This is the component for community member subscribe page.
 *
 * props:
 *    createSubscriptions
 *      The function that creates a subscription (or subscriptions) on the server
 *    isLoading
 *      A boolean values that indicates whether the communication with the server is in progress
 *    error
 *      An error object returned from the server if there is any error
 *    subscriptions
 *      Newly created subscriptions (response from the server)
 *
 *
 * state:
 *    isFormSubmitted
 *      A boolean value that indicates whether the form has been submitted
 *    phone
 *      A string value that stores the entered user's phone
 *    email
 *      A string value that stores the entered user's email
 *    phoneError
 *      A validation error for phone
 *    emailError
 *      A validation error for email
 */

function Subscribe({
  createSubscriptions,
  isLoading,
  error,
  subscriptions,
}) {
  const { t } = useTranslation();

  const history = useHistory();
  const queryString = useLocation().search;
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handlePhoneChanged = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    setFormSubmitted(true);
    setPhoneError(null);
    setEmailError(null);
    const phoneValidationError = validatePhone(phone);
    const emailValidationError = validateEmail(email);
    if (phoneValidationError !== null || emailValidationError !== null) {
      if (phoneValidationError) {
        setPhoneError(phoneValidationError);
      }
      if (emailValidationError) {
        setEmailError(emailValidationError);
      }
      // Form is not valid, do not continue.
      return;
    }
    e.preventDefault();

    createSubscriptions({
      variables: {
        phone_number: phone,
        email_address: email,
        meetings: convertQueryStringToServerFormat(queryString),
      },
    });
  };

  const closeConfirmation = () => {
    history.goBack();
  };

  return (
    <div className={classnames('subscribe-view')}>
      <BackNavigation />
      <div className="wrapper">
        <div className="text">
          <h3>{t('meeting.tabs.agenda.list.subscribe.page.title')}</h3>
          <p>
            {t('meeting.tabs.agenda.list.subscribe.page.description')}
          </p>
          <form className="form">
            <div className="input-group">
              <span>{t('meeting.tabs.agenda.list.subscribe.page.inputs.sms.label')}</span>
              <CustomInput
                type="tel"
                placeholder={t('meeting.tabs.agenda.list.subscribe.page.inputs.sms.placeholder')}
                isRequired
                isSubmitted={isFormSubmitted}
                value={phone}
                onChange={handlePhoneChanged}
                errorMessage={phoneError}
              />
            </div>
            <div className="input-group">
              <span>{t('meeting.tabs.agenda.list.subscribe.page.inputs.email.label')}</span>
              <CustomInput
                type="email"
                placeholder={t('meeting.tabs.agenda.list.subscribe.page.inputs.email.placeholder')}
                isRequired
                isSubmitted={isFormSubmitted}
                value={email}
                onChange={handleEmailChanged}
                errorMessage={emailError}
              />
            </div>
            { subscriptions && subscriptions.length > 0
              && (
                <SubscribeConfirmation
                  numberOfSubscriptions={subscriptions.length}
                  onClose={closeConfirmation}
                />
              )}
            { error
              && (
                <div className="form-error">{ error.message }</div>
              )}
            <div className="row">
              <button
                type="button"
                disabled={!phone || !email}
                onClick={handleSubmit}
              >
                {isLoading && <Spinner />}
                {`Subscrib${isLoading ? 'ing...' : 'e'}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
