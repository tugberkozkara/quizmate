import {Navigate} from 'react-router-dom';

type RequireAuthProps = {
    children: JSX.Element,
    selfUsername: string
  }
  
export const RequireAuth = ({children, selfUsername}: RequireAuthProps) => {
    if (selfUsername === '') {
      return <Navigate to="/" />;
    }
    return children;
}
