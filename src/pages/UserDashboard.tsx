import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import HamperCard from '@/components/HamperCard';
import HamperModal from '@/components/HamperModal';
import Footer from '@/components/Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockHampers, Hamper } from '@/data/mockHampers';
import { useEffect } from 'react';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedHamper, setSelectedHamper] = useState<Hamper | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  useEffect(() => {
    if (!user || user.role !== 'user') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleHamperClick = (hamper: Hamper) => {
    setSelectedHamper(hamper);
    setModalOpen(true);
  };

  const filteredHampers = mockHampers.filter(
    (hamper) => categoryFilter === 'all' || hamper.category === categoryFilter
  );

  const categories = ['all', ...Array.from(new Set(mockHampers.map((h) => h.category)))];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Browse Our Collection
          </h1>
          <p className="text-lg text-muted-foreground">
            Find the perfect gift for any occasion
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHampers.map((hamper) => (
            <HamperCard
              key={hamper.id}
              hamper={hamper}
              onClick={() => handleHamperClick(hamper)}
            />
          ))}
        </div>
      </div>

      <Footer />

      <HamperModal
        hamper={selectedHamper}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default UserDashboard;
