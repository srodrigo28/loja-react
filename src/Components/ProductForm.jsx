import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

export default function ProductForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    sizes: "",
    main_image: "",
    additional_images: "",
    featured: false,
    brand: "",
    material: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: "shorts_jeans", label: "Shorts Jeans" },
    { value: "bermudas_jeans", label: "Bermudas Jeans" },
    { value: "calca_mom", label: "Calça Mom" },
    { value: "calca_flair", label: "Calça Flair" },
    { value: "bermuda_lycra", label: "Bermuda Lycra" },
    { value: "shorts_linho", label: "Shorts 100% Linho" },
    { value: "shorts_algodao", label: "Shorts 100% Algodão" },
    { value: "calca_wide_leg", label: "Calça Wide Leg" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "O nome do produto é obrigatório.";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      return "O preço deve ser um número maior que 0.";
    if (!formData.category) return "A categoria é obrigatória.";
    if (!formData.main_image.trim()) return "A imagem principal é obrigatória.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        sizes: formData.sizes ? formData.sizes.split(",").map((s) => s.trim()) : [],
        additional_images: formData.additional_images
          ? formData.additional_images.split(",").map((img) => img.trim())
          : [],
        id: Date.now().toString(), // Gera um ID único baseado no timestamp
      };

      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar o produto.");

      setSuccess("Produto cadastrado com sucesso!");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        sizes: "",
        main_image: "",
        additional_images: "",
        featured: false,
        brand: "",
        material: "",
      });
    } catch (err) {
      setError("Falha ao cadastrar o produto. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-6 overflow-y-auto bg-white rounded-lg">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Cadastrar Produto</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Fechar formulário"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-900">
              Nome do Produto
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Ex.: Shorts Jeans Estonado"
              required
              aria-required="true"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-semibold text-gray-900">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Ex.: Shorts jeans de cintura alta..."
              rows="4"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-semibold text-gray-900">
              Preço (R$)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Ex.: 89.90"
              required
              aria-required="true"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-semibold text-gray-900">
              Categoria
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
              aria-required="true"
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <label htmlFor="sizes" className="text-sm font-semibold text-gray-900">
              Tamanhos (separados por vírgula)
            </label>
            <input
              id="sizes"
              name="sizes"
              type="text"
              value={formData.sizes}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Ex.: 36, 38, 40, 42"
            />
          </div>

          {/* Main Image */}
          <div className="space-y-2">
            <label htmlFor="main_image" className="text-sm font-semibold text-gray-900">
              Imagem Principal (URL)
            </label>
            <input
              id="main_image"
              name="main_image"
              type="url"
              value={formData.main_image}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Ex.: https://example.com/image.jpg"
              required
              aria-required="true"
            />
          </div>

          {/* Additional Images */}
          <div className="space-y-2">
            <label htmlFor="additional_images" className="text-sm font-semibold text-gray-900">
              Imagens Adicionais (URLs separadas por vírgula)
            </label>
            <input
              id="additional_images"
              name="additional_images"
              type="text"
              value={formData.additional_images}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Ex.: https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-2">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={handleInputChange}
              className="h-5 w-5 text-gray-900 focus:ring-gray-900"
            />
            <label htmlFor="featured" className="text-sm font-semibold text-gray-900">
              Produto em Destaque
            </label>
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <label htmlFor="brand" className="text-sm font-semibold text-gray-900">
              Marca
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={formData.brand}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Ex.: Fashion Brasil"
            />
          </div>

          {/* Material */}
          <div className="space-y-2">
            <label htmlFor="material" className="text-sm font-semibold text-gray-900">
              Material
            </label>
            <input
              id="material"
              name="material"
              type="text"
              value={formData.material}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Ex.: Algodão 100%"
            />
          </div>

          {/* Feedback Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-600 text-sm"
                role="alert"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-600 text-sm"
                role="alert"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-sm font-semibold"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            <Save className="w-5 h-5 mr-2" />
            {isSubmitting ? "Salvando..." : "Salvar Produto"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}