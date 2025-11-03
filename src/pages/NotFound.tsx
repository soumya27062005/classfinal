import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center animate-fade-up">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button className="bg-gradient-primary shadow-soft gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/features">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Explore Features
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
