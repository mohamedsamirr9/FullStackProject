namespace WebApiProject.DTOs
{
    public class CartWithProducts
    {
        public int Id { get; set; } 
        public List<CartProductDTO> cartItems {get; set;}
        public decimal total {  get; set; }
    }
}
