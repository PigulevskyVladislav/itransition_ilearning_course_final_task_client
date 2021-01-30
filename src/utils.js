import ErrorPage from "./component/ErrorPage";

export function fetchPostData(source, data, callback) {
  let response = { result: null, error: null };
    fetch(source, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 
        "content-type": "application/json" 
      },
    }).then(res => res.json())
      .then(
      (result) => {
        response.result = result;
        callback(response);
      }
    ,
      (error) => {
        response.error = error;
        callback(response);
      }
  );
  return response;
}

export function fetchPostImage(data, newCollection, fetchCallback, callback) {
  let response = { result: null, error: null }

    fetch("https://api.cloudinary.com/v1_1/finaltaskcloud/image/upload", {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
      .then(
        (result) => {
          newCollection.picture = result.secure_url;
          return fetchCallback(getAddress().concat("/collections/add"), newCollection, callback);
        }
      ,
        () => {
          response.error = 'Upload image error';
          return(response);
        }
    );
}

export function fetchData(source, callback) {
  let response = { result: null, error: null }
    fetch(source)
      .then(res => res.json())
      .then(
        (result) => {
          response.result = result;
          callback(response);
        }
      ,
        (error) => {
          response.error = error;
          callback(response);
        }
    );
    return response;
}

export function resultBlock(message, type) {
  return(
    <div className={"alert alert-".concat(type)} role="alert">
      {message}
    </div>
  );
}

export function errorPage(error) {
  return <ErrorPage message={error.message}/>
}

export function loading() {
  return(
  <div className="spinner-border text-primary" role="status">
    <span className="sr-only">Loading...</span>
  </div>);
}

export function getAddress() {
  return "https://localhost:44352";
}