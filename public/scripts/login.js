const login = function(){
  const userName = document.querySelector('.userName').value;
  const password = document.querySelector('.password').value;
  if(userName === 'vaishu' && password === 'sravani'){
    window.location.href = '/homePage.html';
    return;
  }
  alert('invalid user');
};
