using WebApiProject.DTOs;
using WebApiProject.Models;

namespace WebApiProject.Mapping
{
    public static class ProductMapping
    {
        public static ProductDTO ProductMap(this Product product)
        {
            return new ProductDTO
            {
                Id = product.Id,
                Name = product.Name,
            };
        }
    }
}
