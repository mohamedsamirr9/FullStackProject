using WebApiProject.DTOs;
using WebApiProject.Models;

namespace WebApiProject.Mapping
{
    public static class ProductAdminMapping
    {
        public static Product toAdminProduct(this ProductAdminDTO productAdminDTO, string imageUrl)
        {
            return new Product
            {
                Name = productAdminDTO.Name,
                Description = productAdminDTO.Description,
                Price = productAdminDTO.Price,
                Quantity = productAdminDTO.Quantity,
                CategoryId = productAdminDTO.CategoryId,
                imageUrl = imageUrl
            };
        }
        public static void UpdateFromDto(this Product product, ProductAdminDTO dto, string? imageUrl = null)
        {
            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.Quantity = dto.Quantity;
            product.CategoryId = dto.CategoryId;

            if (imageUrl != null)
                product.imageUrl = imageUrl;
        }
    }
}
