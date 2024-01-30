export function stagingContent(isLoading, isError, data) {
  let content = null;
  if (isLoading) {
    content = <p className="text-center  my-2 fs-5 text-primary">Loading..</p>;
  }
  if (!isLoading && isError) {
    content = <p className="text-danger">There was an error</p>;
  }
  if (!isLoading && !isError && data?.length === 0) {
    content = <p>There is no result</p>;
  }

  return content;
}
