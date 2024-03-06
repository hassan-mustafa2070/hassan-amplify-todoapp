import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App({signOut}) {
  return (
    <div >
      <h3>Hello</h3>
      <button onClick={signOut}>signOut</button>
    </div>
  );
}

export default withAuthenticator(App);
