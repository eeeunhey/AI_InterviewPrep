import React from 'react'
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../component/layout/DashboardLayout";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>Dashboard</DashboardLayout>
  )
}

export default Dashboard