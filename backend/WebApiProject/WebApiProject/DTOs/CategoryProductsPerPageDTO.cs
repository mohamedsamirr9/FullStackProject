using WebApiProject.Models;

namespace WebApiProject.DTOs
{
    public class CategoryProductsPerPageDTO
    {
        public List<Product> products {  get; set; }
        public int page { get; set; }
        public int pageSize { get; set; }
        public int total {  get; set; }
    }
}
