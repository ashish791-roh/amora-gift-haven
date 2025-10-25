import { Link, useNavigate } from 'react-router-dom';
import { Gift, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-card/80 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover-scale">
          <img src={logo} alt="Tashya Gifts" className="h-10 w-10" />
          <span className="text-2xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tashya Gifts
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
          >
            Home
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin-dashboard"
              className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
            >
              Dashboard
            </Link>
          )}
          {user?.role === 'user' && (
            <Link
              to="/user-dashboard"
              className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
            >
              Browse
            </Link>
          )}
          <button
            onClick={handleContactClick}
            className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
          >
            Contact
          </button>
          
          {user ? (
            <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
