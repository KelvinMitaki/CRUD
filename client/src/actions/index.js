import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS
} from "./types";
import streams from "../apis/streams";
import history from "../history";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
export const createStream = formValues => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post("/streams", { ...formValues, userId });
    history.push("/");
    return dispatch({ type: CREATE_STREAM, payload: response.data });
  };
};
export const fetchStreams = () => {
  return async dispatch => {
    const response = await streams.get("/streams");

    return dispatch({ type: FETCH_STREAMS, payload: response.data });
  };
};

export const fetchStream = id => {
  return async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    return dispatch({ type: FETCH_STREAM, payload: response.data });
  };
};
export const editStream = (id, formValues) => {
  return async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    history.push("/");
    return dispatch({ type: EDIT_STREAM, payload: response.data });
  };
};

export const deleteStream = id => {
  return async dispatch => {
    await streams.delete(`/streams/${id}`);
    history.push("/");
    return dispatch({ type: DELETE_STREAM, payload: id });
  };
};
