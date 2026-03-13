using WebApiProject.DTOs;
using WebApiProject.Models;

namespace WebApiProject.Mapping
{
    public static class ProductWithCategoryMapping
    {
        public static ProductWithCategoryDTO productCategory(this Product product)
        {
            return new ProductWithCategoryDTO
            {
                Id=product.Id,
                Name=product.Name,
                imageUrl=product.imageUrl,
                Description=product.Description,
                Price=product.Price,
                CategoryName=product.Category.Name,
                Quantity=product.Quantity
              
                

            };
        }
    }
}
