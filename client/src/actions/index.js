import streams from "../components/api/streams";
import history from "../components/history";
export const signIn = userId => {
  return {
    type: "SIGN_IN",
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT"
  };
};

export const postStream = (formValues, userId) => {
  return async dispatch => {
    const response = await streams.post("/streams", { ...formValues, userId });
    dispatch({ type: "POST_STREAM", payload: response.data });
    history.push("/");
  };
};
export const fetchStreams = () => {
  return async dispatch => {
    const response = await streams.get("/streams");
    dispatch({ type: "FETCH_STREAMS", payload: response.data });
  };
};

export const fetchStream = id => {
  return async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: "FETCH_STREAM", payload: response.data });
  };
};
export const editStream = (formValues, id, userId) => {
  return async dispatch => {
    const response = await streams.put(`/streams/${id}`, {
      ...formValues,
      userId
    });
    dispatch({ type: "EDIT_STREAM", payload: response.data });
    history.push("/");
  };
};

export const deleteStream = id => {
  return async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({ type: "DELETE_STREAM", payload: id });
    history.push("/");
  };
};
