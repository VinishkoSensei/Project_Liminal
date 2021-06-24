export const handleSignIn = async ({ userCredentials, token }) => {
  if (userCredentials) {
    const { email, password } = userCredentials;
    const userdata = await fetch(`http://localhost:3001/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', 'Accept-Language': 'ru' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return userdata;
  } else {
    const userdata = await fetch(`http://localhost:3001/signin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    return userdata;
  }
};

export const handleGetUser = async (userId, token) => {
  const userdata = await fetch(`http://localhost:3001/user/${userId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  });
  return userdata;
};

export const handleSignUp = async (
  email,
  firstname,
  lastname,
  date,
  phone,
  file,
  password
) => {
  const response = await fetch(`http://localhost:3001/createuser`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      firstname: firstname,
      lastname: lastname,
      date: date,
      phone: phone,
      file: file,
      password: password,
    }),
  });

  return response;
};

export const handleChangeUser = async (id, value, changingItemType, token) => {
  const response = await fetch(`http://localhost:3001/user/${id}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json', authorization: token },
    body: JSON.stringify({
      id: id,
      value: value,
      changingItemType: changingItemType,
    }),
  });

  return response;
};
