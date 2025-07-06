"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Star, Filter, SortAsc, SortDesc } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  price: number
  rating: number
  reviews: number
  image: string
  description: string
  inStock: boolean
  brand: string
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 6599,
    rating: 4.5,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life",
    inStock: true,
    brand: "AudioTech",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 16499,
    rating: 4.3,
    reviews: 890,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
    description: "Advanced fitness tracking with heart rate monitor, GPS, and waterproof design",
    inStock: true,
    brand: "FitPro",
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 2099,
    rating: 4.7,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
    description: "Comfortable organic cotton t-shirt in various colors, eco-friendly and breathable",
    inStock: true,
    brand: "EcoWear",
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    category: "Home & Garden",
    price: 2499,
    rating: 4.6,
    reviews: 723,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
    description: "Insulated water bottle keeps drinks cold for 24 hours, leak-proof design",
    inStock: false,
    brand: "HydroMax",
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse",
    category: "Electronics",
    price: 4999,
    rating: 4.4,
    reviews: 334,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center",
    description: "High-precision gaming mouse with RGB lighting and programmable buttons",
    inStock: true,
    brand: "GamePro",
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    category: "Sports",
    price: 3299,
    rating: 4.8,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1601925268030-e734cf5bdc52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHlvZ2ElMjBtYXR8ZW58MHx8MHx8fDA%3D",
    description: "Non-slip yoga mat with alignment guides, 6mm thickness for comfort",
    inStock: true,
    brand: "ZenFit",
  },
  {
    id: 7,
    name: "Coffee Maker Deluxe",
    category: "Home & Garden",
    price: 12399,
    rating: 4.2,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center",
    description: "Programmable coffee maker with thermal carafe and auto-brew timer",
    inStock: true,
    brand: "BrewMaster",
  },
  {
    id: 8,
    name: "Running Shoes",
    category: "Sports",
    price: 7499,
    rating: 4.5,
    reviews: 1123,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    description: "Lightweight running shoes with advanced cushioning and breathable mesh",
    inStock: true,
    brand: "RunFast",
  },
  {
    id: 9,
    name: "Denim Jacket",
    category: "Clothing",
    price: 5799,
    rating: 4.1,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D",
    description: "Classic denim jacket with modern fit, premium quality cotton blend",
    inStock: false,
    brand: "UrbanStyle",
  },
  {
    id: 10,
    name: "Portable Speaker",
    category: "Electronics",
    price: 3799,
    rating: 4.3,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    description: "Waterproof portable speaker with 12-hour battery and deep bass",
    inStock: true,
    brand: "SoundWave",
  },
  {
    id: 11,
    name: "Smartphone Case",
    category: "Electronics",
    price: 1299,
    rating: 4.4,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&crop=center",
    description: "Shockproof smartphone case with military-grade protection",
    inStock: true,
    brand: "GuardTech",
  },
  {
    id: 12,
    name: "Travel Backpack",
    category: "Sports",
    price: 4599,
    rating: 4.6,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    description: "Durable travel backpack with multiple compartments and laptop sleeve",
    inStock: true,
    brand: "AdventurePro",
  },
  {
    id: 13,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 8999,
    rating: 4.6,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center",
    description: "True wireless earbuds with active noise cancellation and wireless charging case",
    inStock: true,
    brand: "SoundPro",
  },
  {
    id: 14,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 9499,
    rating: 4.7,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center",
    description: "RGB mechanical keyboard with blue switches and programmable keys",
    inStock: true,
    brand: "TechKeys",
  },
  {
    id: 15,
    name: "Casual Sneakers",
    category: "Clothing",
    price: 4999,
    rating: 4.3,
    reviews: 834,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    description: "Comfortable casual sneakers perfect for everyday wear",
    inStock: true,
    brand: "ComfortWalk",
  },
  {
    id: 16,
    name: "Desk Lamp LED",
    category: "Home & Garden",
    price: 3499,
    rating: 4.4,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
    description: "Adjustable LED desk lamp with touch controls and USB charging port",
    inStock: true,
    brand: "BrightLight",
  },
  {
    id: 17,
    name: "Protein Shaker Bottle",
    category: "Sports",
    price: 899,
    rating: 4.2,
    reviews: 1245,
    image: "https://images.unsplash.com/photo-1693996045838-980674653385?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvdGVpbiUyMHNoYWtlciUyMGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D",
    description: "BPA-free protein shaker with mixing ball and measurement markings",
    inStock: true,
    brand: "FitShake",
  },
  {
    id: 18,
    name: "Hoodie Sweatshirt",
    category: "Clothing",
    price: 3299,
    rating: 4.5,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center",
    description: "Comfortable cotton blend hoodie with kangaroo pocket",
    inStock: true,
    brand: "CozyWear",
  },
  {
    id: 19,
    name: "Plant Pot Set",
    category: "Home & Garden",
    price: 1899,
    rating: 4.3,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&crop=center",
    description: "Set of 3 ceramic plant pots with drainage holes and saucers",
    inStock: true,
    brand: "GreenHome",
  },
  {
    id: 20,
    name: "Tablet Stand",
    category: "Electronics",
    price: 2299,
    rating: 4.1,
    reviews: 345,
    image: "https://plus.unsplash.com/premium_photo-1664392242935-f22e728a4667?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGFibGUlMjBzdGFuZHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Adjustable aluminum tablet stand compatible with all tablet sizes",
    inStock: true,
    brand: "StandPro",
  },
]

