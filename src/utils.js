import ErrorPage from "./component/ErrorPage";

export async function fetchPostData(source, data) {
  let response = { result: null, error: null }
  try {
    const response = await fetch(source, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 
        "content-type": "application/json" 
      },
    });
    response.result = await response.json();
    console.log(response.result);
  } catch (error) {
    alert('ERROR');
    response.error = error;
  }
  return response;
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