import React from 'react';
import { BackendCard } from '../../component/CardBackend/CardBackend';
import { TopNavBar } from '../../component/TopNavBar/TopNavBar';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <TopNavBar/>
      <BackendCard />
    </div>
  );
};
