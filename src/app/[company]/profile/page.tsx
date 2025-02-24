import React from "react";
import UserProfile from "../../../components/profile/user-profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page",
};

const Profile = () => {
  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default Profile;
