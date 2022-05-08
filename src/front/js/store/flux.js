const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: null,
    },
    actions: {
      verify: async () => {
        try {
          const resp = await fetch(
            "https://3001-4geeksacade-reactflaskh-3ai8sed950e.ws-eu44.gitpod.io/api/protected",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          const data = await resp.json();
          setStore({ logged: data.logged_in || false });
        } catch (e) {
          setStore({ logged: false });
        }
      },

      logout: async () => {
        localStorage.clear();
        setStore({ logged: false });
      },

      setStoreUser: (user) => {
        setStore({ user: user });
      },

      getUser: async () => {
        let token = localStorage.getItem("token");
        if (token != null && token != undefined) {
          const response = await fetch(
            "https://3001-4geeksacade-reactflaskh-3ai8sed950e.ws-eu44.gitpod.io/api/user",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          const data = await response.json();
          getActions().setStoreUser(data.user);
        } else {
          getActions().setStoreUser(null);
        }
      },
    },
  };
};

export default getState;
