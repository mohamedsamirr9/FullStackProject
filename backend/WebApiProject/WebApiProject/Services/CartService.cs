using Microsoft.AspNetCore.Cors.Infrastructure;
using System.Security.Claims;
using WebApiProject.DTOs;
using WebApiProject.Mapping;
using WebApiProject.Models;
using WebApiProject.Repositories;

namespace WebApiProject.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository cartRepository;

        public CartService(ICartRepository _cartRepository) {
            cartRepository = _cartRepository;
        }
        public void AddCartItem(string userId,CartItemDTO cartItemDTO)
        {
            var cart = GetCart(userId);
            var cartId = GetCart(userId).Id;
            var existItem = cart.CartItems?.FirstOrDefault(ci => ci.ProductId == cartItemDTO.ProductId);
            if (existItem != null)
            {
                existItem.Quantity += cartItemDTO.Quantity;
                cartRepository.UpdateCartItem(existItem);
            }
            else
            {
                CartItem cartItem = new CartItem()
                {
                    ProductId = cartItemDTO.ProductId,
                    Quantity = cartItemDTO.Quantity,
                    CartId = cartId
                };

                cartRepository.AddCartItem(cartItem);
            }
        }

        public void UpdateCartItem(string userId, CartItemDTO cartItemDTO) { 
            var cart = GetCart(userId);
            var existItem = cart.CartItems?.FirstOrDefault(ci => ci.ProductId == cartItemDTO.ProductId);
            if (existItem == null)
                throw new Exception("Item not found in cart");
            existItem.Quantity=cartItemDTO.Quantity;
            cartRepository.UpdateCartItem(existItem);

        }

        public Cart GetCart(string userId)
        {
            return cartRepository.GetCart(userId);
             
        }

        public CartWithProducts GetCartWithProducts(string userId)
        {
            var cart = cartRepository.GetCart(userId);
            return cart.toCartProducts();
        }

        public int Save()
        {
            return cartRepository.Save();
        }

        public void RemoveCartItem(string userId, int productId)
        {
            var cart = GetCart(userId);
            var existItem = cart.CartItems?.FirstOrDefault(ci => ci.ProductId == productId);
            if (existItem == null)
                throw new Exception("Item not found in cart");
            cartRepository.RemoveCartItem(existItem.Id);
        }
    }
}
