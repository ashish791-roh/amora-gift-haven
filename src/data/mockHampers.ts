export interface Hamper {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  occasion: string[];
  image: string;
}

export const mockHampers: Hamper[] = [
  {
    id: '1',
    name: 'Golden Celebration',
    price: 89.99,
    description: 'A luxurious hamper filled with premium champagne, artisan chocolates, and gourmet snacks. Perfect for celebrating life\'s special moments.',
    category: 'Premium',
    occasion: ['Birthday', 'Anniversary', 'Celebration'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Gourmet Delights',
    price: 65.50,
    description: 'Carefully curated selection of artisan cheeses, crackers, preserves, and fine wines for the food connoisseur.',
    category: 'Gourmet',
    occasion: ['Thank You', 'Corporate', 'Housewarming'],
    image: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Sweet Moments',
    price: 45.00,
    description: 'An indulgent collection of handcrafted chocolates, cookies, and sweet treats beautifully presented.',
    category: 'Sweet',
    occasion: ['Birthday', 'Get Well', 'Thank You'],
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Wellness & Spa',
    price: 72.00,
    description: 'Pamper someone special with organic bath products, scented candles, and relaxation essentials.',
    category: 'Wellness',
    occasion: ['Birthday', 'Thank You', 'Sympathy'],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Coffee Connoisseur',
    price: 55.00,
    description: 'Premium coffee beans, artisan biscuits, and coffee accessories for the caffeine enthusiast.',
    category: 'Beverages',
    occasion: ['Corporate', 'Thank You', 'Housewarming'],
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'New Baby Joy',
    price: 68.00,
    description: 'Celebrate the arrival of a new bundle of joy with soft toys, baby essentials, and treats for parents.',
    category: 'Baby',
    occasion: ['New Baby', 'Baby Shower'],
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop'
  }
];
