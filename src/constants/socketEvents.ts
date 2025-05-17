export const SOCKET_EVENTS = {
  EMIT: {
    CLIENT_START_CHAT: 'client_start_chat',
    CLIENT_SEND_MESSAGE: 'client_send_message',
    CLIENT_CLOSE_CHAT: 'client_close_chat',
  },
  ON: {
    SERVER_SEND_ERROR: 'server_send_error',
    SERVER_SEND_MESSAGE: 'server_send_message',
    SERVER_START_THINKING: 'server_start_thinking',
    SERVER_STOP_THINKING: 'server_stop_thinking',
    SERVER_CLOSE_CHAT: 'server_close_chat',
  },
};
