// import React, { useEffect, useState } from "react";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/shared/components/common/StatusState";

// import apiClient from "@/lib/http/apiClient";
// import { authsApi } from "@/lib/api/auths.api";

import { useUser } from "../hooks/useAuth";

const ProfilePage = () => {
  //const [user, setUser] = useState<UserType | null>(null);
  //const [loading, setLoading] = useState<boolean>(true);
  //const [error, setError] = useState<string | null>(null);
  const {
    data: user,
    isLoading, // true = lần đầu fetch, chưa có data, true khi đang fetch
    isError, // true = fetch bị lõi
    error, // trả về OB nếu có lỗi
    refetch, // Func để re-fetch
    isFetching, // true = đang fetch ( dù có hay không data )
  } = useUser();
  console.log(user);

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchUser = async () => {
  //     try {
  //       const userData = await authsApi.getMe();
  //       const data = userData.data || userData;
  //       if (data) {
  //         setUser(data);
  //       }
  //     } catch (error) {
  //       setError("Khong co data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  if (isLoading) return <LoadingState />;
  if (isError)
    return (
      <ErrorState
        message={error?.message || "Fail to load profile"}
        onRetry={() => refetch()}
      />
    );
  if (!user) return <EmptyState />;

  return <div className="flex justify-center">hihi </div>;
};

export default ProfilePage;
