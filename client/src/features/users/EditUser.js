import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams(); // id is the param from the route
  // get the user from the store
  const user = useSelector((state) => selectUserById(state, id));
  // if user is not null, render the form, else render loading
  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  return content;
};
export default EditUser;
