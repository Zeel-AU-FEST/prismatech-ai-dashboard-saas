
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="w-full max-w-md text-center">
        <ShieldAlert className="h-24 w-24 text-destructive mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          Sorry, you don't have permission to access this page. This area requires higher access privileges.
        </p>
        {user && (
          <p className="text-sm mb-6">
            You are logged in as <span className="font-medium">{user.name}</span> with <span className="font-medium capitalize">{user.role}</span> role.
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
