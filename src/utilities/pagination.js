export const handleUpdate = (values, docs, currentPage, setCurrentPage, innerLoading, setInnerLoading, dispatch, fetch, payload) => {
  const { scrollTop, scrollHeight, clientHeight } = values; //get elements from object
  const pad = 0; // how much px from bottom
  const t = (Math.round(scrollTop) + pad) / (scrollHeight - clientHeight); // must be at least 1.0
  if (t >= 0.999 && docs.totalPages >= currentPage && !innerLoading) {
    dispatch(setInnerLoading(true));
    fetch(payload);
    setCurrentPage(currentPage + 1);
  }
};
