import useFetch from '../../../hooks/useFetch';
import { useState, useEffect } from "react";
import UsersTable from "../../../component/partials/users/usersTable";

const users_url = `${import.meta.env.VITE_SERVER_URL}/users/customers-for-managers`


function Users() {

  const [users, setUsers] = useState([]);

  const [data, loading, error] = useFetch(users_url);

  useEffect(() => {
    if (data) {
      setUsers(data.users);
      console.log(users);
    }
  }, [data]);

  if (loading) {
    return <span>loading...</span>;
  }

  if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <>
          {users && (
        <UsersTable data={users}/>
      )}
    </>
  )
}

export default Users