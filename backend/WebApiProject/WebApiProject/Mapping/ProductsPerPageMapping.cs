using WebApiProject.DTOs;
using WebApiProject.Models;

namespace WebApiProject.Mapping
{
    public static class ProductsPerPageMapping
    {
        public static ProductsPerPageDTO toProductsPerPage(this List<Product> products, int page , int pageSize,int total )
        {
            return new ProductsPerPageDTO
            {
                products = products,
                page = page,
                pageSize = pageSize,
                total = total

            };
        }
    }
}
