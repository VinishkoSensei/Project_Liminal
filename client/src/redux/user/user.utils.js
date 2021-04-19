export const handleSignIn = async (email, password) => {
  const userdata = await fetch(`http://localhost:3001/getprofile`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  return userdata.json();
};
