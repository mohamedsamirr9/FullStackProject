using WebApiProject.DTOs;
using WebApiProject.Models;

namespace WebApiProject.Mapping
{
    public static class CategoryWithProductsMapping
    {
        public static CategoryWithProductsDTO CategoryProductsMap(this Category category)
        {
            return new CategoryWithProductsDTO
            {
                Id = category.Id,
                Name = category.Name,
                Products = category.Products.Select(p => new ProductDTO
                {
                    Id = p.Id,
                    Name = p.Name
                }).ToList()        
            };
        }
    }
}
