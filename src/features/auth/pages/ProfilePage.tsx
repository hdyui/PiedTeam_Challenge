// import React, { useEffect, useState } from "react";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/shared/components/common/StatusState";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
// import apiClient from "@/lib/http/apiClient";
// import { authsApi } from "@/lib/api/auths.api";

import { CheckCircle2, Mail, BadgeInfo } from "lucide-react";
import { useUser } from "@/features/auth/hooks/useUser";
// import { data } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";

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

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-2xl font-bold">{user.fullName}</CardTitle>

          <CardDescription>@{user.fullName}</CardDescription>

          <Badge className="gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user.email}</span>
            </div>

            {/* <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user.phone}</span>
            </div> */}

            <div className="flex items-center gap-3">
              <BadgeInfo className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">User ID:</span>

              <code className="rounded bg-background px-2 py-1 text-sm">
                {user.id}
              </code>
            </div>
          </div>
        </CardContent>
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          className="relative"
        >
          {/* Show spinner khi đang refetch (có data cũ) */}
          {isFetching && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="animate-spin">🔄</span>
            </span>
          )}
          <span className={isFetching ? "opacity-0" : ""}>Refresh</span>
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;
