export const HOST = import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const CONTACT_ROUTES = "api/contacts";
export const SEARCH_CONTACTS_ROUTES = `${CONTACT_ROUTES}/search`;


export const SOCKET_HOST = import.meta.env.VITE_SERVER_URL;





export const MESSAGES_ROUTES = "/api/messages";
export const FETCH_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/get-messages`;
export const UPLOAD_FILE = `${MESSAGES_ROUTES}/upload-file`;

export const CHANNEL_ROUTES = "/api/channel";
export const CREATE_CHANNEL = `${CHANNEL_ROUTES}/create-channel`;
export const GET_USER_CHANNELS = `${CHANNEL_ROUTES}/get-user-channels`;
export const GET_CHANNEL_MESSAGES = `${CHANNEL_ROUTES}/get-channel-messages`;


// export const GET_CONTACTS_WITH_MESSAGES_ROUTE = `${CONTACTS_ROTUES}/get-contacts-for-list`;
// export const GET_ALL_CONTACTS = `${CONTACTS_ROTUES}/all-contacts`;

export const MESSAGE_TYPES = {
  TEXT: "text",
  FILE: "file",
};