import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "./useAxiosBase";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosBase = useAxiosBase();

  const {
    data: userRole,
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: () =>
      axiosBase.get(`/user-role?email=${user.email}`).then((res) => res.data),
  });

  return {
    userRole,
    roleLoading: authLoading || roleLoading,
    refetchUserRole: refetch,
  };
};

export default useUserRole;
