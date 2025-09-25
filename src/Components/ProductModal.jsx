"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Share2, Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

export default function ProductModal({ product, isOpen, onClose, onShare }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  if (!product) return null

  const allImages = [product.main_image, ...(product.additional_images || [])]

  const categoryLabels = {
    shorts_jeans: "Shorts Jeans",
    bermudas_jeans: "Bermudas Jeans",
    calca_mom: "Calça Mom",
    calca_flair: "Calça Flair",
    bermuda_lycra: "Bermuda Lycra",
    shorts_linho: "Shorts 100% Linho",
    shorts_algodao: "Shorts 100% Algodão",
    calca_wide_leg: "Calça Wide Leg",
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    // Simula uma operação assíncrona
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsAddingToCart(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <motion.div
          className="grid md:grid-cols-2 gap-0 h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Images Section */}
          <div className="relative bg-gray-50">
            <div className="aspect-square relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  src={allImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {allImages.length > 1 && (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-xl"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-xl"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {allImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "border-gray-900 shadow-lg"
                        : "border-gray-200 hover:border-gray-400 hover:shadow-md"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Badge variant="secondary" className="text-xs font-medium">
                        {categoryLabels[product.category]}
                      </Badge>
                    </motion.div>
                    <motion.h1
                      className="text-3xl font-bold text-gray-900 leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {product.name}
                    </motion.h1>
                    {product.brand && (
                      <motion.p
                        className="text-sm text-gray-500"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {product.brand}
                      </motion.p>
                    )}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </DialogHeader>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl font-bold text-gray-900">R$ {product.price.toFixed(2)}</div>

                {product.description && <p className="text-gray-600 leading-relaxed">{product.description}</p>}

                {product.material && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Material</h3>
                    <p className="text-sm text-gray-600">{product.material}</p>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Tamanhos</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <motion.button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg font-medium transition-all duration-300 ${
                            selectedSize === size
                              ? "border-gray-900 bg-gray-900 text-white shadow-lg"
                              : "border-gray-200 hover:border-gray-400 hover:shadow-md hover:bg-gray-50"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            <motion.div
              className="space-y-4 pt-6 border-t border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex space-x-3">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 transition-all duration-300 hover:shadow-lg"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                  >
                    <motion.div
                      className="flex items-center justify-center"
                      animate={isAddingToCart ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isAddingToCart ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      {isAddingToCart ? "Adicionando..." : "Adicionar ao Carrinho"}
                    </motion.div>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className={`px-6 transition-all duration-300 hover:shadow-lg ${
                      isLiked ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <motion.div animate={isLiked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                      <Heart
                        className={`w-5 h-5 transition-colors duration-200 ${
                          isLiked ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="w-full py-6 transition-all duration-300 hover:shadow-lg hover:bg-green-50 hover:border-green-200 hover:text-green-700 bg-transparent"
                  onClick={() => onShare(product)}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar no WhatsApp
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
