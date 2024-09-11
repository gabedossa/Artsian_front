import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import axios from 'axios';
import { BackendCard } from '../../component/CardBackend/CardBackend';

export const AdminDashboard = () => {
  return (
<div className="admin-dashboard">

      <BackendCard/>

  </div>
  );
};