"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProductCarousel from "./components/ProductCarousel"
import ProductCard from "./components/ProductCard"
import ProductModal from "./components/ProductModal"
import ProductForm from "./components/ProductForm"
import CategoryFilter from "./components/CategoryFilter"
import { Button } from "@/components/ui/button"
import { Plus, Loader2, ShoppingBag, Sparkles } from "lucide-react"

function App() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3001/products")
      if (!response.ok) {
        throw new Error("Erro na rede. Não foi possível carregar os produtos.")
      }
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error("Erro ao carregar produtos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((product) => product.category === selectedCategory))
    }
  }, [selectedCategory, products])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleShare = (product) => {
    const message = `🛍️ Confira este produto incrível!\n\n*${product.name}*\n💰 Por apenas R$ ${product.price.toFixed(2)}\n\n📱 Veja mais detalhes e faça seu pedido!`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleOpenForm = async () => {
    setIsAddingProduct(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const password = prompt("Digite a senha de administrador:")
    if (password === "admin123") {
      setIsAdmin(true)
      setIsFormOpen(true)
    } else {
      alert("Acesso negado. Senha incorreta.")
    }
    setIsAddingProduct(false)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    loadProducts()
  }

  const categories = [
    "all",
    "shorts_jeans",
    "bermudas_jeans",
    "calca_mom",
    "calca_flair",
    "bermuda_lycra",
    "shorts_linho",
    "shorts_algodao",
    "calca_wide_leg",
  ]

  const getCategoryTitle = (category) => {
    const titles = {
      all: "Todos os Produtos",
      shorts_jeans: "Shorts Jeans",
      bermudas_jeans: "Bermudas Jeans",
      calca_mom: "Calças Mom",
      calca_flair: "Calças Flair",
      bermuda_lycra: "Bermudas Lycra",
      shorts_linho: "Shorts 100% Linho",
      shorts_algodao: "Shorts 100% Algodão",
      calca_wide_leg: "Calças Wide Leg",
    }
    return titles[category] || "Produtos"
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 font-medium"
          >
            Carregando produtos...
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="h-1 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full mt-4 max-w-xs mx-auto"
          />
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen w-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 h-80 py-10 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-gray-200/30 to-gray-300/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-gray-300/20 to-gray-400/20 rounded-full blur-xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
            >
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                Estilo que
              </motion.span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Sparkles className="inline-block w-8 h-8 mr-2 text-gray-600" />
                Inspira
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Descubra nossa coleção exclusiva de roupas premium, onde qualidade e design se encontram.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Products Carousel */}
        {products.some((p) => p.featured) && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <ProductCarousel products={products} onProductClick={handleProductClick} onShare={handleShare} />
          </motion.section>
        )}

        {/* Category Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {/* Products Grid */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-8 h-8 text-gray-700" />
              <h2 className="text-3xl font-bold text-gray-900">{getCategoryTitle(selectedCategory)}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <motion.p
                key={filteredProducts.length}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-gray-500 font-medium"
              >
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""}
              </motion.p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleOpenForm}
                  disabled={isAddingProduct}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  aria-label="Cadastrar novo produto"
                >
                  <AnimatePresence mode="wait">
                    {isAddingProduct ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        className="flex items-center"
                      >
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Verificando...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="normal"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        className="flex items-center"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Cadastrar Novo Produto
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {filteredProducts.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
                className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </motion.div>
              <p className="text-gray-500 text-lg font-medium">Nenhum produto encontrado nesta categoria.</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <ProductCard product={product} onProductClick={handleProductClick} onShare={handleShare} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShare={handleShare}
      />

      {/* Product Form Modal */}
      <ProductForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </div>
  )
}

export default App
