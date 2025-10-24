import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockHampers, Hamper } from '@/data/mockHampers';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hampers, setHampers] = useState<Hamper[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHamper, setEditingHamper] = useState<Hamper | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const stored = localStorage.getItem('amora-hampers');
    if (stored) {
      setHampers(JSON.parse(stored));
    } else {
      setHampers(mockHampers);
      localStorage.setItem('amora-hampers', JSON.stringify(mockHampers));
    }
  }, [user, navigate]);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const hamper: Hamper = {
      id: editingHamper?.id || Date.now().toString(),
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      occasion: (formData.get('occasion') as string).split(',').map(o => o.trim()),
      image: formData.get('image') as string,
    };

    let updated: Hamper[];
    if (editingHamper) {
      updated = hampers.map((h) => (h.id === editingHamper.id ? hamper : h));
      toast.success('Hamper updated successfully');
    } else {
      updated = [...hampers, hamper];
      toast.success('Hamper added successfully');
    }

    setHampers(updated);
    localStorage.setItem('amora-hampers', JSON.stringify(updated));
    setIsDialogOpen(false);
    setEditingHamper(null);
  };

  const handleDelete = (id: string) => {
    const updated = hampers.filter((h) => h.id !== id);
    setHampers(updated);
    localStorage.setItem('amora-hampers', JSON.stringify(updated));
    toast.success('Hamper deleted successfully');
  };

  const openAddDialog = () => {
    setEditingHamper(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (hamper: Hamper) => {
    setEditingHamper(hamper);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage your hamper inventory</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={openAddDialog} className="gap-2">
                <Plus className="h-5 w-5" />
                Add Hamper
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingHamper ? 'Edit Hamper' : 'Add New Hamper'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    name="name"
                    defaultValue={editingHamper?.name}
                    required
                    placeholder="Golden Celebration"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (£)</label>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingHamper?.price}
                    required
                    placeholder="89.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    name="category"
                    defaultValue={editingHamper?.category}
                    required
                    placeholder="Premium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Occasions (comma-separated)</label>
                  <Input
                    name="occasion"
                    defaultValue={editingHamper?.occasion.join(', ')}
                    required
                    placeholder="Birthday, Anniversary, Celebration"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    name="description"
                    defaultValue={editingHamper?.description}
                    required
                    placeholder="A luxurious hamper filled with..."
                    className="min-h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    name="image"
                    type="url"
                    defaultValue={editingHamper?.image}
                    required
                    placeholder="https://..."
                  />
                </div>
                <Button type="submit" variant="default" className="w-full">
                  {editingHamper ? 'Update Hamper' : 'Add Hamper'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hampers.map((hamper) => (
            <Card key={hamper.id} className="shadow-soft hover:shadow-hover transition-smooth">
              <CardHeader className="p-0">
                <img
                  src={hamper.image}
                  alt={hamper.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="font-serif text-xl mb-2">{hamper.name}</CardTitle>
                <p className="text-2xl font-bold text-primary mb-4">£{hamper.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openEditDialog(hamper)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDelete(hamper.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
