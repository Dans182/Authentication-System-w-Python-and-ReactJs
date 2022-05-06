const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: null,
    },
    actions: {
      setStoreUser: (user) => {
        setStoreUser({ user: user });
      },
    },
  };
};

export default getState;
