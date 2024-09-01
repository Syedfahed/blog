import { message } from 'antd';

const useNotification = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = (content) => {
    messageApi.open({
      type: 'success',
      content: content || 'Success',
    });
  };

  const error = (content) => {
    messageApi.open({
      type: 'error',
      content: content || 'Error',
    });
  };

  const warning = (content) => {
    messageApi.open({
      type: 'warning',
      content: content || 'Warning',
    });
  };

  // Return the contextHolder and the notification functions
  return { contextHolder, success, error, warning };
};

export { useNotification };
