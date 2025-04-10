
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, Settings, LogOut, Moon, Sun, Bell } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-prismatech-blue flex items-center justify-center">
              <span className="font-bold text-white">P</span>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">Prismatech</span>
          </Link>
        </div>
        
        {user ? (
          <>
            <nav className="hidden md:flex gap-6 items-center">
              <Link to="/dashboard" className="text-foreground hover:text-prismatech-blue transition-colors">
                Dashboard
              </Link>
              <Link to="/campaigns" className="text-foreground hover:text-prismatech-blue transition-colors">
                Campaigns
              </Link>
              <Link to="/ab-testing" className="text-foreground hover:text-prismatech-blue transition-colors">
                A/B Testing
              </Link>
              <Link to="/insights" className="text-foreground hover:text-prismatech-blue transition-colors">
                Insights
              </Link>
              <Link to="/reports" className="text-foreground hover:text-prismatech-blue transition-colors">
                Reports
              </Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Notifications"
              >
                <Bell size={18} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-prismatech-blue text-white">
                      {user.name.charAt(0)}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-prismatech-blue text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex w-full items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer flex w-full items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
            
            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
                <nav className="flex flex-col gap-4 p-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/campaigns"
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    Campaigns
                  </Link>
                  <Link
                    to="/ab-testing"
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    A/B Testing
                  </Link>
                  <Link
                    to="/insights"
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    Insights
                  </Link>
                  <Link
                    to="/reports"
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    Reports
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    Settings
                  </Link>
                  <button
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-left"
                    onClick={() => {
                      logout();
                      toggleMobileMenu();
                    }}
                  >
                    Log out
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Link to="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link to="/signup" className="hidden md:block">
              <Button>Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
