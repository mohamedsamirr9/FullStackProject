using WebApiProject.Models;

namespace WebApiProject.DTOs
{
    public class CategoryWithProductsDTO
    {
        
            public int Id { get; set; }
            public string Name { get; set; }

            public List<ProductDTO> Products { get; set; }
        
    }
}
