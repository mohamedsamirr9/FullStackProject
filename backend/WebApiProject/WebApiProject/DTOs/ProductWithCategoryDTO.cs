using WebApiProject.Models;

namespace WebApiProject.DTOs
{
    public class ProductWithCategoryDTO
    {
        public int Id { get; set; }
        public string? imageUrl { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? CategoryName { get; set; }
    }
}
