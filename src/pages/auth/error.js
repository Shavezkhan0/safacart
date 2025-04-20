import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getMessage = () => {
    switch (error) {
      case "CredentialsSignin":
        return "Invalid email or password.";
      case "OAuthAccountNotLinked":
        return "This account is already linked with another provider.";
      case "AccessDenied":
        return "Access Denied.";
      default:
        return "An unexpected error occurred.";
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-red-500">Authentication Error</h1>
        <p className="mt-4">{getMessage()}</p>
      </div>
    </div>
  );
}
