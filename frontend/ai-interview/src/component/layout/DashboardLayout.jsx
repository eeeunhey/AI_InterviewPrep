import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {   // ✅ children을 props로 받음
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar />

      {/* user가 있을 때만 children 렌더링 */}
      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
