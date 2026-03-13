using WebApiProject.DTOs;
using WebApiProject.Models;

namespace WebApiProject.Mapping
{
    public static class CartWithProductsMapping
    {
        public static CartWithProducts toCartProducts(this Cart cart)
        {
            return new CartWithProducts
            {
                Id = cart.Id,
                cartItems = cart.CartItems.Select(ci => new CartProductDTO
                {
                    ProductId = ci.ProductId,
                    ProductName = ci.Product.Name,
                    ImageUrl = ci.Product.imageUrl,
                    Price = ci.Product.Price,
                    Quantity = ci.Quantity,
                    Total = ci.Product.Price * ci.Quantity

                }).ToList(),

                total = cart.CartItems.Sum(ci => ci.Product.Price * ci.Quantity)

            };
        }
    }
}
