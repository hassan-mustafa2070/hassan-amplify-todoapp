import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Createtodo from "./components/Createtodo/Createtodo"
function App({signOut,user}) {
  return (
    <div >
     <Createtodo signOut={signOut}  user={user} />
    </div>
  );
}

export default withAuthenticator(App);
