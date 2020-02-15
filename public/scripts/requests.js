const xhrGetRequest = function(url, callback){
  const req = new XMLHttpRequest();
  req.onload = function(){
    if(this.status === 200){
      callback(this.responseText);
    }else {  
      alert('Error', this.statusText); 
    } 
  };
  req.open('GET', url);
  req.send();
};

const xhrPostRequest = function(url, body, callback){
  const req = new XMLHttpRequest();
  req.onload = function(){
    if(this.status === 201){
      callback();
    } else if(this.status === 200){
      callback(this.responseText);
    } else {  
      alert('Error', this.statusText); 
    } 
  };
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(body);
};
