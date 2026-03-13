using WebApiProject.DTOs;
using WebApiProject.Models;

namespace WebApiProject.Services
{
    public interface ICartService
    {
        void AddCartItem(string userId,CartItemDTO cartItemDTO);
        Cart GetCart (string userId);
        CartWithProducts GetCartWithProducts (string userId);
        void UpdateCartItem(string userId,CartItemDTO cartItemDTO);
        void RemoveCartItem(string userId,int cartItemId);
        int Save();
    }
}