export default function ProductsPage() {
  const [products] = useState<Product[]>(sampleProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000 })
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]
  const brands = Array.from(new Set(products.map((p) => p.brand)))

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "price":
          comparison = a.price - b.price
          break
        case "rating":
          comparison = a.rating - b.rating
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [products, searchTerm, selectedCategory, priceRange, sortBy, sortOrder])

  const toggleSort = (field: "name" | "price" | "rating") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-slate-800">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                About
              </Link>
              <Link href="/todo-app" className="text-slate-600 hover:text-slate-900 transition-colors">
                To-Do App
              </Link>
              <Link href="/products" className="text-slate-900 font-medium">
                Products
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Product Catalog</h1>
          <p className="text-slate-600">
            Interactive product listing with advanced filtering, sorting, and search capabilities. Demonstrating dynamic
            data manipulation with JavaScript.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products, brands, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Toggle Filters */}
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${showFilters || "hidden lg:grid"}`}>
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ₹{priceRange.min.toLocaleString("en-IN")} - ₹{priceRange.max.toLocaleString("en-IN")}
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="w-20"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-20"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="md:col-span-2 lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "name" ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1"
                >
                  Name
                  {sortBy === "name" &&
                    (sortOrder === "asc" ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                </Button>
                <Button
                  variant={sortBy === "price" ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSort("price")}
                  className="flex items-center gap-1"
                >
                  Price
                  {sortBy === "price" &&
                    (sortOrder === "asc" ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                </Button>
                <Button
                  variant={sortBy === "rating" ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSort("rating")}
                  className="flex items-center gap-1"
                >
                  Rating
                  {sortBy === "rating" &&
                    (sortOrder === "asc" ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredAndSortedProducts.length} of {products.length} products
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-slate-500 text-lg">No products found matching your criteria.</p>
              <p className="text-slate-400 mt-2">Try adjusting your filters or search terms.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(product.name)}`
                    }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
                  <p className="text-sm text-slate-500">{product.brand}</p>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-3 line-clamp-2">{product.description}</CardDescription>

                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-slate-600 ml-1">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-slate-900">₹{product.price.toLocaleString("en-IN")}</span>
                    <Button size="sm" disabled={!product.inStock}>
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Features Info */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Interactive Features Demonstrated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">Search & Filter</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Real-time search across multiple fields</li>
                  <li>• Category-based filtering</li>
                  <li>• Price range filtering</li>
                  <li>• Stock status filtering</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-600">Sorting & Display</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Multi-field sorting (name, price, rating)</li>
                  <li>• Ascending/descending order toggle</li>
                  <li>• Responsive grid layout</li>
                  <li>• Results counter and summary</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-purple-600">User Experience</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Hover effects and transitions</li>
                  <li>• Mobile-responsive design</li>
                  <li>• Collapsible filter panel</li>
                  <li>• Visual feedback for interactions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
