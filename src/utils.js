import ErrorPage from "./component/ErrorPage";

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

export function errorBlock(message) {
  return(
    <div class="alert alert-danger" role="alert">
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