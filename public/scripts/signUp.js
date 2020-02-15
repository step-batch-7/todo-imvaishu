const validateUserInfo = function(userName, password, confirmPassword){
  return !userName || !password || !confirmPassword || password !== confirmPassword;
};

const saveAndProceed = function(){
  const info = Array.from(document.querySelectorAll('input'));
  const [userName, password, confirmPassword] = info.map(element => {
    const value = element.value;
    element.value = '';
    return value;
  });
  if(validateUserInfo(userName, password, confirmPassword)){
    return;
  }
  const content = JSON.stringify({userName, password});
  xhrPostRequest('newUser', content, () => {});
};
