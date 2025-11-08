import { ChartNoAxesCombined, Box, Boxes, CircleUser, BadgeIndianRupee, ArrowRightLeft } from "lucide-react";
import Dashboard from "../../pages/dashboard";

export const getCardData = (dashboardData) =>{
  return [
    {
      total_no: dashboardData?.products || 0,
      item_name: "product",
      bg_col: "bg-[#5E60A9]",
      icon: Box,
      link: "products",
    },
    {
      total_no: dashboardData?.categories || 0,
      item_name: "Category",
      bg_col: "bg-[#2BBFCD]",
      icon: Boxes,
      link: "categories",
    },
    {
      total_no: dashboardData?.sellers || 0,
      item_name: "Sellers",
      bg_col: "bg-[#FE9C13]",
      icon: CircleUser,
      link: "sellers",
    },
    {
      total_no: dashboardData?.transactions || 0,
      item_name: "Transaction",
      bg_col: "bg-[#E83360]",
      icon: ArrowRightLeft,
      link: "transactions",
    },
    {
      total_no: dashboardData?.products || 0,
      item_name: "Total Sales",
      bg_col: "bg-[#E95937]",
      icon: BadgeIndianRupee,
      link: "/",
    },
    {
      item_name: "Analytics",
      bg_col: "bg-[#FE9C13]",
      icon: ChartNoAxesCombined,
      link: "/",
    },
  ];
  
}

