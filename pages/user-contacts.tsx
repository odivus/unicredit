import { useState } from 'react';
import dbConnect from '../database/db-connect';
import getUserById from '../database/db-get-user-by-id';
import dbUpdateUserData from '../database/db-update-user-data';
import Head from 'next/head';

import UserDataProps from '../Interfaces/User-data-props';
import Header from '../components/Header/Header';
import HeadGlobal from '../components/Head-global/Head-global';
import Input from '../components/Ui/Input/Input';
import ButtonUpdate from '../components/Button-update/Button-update';

import Error from '../components/Error/Error';
import {userDataUnavailable} from '../components/Error/error-messages';

import {
  inputChange,
  userDataOnSubmit,
} from '../components/Ui/handlers/handlers';

export async function getServerSideProps() {
  await dbConnect();
  const user = await getUserById('5fec5250f79e186ea110fb6f');

  if (!user) return {
    props: {
      error: true,
      requestsLength: 0,
      user: {
        _id: '',
        contacts: {
          phone: '',
          email: '',
        },
      },
    },
  };

  return {
    props: {
      error: false,
      requestsLength: user.requests.length,
      user,
    },
  };
}

interface Props extends UserDataProps {
  error: boolean;
  requestsLength: number;
}

function UserContacts(props: Props) {
  const {
    phone,
    email
  } = props.user.contacts;
  const { _id } = props.user;
  const { error, requestsLength } = props;

  const [inputValue, setInputValue] = useState({
    phone: phone,
    email: email,
  });

  const [updateStatus, setUpdateStatus] = useState(false);

  const updatedData = {
    id: _id,
    contacts: {
      phone: inputValue.phone,
      email: inputValue.email,
    },
  };

  return (
    <>
      <HeadGlobal />
      <Head>
        <script
          defer
          src='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'
        ></script>
        <title>Контактная информация</title>
      </Head>
      <Header requestsLength={requestsLength} />
      <div className='row row_content'>
        <div className='col s12 m12 l12'>
          <h5 className='h5-mobile-top'>Контактная информация</h5>
          {
            error 
            ? <Error errorMessage={userDataUnavailable} />
            : <form
                className='user-data'
                onSubmit={(e) => userDataOnSubmit(e, dbUpdateUserData, setUpdateStatus, updatedData)}
              >
                <Input
                  type='text'
                  name='phone'
                  value={inputValue.phone ? inputValue.phone : phone}
                  disabled={false}
                  labelText='Мобильный телефон'
                  handler={(e) => inputChange(e, inputValue, setInputValue)}
                />
                <Input
                  type='email'
                  name='email'
                  value={inputValue.email ? inputValue.email : email}
                  disabled={false}
                  labelText='Электронная почта'
                  handler={(e) => inputChange(e, inputValue, setInputValue)}
                />
                <ButtonUpdate 
                  updateStatus={updateStatus} 
                  setUpdateStatus={setUpdateStatus}
                />
              </form>
          }
        </div>
      </div>
    </>
  );
}

export default UserContacts;
