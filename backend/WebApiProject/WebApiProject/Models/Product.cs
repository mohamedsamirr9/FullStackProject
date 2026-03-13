namespace WebApiProject.Models
{
    public class Product
    {
      
            public int Id { get; set; } 
        public string? imageUrl { get; set; }
        public string Name { get; set; } = null!;       
            public string? Description { get; set; }    
            public decimal Price { get; set; }         
            public int Quantity { get; set; }          
        public bool InStock => Quantity > 0;

        public int CategoryId { get; set; }
        public Category? Category { get; set; } 

        public ICollection<CartItem>? CartItems { get; set; }
        
    }
}
