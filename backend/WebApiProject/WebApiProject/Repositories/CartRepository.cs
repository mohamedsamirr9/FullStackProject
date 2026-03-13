using Microsoft.EntityFrameworkCore;
using WebApiProject.Models;

namespace WebApiProject.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext context;

        public CartRepository(AppDbContext _context)
        {
            context = _context;
        }
        public void Add(Cart obj)
        {
            throw new NotImplementedException();
        }

        public void AddCartItem(CartItem item)
        {
            context.CartItems.Add(item);
        }

        public void CreateCart(string userId)
        {
            var cart = new Cart()
            {
                UserId = userId,
            };
            context.Carts.Add(cart);

        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<Cart> GetAll()
        {
            throw new NotImplementedException();
        }

        public Cart GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Cart GetCart(string userId)
        {
          return context.Carts
    .Include(c => c.CartItems)
    .ThenInclude(ci => ci.Product)
.FirstOrDefault(c => c.UserId == userId);
        }

        public CartItem GetCartItem(int id)
        {
            return context.CartItems.FirstOrDefault(ci => ci.Id == id);
        }

        public void RemoveCartItem(int id)
        {
            var cartItem = GetCartItem(id);
            context.CartItems.Remove(cartItem);
        }

        public int Save()
        {
            return context.SaveChanges();
        }

        public void Update(Cart obj)
        {
            throw new NotImplementedException();
        }

        public void UpdateCartItem(CartItem cartItem)
        {
            context.CartItems.Update(cartItem);
        }
    }
}
