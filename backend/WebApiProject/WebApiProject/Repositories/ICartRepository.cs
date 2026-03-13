using WebApiProject.Models;

namespace WebApiProject.Repositories
{
    public interface  ICartRepository : IRepository<Cart>
    {
        void CreateCart(string userId);
        Cart GetCart(string userId);
        void AddCartItem(CartItem item);
        void RemoveCartItem(int id);
        CartItem GetCartItem(int id);
        void UpdateCartItem(CartItem cartItem);
    }
}
