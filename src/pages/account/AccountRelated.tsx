import useAuthStore from "@/lib/store/AuthStore";

export default function AccountRelated() {
  const { userData } = useAuthStore();
  console.log(userData);
  return <div>AccountRelated</div>;
}
