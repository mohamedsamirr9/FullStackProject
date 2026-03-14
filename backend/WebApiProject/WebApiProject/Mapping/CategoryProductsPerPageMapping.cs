using WebApiProject.DTOs;
using WebApiProject.Models;

namespace WebApiProject.Mapping
{
    public static class CategoryProductsPerPageMapping
    {
        public static CategoryProductsPerPageDTO toCategoryProducts(this List<Product> products,int page,int pageSize,int total)
        {
            return new CategoryProductsPerPageDTO
            {
                products = products,
                page = page,
                pageSize = pageSize,
                total = total

            };
        }
    }
}
