import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { getUserProfile } from "../services/apiService";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(); // Hàm API lấy thông tin user
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <Card title={profile.name} style={{ width: 300 }}>
        <p>Email: {profile.email}</p>
        <p>Reference ID: {profile.referenceId}</p>
      </Card>
    </div>
  );
};

export default ProfilePage;
