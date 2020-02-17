const validateUserInfo = function(userName, password, confirmPassword) {
  return (
    !userName || !password || !confirmPassword || password !== confirmPassword
  );
};

const saveAndProceed = function() {
  const info = Array.from(document.querySelectorAll('input'));
  const [userName, password, confirmPassword] = info.map(element => {
    const value = element.value;
    element.value = '';
    return value;
  });
  if (validateUserInfo(userName, password, confirmPassword)) {
    return;
  }
  const content = JSON.stringify({ userName, password });
  xhrPostRequest('newUser', content, text => {
    const message = document.querySelector('.status');
    message.innerHTML = `<p>${text} : with this Username ${userName}</p>`;
    message.style.display = 'block';
  });
  showLogin();
};

const signUp = function() {
  document.querySelector('.signUp').style.display = 'flex';
  document.querySelector('#login').style.display = 'none';
};

const showLogin = function() {
  document.querySelector('.signUp').style.display = 'none';
  document.querySelector('#login').style.display = 'flex';
};

const checkValidUser = function(text) {
  const { isValid } = JSON.parse(text);
  if (!isValid) {
    document.querySelector('h5').classList.remove('hide');
    return;
  }
  document.location = '/homepage.html';
};

const login = function() {
  const userName = document.querySelector('.userName').value;
  const password = document.querySelector('.password').value;
  const body = JSON.stringify({ userName, password });
  xhrPostRequest('home', body, checkValidUser);
};
